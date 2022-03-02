<template>
	<Title class="mt-2">{{ course.name }}</Title>
	<div class="p-2 d-flex flex-column">
		<Card class="mx-2 my-1" :is-control-panel="true">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:append>
				<CreateModal dialog-class="modal-md" :form="`storeGroup`">
					<form action="d-flex flex-wrap text-start" :id="`storeGroup`" @submit.prevent="storeGroup" v-if="!group.generate_name">
						<div class="col-12 p-2 text-start">
							<label class="form-label" for="name">Название</label>
							<input type="text" class="form-control form-control-sm" name="name">
							<input type="hidden" name="course_id" :value="$route.params.course_id">
						</div>
					</form>
					<form class="d-flex flex-wrap text-start" :id="`storeGroup`" @submit.prevent="storeGroup" v-if="group.generate_name">
						<component class="p-2 col-12" :is="`${field.type}Field`" :autocomplete="group" :value="field" v-for="field in group.fields" :key="field.id" />
						<input type="hidden" name="course_id" :value="$route.params.course_id">
					</form>
				</CreateModal>
			</template>
		</Card>
		<Card class="mx-2 my-1" v-for="group in groups" :key="group.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				<span class="px-1">
					{{ group.group_name }}
				</span>
			</template>
			<template v-slot:append>
				<span class="px-1 d-flex flex-column justify-content-center align-items-center text-secondary" style="line-height: 1;">
					<font-awesome-icon :icon="['fa', 'users']" style="font-size: 0.6rem;" />
					<span style="font-size: 0.8rem;">{{ group.usersCount }}</span>
				</span>
				<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-edit-group', params: { group_id: group.id } }">
					<font-awesome-icon :icon="['fa', 'eye']" />
				</router-link>
				<DeleteModal @delete="deleteGroup(group)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group.group_name }}</span>?
				</DeleteModal>
			</template>
		</Card>
	</div>
	<Pagination :value="course.groups" class="p-2" v-if="course.groups.length" />
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'
	//import Field from '@/store/models/Field'
	//import GroupUser from '@/store/models/GroupUser'
	import { mapGetters } from 'vuex'

	export default {
		beforeCreate() {
			Course.api().fetchById(this.$route.params.course_id, '?includes=group.fields.options,groups.group_users');
			/*this.$fetchApiData([
				Course.api().fetchById(this.$route.params.course_id),
				GroupUser.api().fetch(),
				Field.api().fetch(),
			]);*/
		},
		methods: {
			storeGroup(event) {
				let formData = new FormData(event.currentTarget);
				Group.api().post('api/groups', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
						this.$router.push({ name: 'manager-index-groups' });
					}
				})
				.catch(e => console.log(e));
			},
			deleteGroup(group) {
				Group.api().deleteById(group.id);
			},
		},
		computed: {
			course() {
				return Course.query().with(['groups.group_users', 'group.fields.options']).find(this.$route.params.course_id) || new Course;
			},
			group() {
				return this.course.group || new Group;
			},
			...mapGetters({
				'currentPageElements': 'pagination/currentPageElements',
			}),
			groups() {
				let groups = this.course.groups;
				groups.sort((a, b) => a.order.localeCompare(b.order, undefined, { numeric: true, sensitivity: 'base' })).reverse();
				return this.currentPageElements(groups);
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>