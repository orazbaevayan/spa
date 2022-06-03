<template>
	<Title class="mt-2">{{ $t('pages.Группы') }}</Title>
	<div class="p-2 d-flex flex-column">
		<span class="mb-0 p-2 fw-bold">{{ user.company.name }}</span>
		<Card class="mx-2 my-1" v-for="course in user.company.courses" :key="course.id">
			<template v-slot:header>
				<span class="px-1">
					{{ course.name }}
				</span>
			</template>
			<template v-slot:append>
				<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-index-groups', params: { course_id: course.id, course_version_id: course.course_version.id } }">
					<font-awesome-icon :icon="['fa', 'eye']" />
				</router-link>
			</template>
		</Card>
	</div>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		created() {
			User.api().get('/api/user?include=roles,companies.courses,company.courses.course_version');
		},
		computed: {
			user() {
				return User.query().with(['roles', 'companies.courses', 'company.courses.course_version']).find(this.$store.getters['auth/user'].id);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>