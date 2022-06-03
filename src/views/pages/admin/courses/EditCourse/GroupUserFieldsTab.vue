<template>
	<Card class="mx-2 my-1" :is-control-panel="true">
		<template v-slot:prepend>
			<input type="checkbox" class="mx-1">
		</template>
		<template v-slot:append>
			<CreateModal dialog-class="modal-md" form="storeFieldForm">
				<FieldForm fieldable-type="group_users" :fieldable-id="group_user?.id" id="storeFieldForm" @submit.prevent="storeField" />
			</CreateModal>
		</template>
	</Card>
	<Card class="mx-2 my-1" :toggle-on="['Select', 'TextSelect', 'TextAutocomplete'].includes(field.type) ? true : false" v-for="field in fields" :key="field.id">
		<template v-slot:header>
			<span class="px-1">
				{{ field.name }}
			</span>
		</template>
		<template v-slot:append>
			<EditModal dialog-class="modal-md" :form="`editFieldForm${field.id}`">
				<FieldForm fieldable-type="group_users" :fieldable-id="group_user?.id" :value="field" :id="`editFieldForm${field.id}`" @submit.prevent="updateField($event, field.id)" />
			</EditModal>
			<DeleteModal @delete="deleteField(field)">
				Вы уверены что хотите удалить запись <b>{{ field.name }}</b>?
			</DeleteModal>
		</template>
		<template v-slot:content>
				<div class="p-1 d-flex flex-column">
					<Card class="m-1" :is-control-panel="true">
						<template v-slot:prepend>
							<span class="fw-bold px-1">Опции</span>
						</template>
						<template v-slot:append>
							<CreateModal dialog-class="modal-md" form="storeOptionForm">
								<OptionForm id="storeOptionForm" @submit.prevent="storeOptionToField($event, field)" />
							</CreateModal>
						</template>
					</Card>
					<Card class="m-1" :toggle-on="true" v-for="option in field.options" :key="option.id">
						<template v-slot:header>
							<span class="px-1">
								{{ option.key }}
							</span>
						</template>
						<template v-slot:append>
							<EditModal dialog-class="modal-md" :form="`editOptionForm${option.id}`">
								<OptionForm :value="option" :id="`editOptionForm${option.id}`" @submit.prevent="updateOption($event, option)" />
							</EditModal>
							<DeleteModal @delete="deleteOption(option)">
								Вы уверены что хотите удалить запись <b>{{ option.key }}</b>?
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
	import CourseVersion from '@/store/models/CourseVersion'
	import Field from '@/store/models/Field'
	/*import FieldOption from '@/store/models/FieldOption'*/
	import OptionForm from '@/components/forms/Option'

	export default {
		created() {
			
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
				formData.append('field_id', field.id);
				Option.api().post('api/options', formData)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
						/*FieldOption.api().post('api/field_options', {
							option_id: r.response.data.data.id,
							field_id: field.id,
						});*/
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
			courseVersion() {
				return CourseVersion.query().with(['group_user.fields.options']).find(this.$route.params.course_version_id) || new CourseVersion;
			},
			options() {
				return Option.query().with(['field_options']).get();
			},
			group_user() {
				return this.courseVersion.group_user;
			},
			fields() {
				return this.courseVersion.group_user?.fields;
			}
		}
	}
</script>