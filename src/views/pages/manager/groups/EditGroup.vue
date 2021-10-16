<template>
	<Title class="mt-2">{{ $t('pages.Редактирование группы') }}</Title>
	<form class="p-2 w-100" @submit.prevent="updateGroup">
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="group.name">
		</div>
		<div class="p-2">
			<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Сохранить')">
		</div>
	</form>
	<div class="p-2 d-flex flex-column">
		<Title>{{ group.name }}</Title>

		<div class="d-flex">
			<button type="button" class="btn btn-sm btn-outline-primary m-2" v-for="template in group.templates" :key="template.id" @click.prevent="print(template)">{{ template.name }}</button>
		</div>

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
					<SearchUsers class="p-2" v-model="foundUsers" :init-search="false" />

					<Card class="m-2">
						<template v-slot:header>
							<span class="w-100 d-flex align-items-center justify-content-center text-primary" data-bs-dismiss="modal" data-bs-target="#create_user_modal" data-bs-toggle="modal">
								<span class="me-2">Создать нового пользователя</span>
								<font-awesome-icon :icon="['fa', 'plus-square']" />
							</span>
						</template>
					</Card>

					<div class="p-1 d-flex flex-column" v-if="users.length">
						<Card :toggle-on="true" class="m-1" v-for="user in users" :key="user.id">
							<template v-slot:header>
								{{ user.fullName }}
							</template>
							<template v-slot:append>
								<button type="button" class="btn btn-link text-primary px-1 py-0" v-if="!isUserInGroup(user)" @click.prevent="addUser(user)">
									<font-awesome-icon :icon="['fa', 'plus-square']"/>
								</button>
								<button type="button" class="btn btn-link text-success px-1 py-0" v-if="isUserInGroup(user)">
									<font-awesome-icon :icon="['fa', 'check-square']"/>
								</button>
							</template>
							<template v-slot:content>
								<UserForm class="p-2" :can-edit="false" :value="user"/>
							</template>
						</Card>
					</div>
				</template>
			</Modal>

			<Modal :header="true" :footer="true" :open-button="false" dialog-class="modal-lg" modal-id="create_user_modal">
				<template v-slot:header>
					Создать нового пользователя
				</template>
				<template v-slot:body>
					<UserForm id="storeUserForm" @submit.prevent="storeUser">
						<input type="submit" class="d-none">
					</UserForm>
				</template>
				<template v-slot:footer>
					<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal" form="storeUserForm">Создать</button>
					<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
				</template>
			</Modal>
		</div>

		<Card :toggle-on="true" class="mx-2 my-1" v-for="group_user in group.group_users" :key="group_user.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				{{ group_user.user.fullName }}
			</template>
			<template v-slot:append>
				<EditModal fa-icon="user-edit" :form="`updateUserForm${group_user.user.id}`">
					<UserForm :value="group_user.user" :id="`updateUserForm${group_user.user.id}`" @submit.prevent="updateUser($event, group_user)">
						<component class="p-2 col-12 col-md-6" :is="`${field.type}Field`" :group="group" :value="field" v-for="field in group_user.fields" :key="field.id" />
						<input type="submit" class="d-none">
					</UserForm>
				</EditModal>

				<DeleteModal @delete="deleteGroupUser(group_user)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group_user.user.fullName }}</span>?
				</DeleteModal>
			</template>
			<template v-slot:content>
				<div class="p-1 d-flex flex-wrap">
					<div class="col-12 col-md-6" v-for="field in group_user.fields" :key="field.id">
						<span class="fw-bold px-1">{{ field.name }}:</span>
						<span class="px-1">{{ field.value }}</span>
					</div>
				</div>
				<!-- <form class="d-flex flex-wrap p-2" @submit.prevent="updateGroupUser($event, group_user)">
					<component class="p-2 col-6" :is="`${field.type}Field`" :value="field" v-for="field in group_user.fields" :key="field.id" />
					<div class="col-12">
						<input type="submit" value="Сохранить" class="btn btn-sm btn-warning text-white m-2">
					</div>
				</form> -->
				<!-- <UserForm class="p-2" :can-edit="false" :value="group_user.user"/> -->
			</template>
		</Card>
	</div>
</template>

<script>
	import User from '@/store/models/User'
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'
	import Option from '@/store/models/Option'
	import GroupUser from '@/store/models/GroupUser'
	import SearchUsers from '@/components/SearchUsers'
	import UserForm from '@/components/forms/User'
	import FileSaver from 'file-saver';
	import { v4 as uuidv4 } from 'uuid';

	export default {
		beforeCreate() {
			Course.api().fetchById(this.$route.params.course_id);
			Group.api().fetch();
			GroupUser.api().fetch();
			Option.api().fetch();
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
				}).then(r => {
					if (r.response.status === 201) {
						Option.api().fetch();
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
					}
				});
			},
			updateUser(event, groupUser) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				User.api().post(`/api/users/${groupUser.user.id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.updateGroupUser(formData, groupUser);
					}
				})
				.catch(e => console.log(e));
			},
			deleteGroupUser(groupUser) {
				GroupUser.api().deleteById(groupUser.id);
			},
			isUserInGroup(user) {
				return this.group.group_users.map(gu => gu.user.id).indexOf(user.id) != -1;
			},
			storeUser(event) {
				let formData = new FormData(event.currentTarget);
				User.api().post('api/users', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.addUser(r.response.data.data);
					}
				})
				.catch(e => console.log(e));
			},
			updateGroupUser(formData, groupUser) {
				GroupUser.api().post(`/api/group_users/${groupUser.id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
			print(template) {
				this.$axios({
					url: `/api/templates/${template.id}/print`,
					method: 'GET',
					responseType: 'blob'
				}).then(r => {
					console.log(r);
					FileSaver.saveAs(r.data, `${uuidv4()}.docx`);
				}).catch(e => {
					console.log(e)
				});
			},
		},
		computed: {
			group() {
				return Group.query().with(['templates', 'group_users.user', 'group_users.fields.options']).find(this.$route.params.group_id) || new Group;
			},
			users() {
				return User.findIn(this.foundUsers);
			},
		}
	}
</script>