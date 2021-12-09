<template>
	<form class="w-100 d-flex flex-row flex-wrap" v-if="value">
		<div class="p-2">
			<Photo :can-edit="canEdit" :value="value.photo"/>
		</div>
		<div class="flex-fill">
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
		<div class="flex-fill">
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="iin">{{ $t(`models.user['ИИН']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="iin" :value="value.user?.iin" maxlength="12" :readonly="true">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="phone">{{ $t(`models.user['Телефон']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="phone" :value="value.user?.phone" maxlength="11" :readonly="true">
			</div>
			<div class="p-2 d-flex flex-column">
				<label class="form-label" for="email">{{ $t(`models.user['E-mail']`) }}</label>
				<input type="text" class="form-control form-control-sm" id="email" :value="value.user?.email" :readonly="true">
			</div>
		</div>
		<div class="w-100 d-flex flex-row flex-wrap">
			<component class="p-2 col-12 col-md-6" :is="`${field.type}Field`" :autocomplete="group.group_users" :value="field" v-for="field in value.fields" :key="field.id" />
			<input type="submit" class="d-none">
		</div>
	</form>
</template>

<script>
	import Photo from '@/components/Photo'
	import GroupUser from '@/store/models/GroupUser'
	import Group from '@/store/models/Group'

	export default {
		props: {
			value: {
				type: Object,
				default: new GroupUser
			},
			canEdit: {
				type: Boolean,
				default: true
			}
		},
		components: {
			Photo
		},
		computed: {
			group() {
				return Group.query().with('group_users.fields').where(this.value.group_id).first();
			}
		}
	}
</script>

<style lang="scss">

</style>