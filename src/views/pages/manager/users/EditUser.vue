<template>
	<Title class="mt-2">{{ $t('pages.Редактирование пользователя') }}</Title>
	<UserForm class="p-2" :value="user" @submit.prevent="updateUser">
		<input type="submit" class="btn btn-sm btn-warning text-white m-2" :value="$t('ui.Сохранить')">
	</UserForm>
</template>

<script>
	import User from '@/store/models/User'
	import UserForm from '@/components/forms/User'

	export default {
		components: {
			UserForm
		},
		created() {
			User.api().fetchById(this.$route.params.user_id);
		},
		methods: {
			updateUser(event) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				User.api().post(`/api/users/${this.$route.params.user_id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			}
		},
		computed: {
			user() {
				return User.find(this.$route.params.user_id) || new User;
			}
		}
	}
</script>