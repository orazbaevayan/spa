<template>
	<Title>{{ $t('pages.Редактирование курса') }}</Title>
	<div class="p-2">
		<Tabs :tabs="['Общие данные', 'Доп. данные', 'Документы']">
			<template v-slot:0>
				<form class="w-100" @submit.prevent="updateCourse">
					<div class="p-2">
						<label class="form-label" for="name">Название</label>
						<input type="text" class="form-control form-control-sm" name="name" :value="course.name">
					</div>
					<div class="p-2">
						<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Сохранить')">
					</div>
				</form>
			</template>
			<template v-slot:1>
				<div class="p-2">
					<div class="form-check form-switch">
						<input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault">
						<label class="form-check-label" for="flexSwitchCheckDefault">Использовать генерацию названия</label>
					</div>
				</div>
			</template>
			<template v-slot:2>
				<div class="p-2">
					Документы
				</div>
			</template>
		</Tabs>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'

	export default {
		created() {
			Course.api().fetchById(this.$route.params.course_id);
		},
		methods: {
			updateCourse(event) {
				let formData = new FormData(event.currentTarget);
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