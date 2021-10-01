<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<input type="hidden" name="course_id" :value="value.course_id || $route.params.course_id">
		<div class="p-2 d-flex flex-column w-100">
			<label class="form-label" for="name">{{ $t(`models.user['Название']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="name" name="name" :value="value.name" :readonly="!canEdit">
		</div>
		<div class="w-100 text-center">
			<slot />
		</div>
	</form>
</template>

<script>
	import Template from '@/store/models/Template'

	export default {
		props: {
			value: {
				type: Object,
				default: new Template
			},
			canEdit: {
				type: Boolean,
				default: true
			}
		},
	}
</script>

<style lang="scss">

</style>