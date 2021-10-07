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
						<CreateModal dialog-class="modal-md" form="storeFieldForm">
							<OptionForm id="storeFieldForm" @submit.prevent="storeField" />
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
</template>

<script>
	import FieldForm from '@/components/forms/Field'
	import Option from '@/store/models/Option'
	import Course from '@/store/models/Course'
	import OptionForm from '@/components/forms/Option'

	export default {
		created() {
			Option.api().fetch();
		},
		components: {
			FieldForm,
			OptionForm,
		},
		computed: {
			course() {
				return Course.query().with(['groups', 'templates', 'fields']).find(this.$route.params.course_id) || new Course;
			}
		}
	}
</script>