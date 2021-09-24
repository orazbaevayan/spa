<template>
	<UserForm @submit.prevent="storeUser">
		<input type="submit" class="btn btn-sm btn-primary text-white" :value="$t('ui.Создать')">
	</UserForm>
</template>

<script>
	import User from '@/store/models/User'
	import UserForm from '@/components/forms/User'

	export default {
		components: {
			UserForm
		},
		methods: {
			storeUser(event) {
				let formData = new FormData(event.currentTarget);
				User.api().post('api/users', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
						this.$router.push({ name: 'manager-index-users' });
					}
				})
				.catch(e => console.log(e));
			}
		}
	}
</script>

<style lang="scss" scoped>
	
</style>