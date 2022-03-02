<template>
	<div id="all" class="role">
		<router-link class="link" active-class="active" :exact="true" :to="{ name: 'Home' }">{{ $t('pages.Главная') }}</router-link>
	</div>
	<div id="user" class="role" v-if="user?.roles.filter(e => e.name === 'user').length > 0">
		<h6 class="title">{{ $t('roles.Студент') }}</h6>
		<router-link class="link" active-class="active" :exact="true" :to="{ name: 'Home' }">{{ $t('pages.Главная') }}</router-link>
		<router-link class="link" active-class="active" :to="{ name: 'user-my-courses' }">{{ $t('pages.Мои курсы') }}</router-link>
	</div>
	<div id="teacher" class="role"  v-if="user?.roles.filter(e => e.name === 'teacher').length > 0">
		<h6 class="title">{{ $t('roles.Преподаватель') }}</h6>
		<router-link class="link" active-class="active" :to="{ name: 'admin-index-courses' }">{{ $t('pages.Курсы') }}</router-link>
	</div>
	<div id="manager" class="role" v-if="user?.roles.filter(e => e.name === 'manager').length > 0">
		<h6 class="title">{{ $t('roles.Менеджер') }}</h6>
		<router-link class="link" active-class="active" :to="{ name: 'manager-index-courses' }">{{ $t('pages.Группы') }}</router-link>
		<router-link class="link" active-class="active" :to="{ name: 'manager-index-users' }">{{ $t('pages.Пользователи') }}</router-link>
	</div>
	<div id="admin" class="role" v-if="user?.roles.filter(e => e.name === 'admin').length > 0">
		<h6 class="title">{{ $t('roles.Админ') }}</h6>
		<router-link class="link" active-class="active" :to="{ name: 'admin-index-courses' }">{{ $t('pages.Курсы') }}</router-link>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		computed: {
			...mapGetters({
				'user': 'auth/user'
			})
		}
	}
</script>

<style lang="scss" scoped>
	.role {
		&:not(:last-child) {
			margin-bottom: 16px;
		}
		.title {
			padding: 4px 8px;
			line-height: 150%;
			font-weight: bold;
			margin: 0;
		}
	}
	.link {
		display: block;
		text-decoration: none;
		padding: 4px 8px;
		line-height: 150%;
		&.active {
			text-decoration: underline;
		}
	}
</style>