<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<div class="col-12 p-2">
			<label class="form-label" for="comment">Комментарий</label>
			<input type="text" class="form-control form-control-sm" name="comment" :value="value.comment">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="groups_table">Таблица Групп</label>
			<input type="text" class="form-control form-control-sm" id="groups_table" name="groups_table" :value="value.groups_table">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="students_table">Таблица Студентов</label>
			<input type="text" class="form-control form-control-sm" id="students_table" name="students_table" :value="value.students_table">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="group_name_template">Шаблон названия группы</label>
			<input type="text" class="form-control form-control-sm" id="group_name_template" name="group_name_template" :value="value.group_name_template">
		</div>
		<div class="col-12 p-2">
			<div class="form-check form-switch m-0">
				<input type="hidden" name="generate_group_name" value="0">
				<input class="form-check-input" type="checkbox" name="generate_group_name" id="generate_group_name" value="1" :checked="value.generate_group_name">
				<label class="form-check-label" for="generate_group_name">Использовать генерацию названия групп</label>
			</div>
		</div>
		<div class="w-100 text-center">
			<slot />
		</div>
	</form>
</template>

<script>
	import Course from '@/store/models/Course'

	export default {
		props: {
			value: {
				type: Object,
				default: new Course
			},
			canEdit: {
				type: Boolean,
				default: true
			},
			fieldableType: {
				type: String,
				default: null
			},
			fieldableId: {
				type: Number,
				default: null
			},
		},
		data() {
			return {

			}
		},
		methods: {

		},
		computed: {

		}
	}
</script>

<style lang="scss">

</style>