<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<div class="col-12 p-2">
			<label class="form-label" for="comment">Комментарий</label>
			<input type="text" class="form-control form-control-sm" name="comment" :value="value.comment">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="table">Таблица Групп</label>
			<input type="text" class="form-control form-control-sm" id="table" name="table" :value="value.groups_table">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="table">Таблица Студентов</label>
			<input type="text" class="form-control form-control-sm" id="table" name="table" :value="value.students_table">
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