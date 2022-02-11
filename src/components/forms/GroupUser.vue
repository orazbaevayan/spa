<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<div class="p-2">
			<Photo :can-edit="canEdit" :value="value.photo"/>
		</div>
		<div class="flex-fill">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="last_name">{{ $t(`models.user['Фамилия']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="last_name" name="last_name" :value="value.last_name" :readonly="!canEdit" @input="updateField('last_name_to', $event)">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="first_name">{{ $t(`models.user['Имя']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="first_name" name="first_name" :value="value.first_name" :readonly="!canEdit" @input="updateField('first_name_to', $event)">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="middle_name">{{ $t(`models.user['Отчество']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="middle_name" name="middle_name" :value="value.middle_name" :readonly="!canEdit" @input="updateField('middle_name_to', $event)">
			</div>
		</div>
		<div class="flex-fill">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="last_name_to">{{ $t(`models.user['Фамилия (Кому?)']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="last_name_to" name="last_name_to" :value="value.last_name_to" :readonly="!canEdit" ref="last_name_to">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="first_name_to">{{ $t(`models.user['Имя (Кому?)']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="first_name_to" name="first_name_to" :value="value.first_name_to" :readonly="!canEdit" ref="first_name_to">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="middle_name_to">{{ $t(`models.user['Отчество (Кому?)']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="middle_name_to" name="middle_name_to" :value="value.middle_name_to" :readonly="!canEdit" ref="middle_name_to">
			</div>
		</div>
		<div class="flex-fill">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="iin">{{ $t(`models.user['ИИН']`) }}</label>
				<input type="text" class="form-control form-control-sm" name="iin" id="iin" :value="value.user?.iin" maxlength="12" :readonly="value.user">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="phone">{{ $t(`models.user['Телефон']`) }}</label>
				<input type="text" class="form-control form-control-sm" name="phone" id="phone" :value="value.user?.phone" maxlength="11" :readonly="value.user">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="email">{{ $t(`models.user['E-mail']`) }}</label>
				<input type="text" class="form-control form-control-sm" name="email" id="email" :value="value.user?.email" :readonly="value.user">
			</div>
		</div>
		<div class="w-100 d-flex flex-row flex-wrap">
			<component class="p-2 col-12 col-md-6" :is="`${field.type}Field`" :autocomplete="autocomplete" :value="field" v-for="field in fields" :key="field.id" />
			<input type="submit" class="d-none">
		</div>
		<div class="w-100 d-flex flex-row flex-wrap">
			<slot />
		</div>
	</form>
</template>

<script>
	import Photo from '@/components/Photo'
	import GroupUser from '@/store/models/GroupUser'

	export default {
		props: {
			value: {
				type: Object,
				default: new GroupUser
			},
			canEdit: {
				type: Boolean,
				default: true
			},
			fields: {
				type: Object,
				default: null
			},
			autocomplete: {
				type: Object,
				default: null
			}
		},
		components: {
			Photo
		},
		methods: {
			updateField(field, event) {
				this.$refs[field].value = event.currentTarget.value;
			}
		}
	}
</script>

<style lang="scss">

</style>