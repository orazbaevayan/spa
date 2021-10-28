<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<div class="col-12 p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="value.name">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="order_groups_by">Сортировка групп по</label>
			<textarea class="form-control form-control-sm" name="order_groups_by" id="order_groups_by" rows="3" :value="value.order_groups_by"></textarea>
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