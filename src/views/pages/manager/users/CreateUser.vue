<template>
	<form class="p-2 w-100 d-flex flex-row flex-wrap" @submit.prevent="storeUser">
		<Title class="w-100">{{ $t('pages.Создание пользователя') }}</Title>
		<div class="p-2">
			<Photo :value="user.photo"/>
		</div>
		<div class="flex-fill">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="last_name">{{ $t(`models.user['Фамилия']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="last_name" name="last_name" v-model="user.last_name">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="first_name">{{ $t(`models.user['Имя']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="first_name" name="first_name" v-model="user.first_name">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="middle_name">{{ $t(`models.user['Отчество']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="middle_name" name="middle_name" v-model="user.middle_name">
			</div>
		</div>
		<div class="flex-fill">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="iin">{{ $t(`models.user['ИИН']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="iin" name="iin" v-model="user.iin" maxlength="12">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="phone">{{ $t(`models.user['Телефон']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="phone" name="phone" v-model="user.phone" maxlength="11">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="email">{{ $t(`models.user['E-mail']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="email" name="email" v-model="user.email">
			</div>
		</div>
		<div class="p-2 w-100">
			<input type="submit" class="btn btn-sm btn-primary text-white" :value="$t('ui.Создать')">
		</div>
	</form>
</template>

<script>
	import User from '@/store/models/User'
	import Photo from '@/components/Photo'

	export default {
		components: {
			Photo,
		},
		data() {
			return {
				user: new User
			}
		},
		methods: {
			storeUser(event) {
				let formData = new FormData(event.currentTarget);
/*				for (var value of formData.values()) {
					console.log(value);
				}*/
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