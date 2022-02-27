<template>
	<div>
		123
	</div>
	<!-- <Title class="mt-2">{{ $t('pages.Экзамены') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Card class="mx-2 my-1" v-for="course in courses" :key="course.id">
			<template v-slot:header>
				{{ course.name }}
			</template>
			<template v-slot:append>
				<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-index-groups', params: { course_id: course.id } }">
					<font-awesome-icon :icon="['fa', 'eye']" />
				</router-link>
			</template>
		</Card>
	</div> -->
</template>

<script>
	//import Course from '@/store/models/Course'
	import User from '@/store/models/User'

	export default {
		created() {
			this.$fetchApiData([
				User.api().fetchById(this.$store.state.auth.user, '?include=group_users.exams'),
			]);
		},
		computed: {
			user() {
				return User.query().with(['group_users.exams']).find(this.$store.state.auth.user) || null;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>