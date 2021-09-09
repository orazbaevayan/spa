<template>
	<div class="p-2 d-flex flex-column">
		<Title>{{ $t('pages.Группы') }}</Title>
		<div class="mx-2 my-1 p-1 d-flex justify-content-between">
			<input type="checkbox" class="mx-1">
			<router-link class="text-primary px-1 py-0" :to="{ name: 'admin-create-course' }">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</router-link>
		</div>
		<Card class="mx-2 my-1" v-for="course in courses" :key="course.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				{{ course.name }}
			</template>
			<template v-slot:append>
				<router-link class="text-warning px-1 py-0" :to="{ name: 'admin-edit-course', params: { course_id: course.id } }">
					<font-awesome-icon :icon="['fa', 'pencil-alt']" />
				</router-link>
				<a href="#" class="text-danger px-1 py-0" @click="deleteCourse(course)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</a>
			</template>
		</Card>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import Card from '@/components/Card'

	export default {
		created() {
			Course.api().get('api/courses');
		},
		components: {
			Card
		},
		methods: {
			deleteCourse(course) {
				Course.api().delete('api/courses/' + course.id)
				.then(r => {
					if (r.response.data === true) Course.delete(course.id);
				})
				.catch(e => alert(e));
			}
		},
		computed: {
			courses() {
				return Course.all();
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>