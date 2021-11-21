<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<div class="col-12 p-2">
			<label class="form-label" for="key">{{ $t(`models.ALL['Название']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="key" name="key" v-once :value="value.key" :readonly="!canEdit">
		</div>
		<div class="col-12 p-2">
			<label for="value" class="form-label">{{ $t(`models.ALL['Значение']`) }}</label>
			<textarea class="form-control" name="value" id="value" rows="3" v-once :value="value.value" :readonly="!canEdit"></textarea>
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