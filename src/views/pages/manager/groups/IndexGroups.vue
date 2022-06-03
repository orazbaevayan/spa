<template>
	<Title class="mt-2">{{ courseVersion.course?.name }}</Title>
	<div class="p-2">
		<div class="p-2">
			<table class="table table-striped table-borderless mb-0 custom-table">
				<thead>
					<tr>
						<th><input type="checkbox" class="mx-1" @click="toggleCheckboxes"></th>
						<th scope="col">#</th>
						<th scope="col">Название</th>
						<th scope="col" v-for="field in fields" :key="field">{{ field }}</th>
						<th scope="col" class="text-end">
							
							<span class="btn btn-link text-primary px-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#create_group_modal`" data-bs-toggle="modal">
								<font-awesome-icon :icon="['fa', 'plus-square']" />
							</span>

						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(group, index) in groups" :key="group.id">
						<td><input type="checkbox" class="mx-1" :value="group.id" v-model="selectedGroups"></td>
						<td scope="row">{{ index + 1 }}</td>
						<td>{{ group.group_name }}</td>
						<td scope="col" v-for="field in fields" :key="field">{{ findField(index, field)?.value }}</td>
						<td>
							<div class="d-flex">
								<span class="px-1 d-flex flex-column justify-content-center align-items-center text-secondary" style="line-height: 1;">
									<font-awesome-icon :icon="['fa', 'users']" style="font-size: 0.6rem;" />
									<span style="font-size: 0.8rem;">{{ group.usersCount }}</span>
								</span>
								<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-edit-group', params: { group_id: group.id } }">
									<font-awesome-icon :icon="['fa', 'eye']" />
								</router-link>
								<span class="btn btn-link text-danger px-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#delete_group_${group.id}`" data-bs-toggle="modal">
									<font-awesome-icon :icon="['fa', 'trash-alt']" />
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>

			<CreateModal :open-button="false" :modal-id="`create_group_modal`" dialog-class="modal-md" :form="`storeGroup`">
				<form action="d-flex flex-wrap text-start" :id="`storeGroup`" @submit.prevent="storeGroup" v-if="!group.generate_name">
					<div class="col-12 p-2 text-start">
						<label class="form-label" for="name">Название</label>
						<input type="text" class="form-control form-control-sm" name="name">
						<input type="hidden" name="course_version_id" :value="$route.params.course_version_id">
					</div>
				</form>
				<form class="d-flex flex-wrap text-start" :id="`storeGroup`" @submit.prevent="storeGroup" v-if="group.generate_name">
					<component class="p-2 col-12" :is="`${field.type}Field`" :autocomplete="group" :value="field" v-for="field in group.fields" :key="field.id" />
					<input type="hidden" name="course_version_id" :value="$route.params.course_version_id">
				</form>
			</CreateModal>

			<div v-for="group in groups" :key="group.id">
				<DeleteModal :open-button="false" :modal-id="`delete_group_${group.id}`" @delete="deleteGroup(group)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group.group_name }}</span>?
				</DeleteModal>
			</div>

		</div>
		<Paginator entity="groups" class="p-2" v-if="groups.length" />
	</div>
</template>

<script>
	import CourseVersion from '@/store/models/CourseVersion'
	import Group from '@/store/models/Group'
/*	import { mapGetters } from 'vuex'*/

	export default {
		beforeMount() {
			CourseVersion.api().fetchById(this.$route.params.course_version_id, '?include=course,group.fields.options');
			this.getGroups();
		},
		data() {
			return {
				selectedGroups: [],
				allChecked: false
			}
		},
		methods: {
			toggleCheckboxes() {
				if (!this.allChecked) {
					this.allChecked = true;
					this.selectedGroups = [];
					for (let group in this.groups) {
						this.selectedGroups.push(this.groups[group].id);
					}
				} else {
					this.allChecked = false;
					this.selectedGroups = [];
				}
			},
			getGroups() {
				Group.api().fetch(`?filter[course_version_id]=${this.$route.params.course_version_id}&include=group_users`);
			},
			storeGroup(event) {
				let formData = new FormData(event.currentTarget);
				Group.api().post('api/groups', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
						this.getGroups();
						//this.$router.push({ name: 'manager-index-groups' });
					}
				})
				.catch(e => console.log(e));
			},
			deleteGroup(group) {
				Group.api().deleteById(group.id).then(() => {
					this.getGroups();
				});
			},
			findField(group_index, field) {
				let index = this.groups[group_index].fields.findIndex(item => item.name === field);
				let result = index != -1 ? this.groups[group_index].fields[index] : null;
				return result;
			}
		},
		computed: {
			courseVersion() {
				return CourseVersion.query().with(['course', 'group.fields.options']).find(this.$route.params.course_version_id) || new CourseVersion;
			},
			group() {
				return this.courseVersion.group || new Group;
			},
/*			...mapGetters({
				'currentPageElements': 'pagination/currentPageElements',
			}),*/
			/*groups() {
				let groups = this.course.groups;
				groups.sort((a, b) => a.order.localeCompare(b.order, undefined, { numeric: true, sensitivity: 'base' })).reverse();
				return this.currentPageElements(groups);
			},*/
			groups() {
				return Group.query().with(['group_users']).where('course_version_id', parseInt(this.$route.params.course_version_id)).findIn(this.$store.getters['pagination/data']('groups')?.items);
			},
			fields() {
				return this.courseVersion?.groups_table?.split(',');
			}
		},
		watch: {
			'$route' () {
				this.getGroups();
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-table {
		overflow-x: auto;
		display: block;
		&:not(caption)>*>* {
			background-color: $gray-100;
		}
		tr {

			th {
				white-space: nowrap;
			}
			th:nth-child(2), td:nth-child(2) {
				width: 1%;
			}
			th:first-child, td:first-child {
				width: 1%; position: sticky; left: 0;
			}
			th:last-child, td:last-child {
				width: 1%; position: sticky; right: 0;
			}
		}
	}
</style>