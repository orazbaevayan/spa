<template>
	<form class="p-2 w-100" @submit.prevent="updateGroup">
		<Title>{{ $t('pages.Редактирование группы') }}</Title>
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="group.name">
		</div>
		<div class="p-2">
			<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Редактировать')">
		</div>
	</form>
	<div class="p-2 d-flex flex-column">
		<Title>{{ group.name }}</Title>
		<div class="mx-2 my-1 p-1 d-flex justify-content-between" style="border: 1px solid transparent;">
			<input type="checkbox" class="mx-1">

			<!-- Button trigger modal -->
			<a class="text-primary px-1 py-0" data-bs-toggle="modal" href="#staticBackdrop">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</a>

			<!-- Modal -->
			<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="staticBackdropLabel">Modal title</h5>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							...
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary text-white">Understood</button>
						</div>
					</div>
				</div>
			</div>

			<!-- <router-link class="text-primary px-1 py-0" :to="{ name: 'manager-create-group' }">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</router-link> -->
		</div>
		<Card class="mx-2 my-1" v-for="group_user in group.group_users" :key="group_user.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				{{ group_user.user.fullName }}
			</template>
			<template v-slot:append>
				<!-- <router-link class="text-primary px-1 py-0" :to="{ name: 'manager-edit-user', params: { user_id: user.id } }">
					<font-awesome-icon :icon="['fa', 'eye']" />
				</router-link>
				<a href="#" class="text-danger px-1 py-0" @click="deleteGroup(user)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</a> -->
			</template>
		</Card>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'
	import GroupUser from '@/store/models/GroupUser'

	export default {
		beforeCreate() {
			Course.api().fetchById(this.$route.params.course_id);
			//Group.api().fetchById(this.$route.params.group_id);
			GroupUser.api().fetch();
		},
		methods: {
			updateGroup(event) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				Group.api().post('/api/groups/' + this.$route.params.group_id, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			}
		},
		computed: {
			group() {
				return Group.query().with(['group_users.user']).find(this.$route.params.group_id) || new Group;
			}
		}
	}
</script>