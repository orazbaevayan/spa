<template>
	<form class="input-group input-group-sm" @submit.prevent="searchUsers">
		<select v-model="searchField" class="text-start input-group-text bg-white flex-grow-0">
			<option value="iin">{{ $t('models.user.ИИН') }}</option>
			<option value="full_name">{{ $t('models.user["Ф.И.О"]') }}</option>
			<option value="company">{{ $t('models.user.Компания') }}</option>
			<option value="position">{{ $t('models.user.Должность') }}</option>
			<option value="phone">{{ $t('models.user.Телефон') }}</option>
		</select>
		<input type="text" class="form-control" v-model="searchText" :maxlength="maxLength">
		<button class="btn btn-primary" type="submit">
			<font-awesome-icon :icon="['fa', 'search']" />
		</button>
	</form>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		data() {
			return {
				searchText: '',
				searchField: 'iin',
			}
		},
		methods: {
			searchUsers() {
				User.api().fetch(`?filter[${this.searchField}]=${this.searchText}`);
			},
		},
		computed: {
			maxLength() {
				let rules = {
					iin: 12,
					full_name: 255,
					company: 255,
					position: 255,
					phone: 11
				}
				return rules[this.searchField];
			},
		}
	}
</script>

<style lang="scss" scoped>
	form {
		flex-direction: row;
		input, button {
			z-index: auto !important;
		}
	}
</style>