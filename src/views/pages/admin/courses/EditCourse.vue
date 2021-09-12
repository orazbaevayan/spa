<template>
	<form ref="courseForm" class="p-2 w-100" @submit.prevent="updateCourse">
		<Title>{{ $t('pages.Редактирование курса') }}</Title>
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="course.name">
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
			Course.api().fetchById(this.$route.params.course_id);
		},
		methods: {
			updateCourse() {
				let formData = new FormData(this.$refs.courseForm);
				formData.append('_method', 'PATCH');
				Course.api().post(`/api/courses/${this.$route.params.course_id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			}
		},
		computed: {
			course() {
				return Course.find(this.$route.params.course_id) || new Course;
			}
		}
	}
</script>