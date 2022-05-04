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
					<li><a class="dropdown-item" :class="{ disabled: template.selection_required && !selectedGroupUsers.length }" href="#" v-for="template in group.templates" :key="template.id" @click.prevent="print(template)">{{ template.name }}</a></li>
				</ul>
			</div>
			
<!-- 			<div class="p-2">
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
			</div> -->
			
		</div>

<!-- 		<div class="mx-2 my-1 p-1 d-flex justify-content-between" style="border: 1px solid transparent;">
			<input type="checkbox" class="mx-1" @click="toggleCheckboxes">

			<span class="px-1">Ф.И.О</span>
			<span class="flex-fill px-1">Компания</span>
			<span class="flex-fill px-1">Должность</span>
			<span class="flex-fill px-1">Требование</span>
			<span class="flex-fill px-1">Рег. №</span>
			<span class="flex-fill px-1">Экзамены</span>

			<Modal v-for="user in users" :key="user.id" :header="true" :footer="true" :open-button="false" dialog-class="modal-xl" :modal-id="`create_user_modal${user.id}`">
				<template v-slot:header>
					Создать нового пользователя
				</template>
				<template v-slot:body>
					<GroupUserForm :autocomplete="group.group_users" :fields="group.course?.group.group_users[0].fields" :value="{ ...user, user: user }" :id="`storeGroupUserForm${user.id}`" @submit.prevent="storeGroupUser">
						<input type="hidden" name="group_id" :value="group.id">
						<input type="hidden" name="user_id" :value="user.id">
						<input type="submit" class="d-none">
					</GroupUserForm>
				</template>
				<template v-slot:footer>
					<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal" :form="`storeGroupUserForm${user.id}`">Создать</button>
					<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
				</template>
			</Modal>

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
								<span class="px-1">
									{{ user.fullName }}
								</span>
							</template>
							<template v-slot:append>
								<span class="btn btn-link text-primary px-1 py-0" data-bs-dismiss="modal" :data-bs-target="`#create_user_modal${user.id}`" data-bs-toggle="modal" v-if="!isUserInGroup(user)">
									<font-awesome-icon :icon="['fa', 'plus-square']" />
								</span>

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

			<Modal :header="true" :footer="true" :open-button="false" dialog-class="modal-xl" modal-id="create_user_modal">
				<template v-slot:header>
					Создать нового пользователя
				</template>
				<template v-slot:body>
					<GroupUserForm :autocomplete="group.group_users" :fields="group.course?.group.group_users[0]?.fields" id="storeUserForm" @submit.prevent="storeGroupUser">
						<input type="hidden" name="group_id" :value="group.id">
						<input type="submit" class="d-none">
					</GroupUserForm>
				</template>
				<template v-slot:footer>
					<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal" form="storeUserForm">Создать</button>
					<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
				</template>
			</Modal>
		</div>

		<Card :toggle-on="true" class="mx-2 my-1" v-for="group_user in group.group_users" :key="group_user.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1" :value="group_user.id" v-model="selectedGroupUsers">
			</template>
			<template v-slot:header>
				<span class="px-1">
					{{ group_user.fullName }}
				</span>
			</template>
			<template v-slot:append>
				<EditModal dialog-class="modal-xl" fa-icon="user-edit" :form="`updateGroupUserForm${group_user.id}`">
					<GroupUserForm :autocomplete="group.group_users" :fields="group_user.fields" :value="group_user" :id="`updateGroupUserForm${group_user.id}`" @submit.prevent="updateGroupUser($event, group_user)">
						<input type="submit" class="d-none">
					</GroupUserForm>
				</EditModal>

				<DeleteModal @delete="deleteGroupUser(group_user)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group_user.fullName }}</span>?
				</DeleteModal>
			</template>
			<template v-slot:content>
				<div class="p-1 d-flex flex-wrap">
					<div class="col-12 col-md-6" v-for="field in group_user.fields" :key="field.id">
						<span class="fw-bold px-1">{{ field.name }}:</span>
						<span class="px-1">{{ field.value }}</span>
					</div>
				</div>
			</template>
		</Card> -->

		<div class="p-2">
			<table class="table table-striped custom-table">
				<thead>
					<tr>
						<th><input type="checkbox" class="mx-1" @click="toggleCheckboxes"></th>
						<th scope="col">#</th>
						<th scope="col">Ф.И.О</th>
						<th scope="col">Экзамены</th>
						<th scope="col"></th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="group_user in group.group_users" :key="group_user.id">
						<td><input type="checkbox" class="mx-1" :value="group_user.id" v-model="selectedGroupUsers"></td>
						<td scope="row">1</td>
						<td>{{ group_user.fullName }}</td>
						<td>{{ group_user.all_exams_passed }}</td>
						<td>
							<div class="d-flex">
								<span class="btn btn-link text-warning mx-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#edit_group_user_modal_${group_user.id}`" data-bs-toggle="modal">
									<font-awesome-icon :icon="['fa', 'user-edit']" />
								</span>
								<span class="btn btn-link text-danger mx-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#delete_group_user_${group_user.id}`" data-bs-toggle="modal">
									<font-awesome-icon :icon="['fa', 'trash-alt']" />
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>

		<div v-for="group_user in group.group_users" :key="group_user.id">
			<EditModal :open-button="false" :modal-id="`edit_group_user_modal_${group_user.id}`" dialog-class="modal-xl" fa-icon="user-edit" :form="`updateGroupUserForm${group_user.id}`">
				<GroupUserForm :autocomplete="group.group_users" :fields="group_user.fields" :value="group_user" :id="`updateGroupUserForm${group_user.id}`" @submit.prevent="updateGroupUser($event, group_user)">
					<input type="submit" class="d-none">
				</GroupUserForm>
			</EditModal>
			<DeleteModal :open-button="false" :modal-id="`delete_group_user_${group_user.id}`" @delete="deleteGroupUser(group_user)">
				Вы действительно хотите удалить запись <span class="fw-bold">{{ group_user.fullName }}</span>?
			</DeleteModal>
		</div>

	</div>
