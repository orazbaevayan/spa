<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<input type="hidden" name="course_version_id" :value="courseVersionId" v-if="courseVersionId != null">
		<input type="hidden" name="category" :value="category" v-if="category != null">
		<div class="col-12 p-2">
			<label class="form-label" for="type">{{ $t(`models.ALL['Тип']`) }}</label>
			<select class="form-select form-select-sm" name="type" id="type" :value="value.type" :readonly="!canEdit">
				<option value="Text">Текст</option>
				<option value="Date">Дата</option>
				<option value="Select">Выбор</option>
				<option value="TextSelect">Текст и Выбор</option>
				<option value="TextAutocomplete">Текст и Автозаполнение</option>
			</select>
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="name">{{ $t(`models.ALL['Название']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="name" name="name" v-once :value="value.name" :readonly="!canEdit">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="value">{{ $t(`models.ALL['Значение']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="value" name="value" v-once :value="value.value" :readonly="!canEdit">
		</div>
		<div class="col-12 p-2">
			<label class="form-label" for="value">Валидация</label>
			<input type="text" class="form-control form-control-sm" id="validation" name="validation" :value="value.validation" :readonly="!canEdit">
		</div>
		<div class="w-100 text-center">
			<slot />
		</div>
	</form>
</template>

<script>
	import Field from '@/store/models/Field'

	export default {
		props: {
			value: {
				type: Object,
				default: new Field
			},
			canEdit: {
				type: Boolean,
				default: true
			},
			category: {
				type: String,
				default: null
			},
			courseVersionId: {
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