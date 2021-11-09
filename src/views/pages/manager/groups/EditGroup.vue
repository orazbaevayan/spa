<template>
	<div class="p-2 d-flex flex-column">
		<Title class="d-flex align-items-center justify-content-center">
			<span>{{ group.group_name }}</span>
			<EditModal dialog-class="modal-md" :form="`updateGroup${group.id}`">
				<form action="d-flex flex-wrap text-start" :id="`updateGroup${group.id}`" @submit.prevent="updateGroup" v-if="!group.generate_name">
					<div class="col-12 p-2 text-start">
						<label class="form-label" for="name">Название</label>
						<input type="text" class="form-control form-control-sm" name="name" :value="group.name">
					</div>
				</form>
				<form class="d-flex flex-wrap text-start" :id="`updateGroup${group.id}`" @submit.prevent="updateGroup" v-if="group.generate_name">
					<component class="p-2 col-12" :is="`${field.type}Field`" :autocomplete="group" :value="field" v-for="field in group.fields" :key="field.id" />
				</form>
				<!-- <GroupForm class="text-start" :value="group" :id="`updateGroup${group.id}`" @submit.prevent="updateGroup" v-if="!group.generate_name"></GroupForm> -->
			</EditModal>
		</Title>

		<div class="d-flex justify-content-between align-items-center">
			<div class="dropdown m-2">
				<a class="btn btn-sm btn-outline-primary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
					Печать
				</a>

				<ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
					<li><a class="dropdown-item" href="#" v-for="template in group.templates" :key="template.id" @click.prevent="print(template)">{{ template.name }}</a></li>
				</ul>
			</div>
			
			<div class="p-2">
				<Modal :header="true" :footer="true" dialog-class="modal-md">
					<template v-slot:open-button>
						<button class="btn btn-sm btn-outline-primary">
							<font-awesome-icon :icon="['fa', 'cog']" />
						</button>
					</template>
					<template v-slot:header>
						Редактирование
					</template>
					<template v-slot:body>
						<GroupForm :value="group" :id="`updateGroup${group.id}Settings`" @submit.prevent="updateGroup">
							<component class="p-2 col-12 text-start" :is="`${field.type}Field`" :autocomplete="group" :value="field" v-for="field in group.fields" :key="field.id" />
						</GroupForm>
					</template>
					<template v-slot:footer>
						<button type="submit" class="m-0 m-2 btn btn-sm btn-warning text-white" data-bs-dismiss="modal" :form="`updateGroup${group.id}Settings`">Сохранить</button>
						<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
					</template>
				</Modal>
			</div>
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
				{{ group_user.user?.fullName }}
			</template>
			<template v-slot:append>
				<EditModal fa-icon="user-edit" :form="`updateUserForm${group_user.user?.id}`">
					<UserForm :value="group_user.user" :id="`updateUserForm${group_user.user?.id}`" @submit.prevent="updateUser($event, group_user)">
						<component class="p-2 col-12 col-md-6" :is="`${field.type}Field`" :autocomplete="group.group_users" :value="field" v-for="field in group_user.fields" :key="field.id" />
						<input type="submit" class="d-none">
					</UserForm>
				</EditModal>

				<DeleteModal @delete="deleteGroupUser(group_user)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group_user.user?.fullName }}</span>?
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
	import Group from '@/store/models/Group'
	/*import Field from '@/store/models/Field'*/
	import GroupUser from '@/store/models/GroupUser'
	import SearchUsers from '@/components/SearchUsers'
	import UserForm from '@/components/forms/User'
	import GroupForm from '@/components/forms/Group'
	import FileSaver from 'file-saver';
	import { v4 as uuidv4 } from 'uuid';

	export default {
		beforeCreate() {
			Group.api().fetchById(this.$route.params.group_id, '?include=fields,course,templates,group_users.user,group_users.fields.options,group_users.fields.field_options');
		},
		data() {
			return {
				foundUsers: [],
			}
		},
		components: {
			SearchUsers,
			GroupForm,
			UserForm,
		},
		methods: {
			updateGroup(event) {
				Group.api().update(event, this.$route.params.group_id);
			},
			addUser(user) {
				GroupUser.api().post(`/api/group_users?include=user,fields.options,fields.field_options`, {
					group_id: this.$route.params.group_id,
					user_id: user.id,
				}).then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
					}
				});
			},
			updateUser(event, groupUser) {
				User.api().update(event, groupUser.user.id);
				GroupUser.api().update(event, groupUser.id, '?include=fields.options,fields.field_options');
			},
			deleteGroupUser(groupUser) {
				GroupUser.api().deleteById(groupUser.id);
			},
			isUserInGroup(user) {
				return this.group.group_users.map(gu => gu.user.id).indexOf(user.id) != -1;
			},
			storeUser(event) {
				User.api().store(event).then(r => {
					if (r.response.status === 201) {
						this.addUser(r.response.data.data);
					}
				});
/*				let formData = new FormData(event.currentTarget);
				User.api().post('api/users', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.addUser(r.response.data.data);
					}
				})
				.catch(e => console.log(e));*/
			},
			print(template) {
				this.$axios({
					url: `/api/templates/${template.id}/print`,
					method: 'GET',
					responseType: 'blob'
				}).then(r => {
					FileSaver.saveAs(r.data, `${uuidv4()}.docx`);
				}).catch(e => {
					console.log(e)
				});
			},
		},
		computed: {
			group() {
				return Group.query().with(['fields', 'course', 'templates', 'group_users.user', 'group_users.fields.options']).find(this.$route.params.group_id) || new Group;
			},
			users() {
				return User.findIn(this.foundUsers);
			},
		}
	}
</script>