</template>

<script>
	import User from '@/store/models/User'
	import Group from '@/store/models/Group'
	/*import Field from '@/store/models/Field'*/
	import GroupUser from '@/store/models/GroupUser'
	import SearchUsers from '@/components/SearchUsers'
	import UserForm from '@/components/forms/User'
	import GroupUserForm from '@/components/forms/GroupUser'
	import GroupForm from '@/components/forms/Group'
	import FileSaver from 'file-saver';
	import { v4 as uuidv4 } from 'uuid';

	export default {
		beforeCreate() {
			Group.api().fetchById(this.$route.params.group_id, '?include=fields.options,course.group.group_users.fields.options,templates,group_users.user,group_users.fields.options,group_users.exams');
		},
		data() {
			return {
				foundUsers: [],
				selectedGroupUsers: [],
				allChecked: false
			}
		},
		components: {
			SearchUsers,
			GroupForm,
			UserForm,
			GroupUserForm,
		},
		methods: {
			toggleCheckboxes() {
				if (!this.allChecked) {
					this.allChecked = true;
					this.selectedGroupUsers = [];
					for (let group_user in this.group.group_users) {
						this.selectedGroupUsers.push(this.group.group_users[group_user].id);
					}
				} else {
					this.allChecked = false;
					this.selectedGroupUsers = [];
				}
			},
			updateGroup(event) {
				Group.api().update(event.currentTarget, this.$route.params.group_id, '?includes=fields.options');
			},
			addUser(user) {
				GroupUser.api().post(`/api/group_users?include=user,fields.options`, {
					group_id: this.$route.params.group_id,
					user_id: user.id,
				}).then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
					}
				});
			},
			updateGroupUser(event, groupUser) {
				//User.api().update(event, groupUser.user.id);
				GroupUser.api().update(event.currentTarget, groupUser.id, '?includes=user,fields.options');
			},
			deleteGroupUser(groupUser) {
				GroupUser.api().deleteById(groupUser.id);
			},
			isUserInGroup(user) {
				return this.group.group_users.map(gu => gu.user?.id).indexOf(user.id) != -1;
			},
			storeUser(event) {
				if (event.currentTarget.elements['iin'].value) {
					User.api().store(event.currentTarget).then(r => {
						if (r.response.status === 200) {
							this.addUser(r.response.data.data);
						}
					});
				} else {
					this.storeGroupUser(event);
				}
			},
			storeGroupUser(event) {
				GroupUser.api().store(event.currentTarget, '?include=user,fields.options');
			},
			print(template) {
				this.$axios({
					url: `/api/templates/${template.id}/print`,
					method: 'POST',
					data: {
						selected: this.selectedGroupUsers
					},
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
				return Group.query().with(['fields.options', 'course.group.group_users.fields.options', 'templates', 'group_users.user', 'group_users.fields.options', 'group_users.exams']).find(this.$route.params.group_id) || new Group;
			},
			users() {
				return User.findIn(this.foundUsers);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.custom-table {
		overflow-x: auto;
		display: block;
		tr {
			th, td {
				border-bottom: 0;
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