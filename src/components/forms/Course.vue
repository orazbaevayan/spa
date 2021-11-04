<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<div class="col-12 p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="value.name">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="type">Сортировка групп по</label>
			<select class="form-select form-select-sm" name="order_groups_by" id="order_groups_by" :value="value.order_groups_by" :readonly="!canEdit">
				<option :value="field.name" v-for="field in value.group?.fields" :key="field.id">{{ field.name }}</option>
			</select>
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