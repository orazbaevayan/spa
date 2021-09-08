<template>
	<form class="p-2" @submit.prevent="updateCourse">
		<Title>{{ $t('pages.Редактирование курса') }}</Title>
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" v-model="course.name">
		</div>
		<div class="p-2">
			<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Редактировать')">
		</div>
	</form>
</template>

<script>
	import Course from '@/store/models/Course'

	export default {
		created() {
			Course.api().get('/api/courses/' + this.$route.params.course_id)
			.then(() => {
				this.course = Course.find(this.$route.params.course_id);
			}).catch(e => console.log(e));
		},
		data() {
			return {
				course: new Course
			}
		},
		methods: {
			updateCourse() {
				Course.api().patch('/api/courses/' + this.$route.params.course_id, this.course)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			}
		}
	}
</script>