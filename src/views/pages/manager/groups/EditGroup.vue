<template>
	<Title class="mt-2">{{ $t('pages.Редактирование группы') }}</Title>
	<form class="p-2 w-100" @submit.prevent="updateGroup">
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

			<Modal :header="true">
				<template v-slot:open-button>
					<font-awesome-icon class="mx-1 my-0 text-primary" :icon="['fa', 'plus-square']" />
				</template>
				<template v-slot:header>
					Добавить студента
				</template>
				<template v-slot:body>
					<SearchUsers class="p-2" v-model="foundUsers" />

					<Card class="m-2">
						<template v-slot:header>
							<span class="w-100 d-flex align-items-center justify-content-center text-primary">
								<span class="me-2">Создать нового пользователя</span>
								<font-awesome-icon :icon="['fa', 'plus-square']" />
							</span>
						</template>
					</Card>

					<div class="p-1 d-flex flex-column">
						<Card :toggle-on="true" class="m-1" v-for="user in users" :key="user.id">
							<template v-slot:header>
								{{ user.fullName }}
							</template>
							<template v-slot:append>
								<button class="btn btn-link text-primary px-1 py-0" @click.prevent="addUser(user)">
									<font-awesome-icon :icon="['fa', 'plus-square']" />
								</button>
							</template>
							<template v-slot:content>
								<UserForm class="p-2" :can-edit="false" :value="user"/>
							</template>
						</Card>
					</div>
				</template>
			</Modal>
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
				</router-link> -->
				<DeleteModal @delete="deleteGroupUser(group_user)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group_user.user.fullName }}</span>?
				</DeleteModal>
			</template>
		</Card>
	</div>
</template>

<script>
	import User from '@/store/models/User'
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'
	import GroupUser from '@/store/models/GroupUser'
	import SearchUsers from '@/components/SearchUsers'
	import UserForm from '@/components/forms/User'

	export default {
		beforeCreate() {
			Course.api().fetchById(this.$route.params.course_id);
			GroupUser.api().fetch();
		},
		data() {
			return {
				foundUsers: []
			}
		},
		components: {
			SearchUsers,
			UserForm,
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
			},
			addUser(user) {
				GroupUser.api().post(`/api/group_users`, {
					group_id: this.$route.params.group_id,
					user_id: user.id,
				});
			},
			deleteGroupUser(groupUser) {
				GroupUser.api().deleteById(groupUser.id);
			},
		},
		computed: {
			group() {
				return Group.query().with(['group_users.user']).find(this.$route.params.group_id) || new Group;
			},
			users() {
				return User.findIn(this.foundUsers);
			}
		}
	}
</script>