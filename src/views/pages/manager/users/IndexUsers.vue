<template>
	<div class="p-2 d-flex flex-column">
		<Title>{{ $t('pages.Пользователи') }}</Title>
		<div class="input-group p-2">
			<div class="input-group-text p-0 border-none" style="overflow: hidden;">
				<select class="form-select" style="border: none; border-radius: 0;">
					<option value="1">ИИН</option>
					<option value="2">Ф.И.О</option>
				</select>
			</div>
			<input type="text" class="form-control">
			<button class="btn btn-primary" type="button">
				<font-awesome-icon :icon="['fa', 'search']" />
			</button>
		</div>
		<div class="mx-2 my-1 p-1 d-flex justify-content-between" style="border: 1px solid transparent;">
			<input type="checkbox" class="mx-1 my-0 form-check-input">
			<router-link class="text-primary px-1 py-0" :to="{ name: 'admin-create-course' }">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</router-link>
		</div>
		<Card class="mx-2 my-1" v-for="user in users" :key="user.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1 my-0 form-check-input">
			</template>
			<template v-slot:header>
				{{ user.fullName }}
			</template>
			<template v-slot:append>
				<!-- <router-link class="text-warning px-1 py-0" :to="{ name: 'admin-edit-user', params: { user_id: user.id } }">
					<font-awesome-icon :icon="['fa', 'pencil-alt']" />
				</router-link> -->
				<a href="#" class="text-danger px-1 py-0" @click="deleteCourse(user)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</a>
			</template>
		</Card>
	</div>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		created() {
			User.api().fetch();
		},
		methods: {
			deleteUser(user) {
				User.api().deleteById(user.id);
			},
		},
		computed: {
			users() {
				return User.all();
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>