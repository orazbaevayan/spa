<template>
	<Title class="mt-2">{{ $t('pages.Пользователи') }}</Title>
	<div class="p-2 d-flex flex-column">
		<!-- <SearchUsers class="p-2" v-model="foundUsers" :use-route-query="true" /> -->

		<div class="p-2">
			<form class="input-group input-group-sm" @submit.prevent="searchUsers">
				<select v-model="searchField" class="text-start input-group-text bg-white flex-grow-0">
					<option value="iin">{{ $t('models.user.ИИН') }}</option>
					<option value="full_name">{{ $t('models.user["Ф.И.О"]') }}</option>
					<option value="company">{{ $t('models.user.Компания') }}</option>
					<option value="position">{{ $t('models.user.Должность') }}</option>
					<option value="phone">{{ $t('models.user.Телефон') }}</option>
				</select>
				<input type="text" class="form-control" v-model="searchText" :maxlength="maxLength">
				<button class="btn btn-primary" type="submit">
					<font-awesome-icon :icon="['fa', 'search']" />
				</button>
			</form>
		</div>

		<div class="mx-2 my-1 p-1 d-flex justify-content-between align-items-center" style="border: 1px solid transparent;">
			<input type="checkbox" class="mx-1 my-0 form-check-input">
			<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-create-user' }">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</router-link>
		</div>
		<Card :toggle-on="true" class="mx-2 my-1" v-for="user in users" :key="user.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1 my-0 form-check-input">
			</template>
			<template v-slot:header>
				<span class="px-1">
					{{ user.fullName }}
				</span>
			</template>
			<template v-slot:append>
				<router-link class="text-warning px-1 py-0" :to="{ name: 'manager-edit-user', params: { user_id: user.id } }">
					<font-awesome-icon :icon="['fa', 'pencil-alt']" />
				</router-link>
				<DeleteModal @delete="deleteUser(user)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ user.fullName }}</span>?
				</DeleteModal>
			</template>
			<template v-slot:content>
				<UserForm class="p-2" :can-edit="false" :value="user"/>
			</template>
		</Card>
	</div>
	<Paginator entity="users" class="p-2" v-if="users.length" />
	<!-- <Pagination :value="foundUsers" class="p-2" v-if="foundUsers.length" /> -->
</template>

<script>
	import User from '@/store/models/User'
	/*import SearchUsers from '@/components/SearchUsers'*/
	import UserForm from '@/components/forms/User'
/*	import { mapGetters } from 'vuex'*/

	export default {
		components: {
			/*SearchUsers,*/
			UserForm,
		},
		beforeMount() {
			this.searchUsers();
		},
		data() {
			return {
				searchText: this.$route.query.search || '',
				searchField: this.$route.query.field || 'iin',
			}
		},
		methods: {
			searchUsers() {
				User.api().fetch(`?filter[${this.searchField}]=${this.searchText}`);
			},
			deleteUser(user) {
				User.api().deleteById(user.id).then(() => {
					this.searchUsers();
				});
			},
		},
		computed: {
			maxLength() {
				let rules = {
					iin: 12,
					full_name: 255,
					company: 255,
					position: 255,
					phone: 11
				}
				return rules[this.searchField];
			},
			users() {
				return User.findIn(this.$store.getters['pagination/data']('users')?.items);
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>