<template>
	<Title>{{ $t('pages.Редактирование курса') }}</Title>
	<div class="p-2">
		<Tabs :tabs="['Общие данные', 'Доп. данные', 'Шаблоны']">

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
				<Card class="mx-2 my-1" :is-control-panel="true">
					<template v-slot:prepend>
						<input type="checkbox" class="mx-1">
					</template>
					<template v-slot:append>
						<CreateModal dialog-class="modal-md" form="storeTemplateForm">
							<TemplateForm id="storeTemplateForm" @submit.prevent="storeTemplate" />
						</CreateModal>
					</template>
				</Card>
				<Card class="mx-2 my-1" v-for="template in course.templates" :key="template.id">
					<template v-slot:append>
						<EditModal dialog-class="modal-md" :form="`editTemplateForm${template.id}`">
							<TemplateForm :value="template" :id="`editTemplateForm${template.id}`" @submit.prevent="updateTemplate($event, template.id)" />
						</EditModal>
						<DeleteModal @delete="deleteTemplate(template)">
							Вы уверены что хотите удалить запись {{ template.name }}?
						</DeleteModal>
					</template>
					<template v-slot:header>
						{{ template.name }}
					</template>
				</Card>
			</template>

		</Tabs>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import Template from '@/store/models/Template'
	import TemplateForm from '@/components/forms/Template'

	export default {
		created() {
			Course.api().fetchById(this.$route.params.course_id);
		},
		components: {
			TemplateForm
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
			storeTemplate(event) {
				let formData = new FormData(event.currentTarget);
				Template.api().post('api/templates', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
					}
				})
				.catch(e => console.log(e));
			},
			updateTemplate(event, id) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				Template.api().post(`/api/templates/${id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
			deleteTemplate(template) {
				Template.api().deleteById(template.id);
			}
		},
		computed: {
			course() {
				return Course.query().with(['groups', 'templates']).find(this.$route.params.course_id) || new Course;
			}
		}
	}
</script>