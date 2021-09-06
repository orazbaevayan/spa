<template>
	<h5 class="p-2 m-0 text-center">Курсы</h5>
	<div class="p-1 d-flex flex-column">
		<Card class="m-1" v-for="course in courses" :key="course.id">
			<template v-slot:header>
				{{ course.name }}
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
		computed: {
			courses() {
				return Course.all();
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>