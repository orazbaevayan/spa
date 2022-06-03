<template>
	<Card class="mx-2 my-1" :is-control-panel="true">
		<template v-slot:prepend>
			<input type="checkbox" class="mx-1">
		</template>
		<template v-slot:append>
			<CreateModal dialog-class="modal-lg" form="storeTemplateForm">
				<TemplateForm :value="newTemplate" id="storeTemplateForm" @submit.prevent="storeTemplate" />
			</CreateModal>
		</template>
	</Card>
	<Card class="mx-2 my-1" v-for="template in courseVersion.templates" :key="template.id">
		<template v-slot:append>
			<EditModal dialog-class="modal-xl" :form="`editTemplateForm${template.id}`">
				<TemplateForm :value="template" :id="`editTemplateForm${template.id}`" @submit.prevent="updateTemplate($event, template.id)" />
			</EditModal>
			<DeleteModal @delete="deleteTemplate(template)">
				Вы уверены что хотите удалить запись <b>{{ template.name }}</b>?
			</DeleteModal>
		</template>
		<template v-slot:header>
			<span class="px-1">
				{{ template.name }}
			</span>
		</template>
	</Card>
</template>

<script>
	import CourseVersion from '@/store/models/CourseVersion'
	import Template from '@/store/models/Template'
	import TemplateForm from '@/components/forms/Template'

	export default {
		created() {
			
		},
		components: {
			TemplateForm,
		},
		methods: {
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
			},
		},
		computed: {
			courseVersion() {
				return CourseVersion.query().with(['templates']).find(this.$route.params.course_version_id) || new CourseVersion;
			},
			newTemplate() {
				return new Template({ course_version_id: this.$route.params.course_version_id });
			}
		}
	}
</script>