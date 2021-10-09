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
		<template v-slot:header>
			{{ field.name }}
		</template>
		<template v-slot:append>
			<EditModal dialog-class="modal-md" :form="`editFieldForm${field.id}`">
				<FieldForm fieldable-type="courses" :fieldable-id="course.id" :value="field" :id="`editFieldForm${field.id}`" @submit.prevent="updateField($event, field.id)" />
			</EditModal>
			<DeleteModal @delete="deleteField(field)">
				Вы уверены что хотите удалить запись <b>{{ field.name }}</b>?
			</DeleteModal>
		</template>
		<template v-slot:content>
				<div class="p-1 d-flex flex-column">
					<Card class="m-1" :is-control-panel="true">
						<template v-slot:prepend>
							<input type="checkbox" class="mx-1">
						</template>
						<template v-slot:append>
							<CreateModal dialog-class="modal-md" form="storeOptionForm">
								<OptionForm id="storeOptionForm" @submit.prevent="storeOptionToField($event, field)" />
							</CreateModal>
						</template>
					</Card>
					<Card class="m-1" :toggle-on="true" v-for="option in field.options" :key="option.id">
						<template v-slot:header>
							{{ option.name }}
						</template>
						<template v-slot:append>
							<EditModal dialog-class="modal-md" :form="`editOptionForm${option.id}`">
								<OptionForm :value="option" :id="`editOptionForm${option.id}`" @submit.prevent="updateOption($event, option)" />
							</EditModal>
							<DeleteModal @delete="deleteOption(option)">
								Вы уверены что хотите удалить запись <b>{{ option.name }}</b>?
							</DeleteModal>
						</template>
						<template v-slot:content>
							<div class="p-2">
								{{ option.value }}
							</div>
						</template>
					</Card>
				</div>
		</template>
	</Card>
</template>

<script>
	import FieldForm from '@/components/forms/Field'
	import Option from '@/store/models/Option'
	import Course from '@/store/models/Course'
	import Field from '@/store/models/Field'
	import FieldOption from '@/store/models/FieldOption'
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
			},
			storeOptionToField(event, field) {
				let formData = new FormData(event.currentTarget);
				Option.api().post('api/options', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
						FieldOption.api().post('api/field_options', {
							option_id: r.response.data.data.id,
							field_id: field.id,
						});
					}
				})
				.catch(e => console.log(e));
			},
			updateOption(event, option) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				Option.api().post(`/api/options/${option.id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
			deleteOption(option) {
				Option.api().deleteById(option.id);
			},
		},
		computed: {
			course() {
				return Course.query().with(['fields.options']).find(this.$route.params.course_id) || new Course;
			},
			options() {
				return Option.query().with(['field_options']).get();
			}
		}
	}
</script>