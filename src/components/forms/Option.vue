<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<div class="col-12 p-2">
			<label class="form-label" for="name">{{ $t(`models.ALL['Название']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="name" name="name" v-once :value="value.name" :readonly="!canEdit">
		</div>
		<div class="col-12 p-2">
			<label for="value" class="form-label">{{ $t(`models.ALL['Значение']`) }}</label>
			<textarea class="form-control" name="value" id="value" rows="3" v-once :value="value.code" :readonly="!canEdit"></textarea>
		</div>
		<div class="w-100 text-center">
			<slot />
		</div>
	</form>
</template>

<script>
	import Option from '@/store/models/Option'

	export default {
		props: {
			value: {
				type: Object,
				default: new Option
			},
			canEdit: {
				type: Boolean,
				default: true
			},
			optionableType: {
				type: String,
				default: null
			},
			optionableId: {
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