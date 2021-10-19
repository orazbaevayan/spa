<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<div class="col-12 p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" :value="value.name">
		</div>
		<div class="w-100 text-center">
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