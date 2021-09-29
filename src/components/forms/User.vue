<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<div class="p-2">
			<Photo :can-edit="canEdit" :value="value.photo"/>
		</div>
		<div class="input-block">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="last_name">{{ $t(`models.user['Фамилия']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="last_name" name="last_name" :value="value.last_name" :readonly="!canEdit">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="first_name">{{ $t(`models.user['Имя']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="first_name" name="first_name" :value="value.first_name" :readonly="!canEdit">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="middle_name">{{ $t(`models.user['Отчество']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="middle_name" name="middle_name" :value="value.middle_name" :readonly="!canEdit">
			</div>
		</div>
		<div class="input-block">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="iin">{{ $t(`models.user['ИИН']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="iin" name="iin" :value="value.iin" maxlength="12" :readonly="!canEdit">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="phone">{{ $t(`models.user['Телефон']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="phone" name="phone" :value="value.phone" maxlength="11" :readonly="!canEdit">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="email">{{ $t(`models.user['E-mail']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="email" name="email" :value="value.email" :readonly="!canEdit">
			</div>
		</div>
		<div class="w-100 text-center">
			<slot />
		</div>
	</form>
</template>

<script>
	import Photo from '@/components/Photo'
	import User from '@/store/models/User'

	export default {
		props: {
			value: {
				type: Object,
				default: new User
			},
			canEdit: {
				type: Boolean,
				default: true
			}
		},
		components: {
			Photo
		},
	}
</script>

<style lang="scss">
	.input-block {
		flex: 1 0 170px;
	}
</style>