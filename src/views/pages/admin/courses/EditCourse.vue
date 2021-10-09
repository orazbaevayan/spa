<template>
	<Title>{{ $t('pages.Редактирование курса') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Общие данные', 'Доп. данные', 'Шаблоны', 'Поля']">

			<template v-slot:0>
				<CourseForm :value="course" @submit.prevent="updateCourse">
					<div class="p-2 text-start">
						<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Сохранить')">
					</div>
				</CourseForm>
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
				<TemplatesTab />
			</template>

			<template v-slot:3>
				<FieldsTab />
			</template>

		</Tabs>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import CourseForm from '@/components/forms/Course'
	import FieldsTab from '@/views/pages/admin/courses/EditCourse/FieldsTab'
	import TemplatesTab from '@/views/pages/admin/courses/EditCourse/TemplatesTab'

	export default {
		created() {
			Course.api().fetchById(this.$route.params.course_id);
		},
		components: {
			CourseForm,
			FieldsTab,
			TemplatesTab,
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
			},
		},
		computed: {
			course() {
				return Course.query().with(['groups', 'templates', 'fields']).find(this.$route.params.course_id) || new Course;
			}
		}
	}
</script>