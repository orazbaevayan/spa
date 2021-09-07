<template>
	<form class="p-2" @submit.prevent="storeCourse">
		<Title>{{ $t('pages.Создание курса') }}</Title>
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control" name="name" v-model="course.name">
		</div>
		<div class="p-2">
			<input type="submit" class="btn btn-sm btn-primary text-white" :value="$t('ui.Создать')">
		</div>
	</form>
</template>

<script>
	import Course from '@/store/models/Course'

	export default {
		mounted() {
			this.$store.dispatch('ui/notify', { text: 'Bla Bla Bla', status: 'success' });
		},
		data() {
			return {
				course: {
					name: ''
				}
			}
		},
		methods: {
			storeCourse() {
				Course.api().post('api/courses', this.course)
				.then(r => console.log(r.response))
				.catch(e => console.log(e));
			}
		}
	}
</script>