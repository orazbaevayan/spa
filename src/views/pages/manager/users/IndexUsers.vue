<template>
	<Title class="mt-2">{{ $t('pages.Пользователи') }}</Title>
	<div class="p-2 d-flex flex-column">
		<SearchUsers @search="r => foundUsers = r" />
		<div class="mx-2 my-1 p-1 d-flex justify-content-between" style="border: 1px solid transparent;">
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
				{{ user.fullName }}
			</template>
			<template v-slot:append>
				<router-link class="text-warning px-1 py-0" :to="{ name: 'manager-edit-user', params: { user_id: user.id } }">
					<font-awesome-icon :icon="['fa', 'pencil-alt']" />
				</router-link>
				<button class="btn btn-link text-danger px-1 py-0" @click.prevent="deleteUser(user)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</button>
			</template>
			<template v-slot:content>
				<UserForm :can-edit="false" :value="user"/>
			</template>
		</Card>
	</div>
</template>

<script>
	import User from '@/store/models/User'
	import SearchUsers from '@/components/SearchUsers'
	import UserForm from '@/components/forms/User'

	export default {
		components: {
			SearchUsers,
			UserForm,
		},
		data() {
			return {
				foundUsers: []
			}
		},
		methods: {
			deleteUser(user) {
				User.api().deleteById(user.id);
			},
			search(result) {
				console.log(result);
			},
		},
		computed: {
			users() {
				return User.findIn(this.foundUsers);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>