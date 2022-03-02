<template>
	<Title class="mt-2">{{ $t('pages.Пользователи') }}</Title>
	<div class="p-2 d-flex flex-column">
		<SearchUsers class="p-2" v-model="foundUsers" :use-route-query="true" />
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
	<Pagination :value="foundUsers" class="p-2" v-if="foundUsers.length" />
</template>

<script>
	import User from '@/store/models/User'
	import SearchUsers from '@/components/SearchUsers'
	import UserForm from '@/components/forms/User'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			SearchUsers,
			UserForm,
		},
		data() {
			return {
				foundUsers: [],
			}
		},
		methods: {
			deleteUser(user) {
				User.api().deleteById(user.id);
			},
		},
		computed: {
			...mapGetters({
				'currentPage': 'pagination/currentPage',
				'range': 'pagination/range',
				'elements': 'pagination/elements',
				'currentPageElements': 'pagination/currentPageElements',
			}),
			users() {
				return this.currentPageElements(User.findIn(this.foundUsers));
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>