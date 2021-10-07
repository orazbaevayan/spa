<template>
	<Card class="mx-2 my-1" :is-control-panel="true">
		<template v-slot:prepend>
			<input type="checkbox" class="mx-1">
		</template>
		<template v-slot:append>
			<CreateModal dialog-class="modal-lg" form="storeFieldForm">
				<FieldForm fieldable="course_id" fieldable-type="courses" :fieldable-id="course.id" id="storeFieldForm" @submit.prevent="storeField" />
			</CreateModal>
		</template>
	</Card>
	<Card class="mx-2 my-1" :toggle-on="true" v-for="field in course.fields" :key="field.id">
		<template v-slot:append>
			<EditModal dialog-class="modal-md" :form="`editFieldForm${field.id}`">
				<FieldForm fieldable-type="courses" :fieldable-id="course.id" :value="field" :id="`editFieldForm${field.id}`" @submit.prevent="updateField($event, field.id)" />
			</EditModal>
			<DeleteModal @delete="deleteField(field)">
				Вы уверены что хотите удалить запись <b>{{ field.name }}</b>?
			</DeleteModal>
		</template>
		<template v-slot:content>
			<div class="p-2">
				<Card class="mx-2 my-1" :is-control-panel="true">
					<template v-slot:prepend>
						<input type="checkbox" class="mx-1">
					</template>
					<template v-slot:append>
						<CreateModal dialog-class="modal-md" form="storeOptionForm">
							<OptionForm id="storeOptionForm" @submit.prevent="storeField" />
						</CreateModal>
					</template>
				</Card>
				<Card class="mx-2 my-1">
					
				</Card>
			</div>
		</template>
		<template v-slot:header>
			{{ field.name }}
		</template>
	</Card>

	<Modal :header="true" :footer="true">
		<template v-slot:open-button>
			<font-awesome-icon class="text-primary mx-1" :icon="['fa', 'user']"/>
		</template>
		<template v-slot:header>
			Тест
		</template>
		<template v-slot:body>
			
		</template>
		<template v-slot:footer>
			<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal">Создать</button>
			<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
		</template>
	</Modal>

</template>

<script>
	import FieldForm from '@/components/forms/Field'
	import Option from '@/store/models/Option'
	import Course from '@/store/models/Course'
	import Field from '@/store/models/Field'
	import OptionForm from '@/components/forms/Option'

	export default {
		created() {
			Option.api().fetch();
		},
		components: {
			FieldForm,
			OptionForm,
		},
		methods: {
			storeField(event) {
				let formData = new FormData(event.currentTarget);
				Field.api().post('api/fields', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
					}
				})
				.catch(e => console.log(e));
			},
			updateField(event, id) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				Field.api().post(`/api/fields/${id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
			deleteField(field) {
				Field.api().deleteById(field.id);
			}
		},
		computed: {
			course() {
				return Course.query().with(['groups', 'templates', 'fields']).find(this.$route.params.course_id) || new Course;
			}
		}
	}
</script>