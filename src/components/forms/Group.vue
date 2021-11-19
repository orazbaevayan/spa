<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<div class="col-12 p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="value.name">
		</div>
		<div class="col-12 p-2">
			<div class="form-check form-switch m-0">
				<input type="hidden" name="generate_name" value="0">
				<input class="form-check-input" type="checkbox" name="generate_name" id="generate_name" value="1" :checked="value.generate_name">
				<label class="form-check-label" for="generate_name">Использовать генерацию названия</label>
			</div>
		</div>
		<div class="w-100">
			<slot />
		</div>
	</form>
</template>

<script>
	import Group from '@/store/models/Group'

	export default {
		props: {
			value: {
				type: Object,
				default: new Group
			},
			canEdit: {
				type: Boolean,
				default: true
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