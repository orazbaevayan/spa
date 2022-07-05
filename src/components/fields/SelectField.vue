<template>
	<div>
		<label class="form-label">{{ field.name }}</label>
		<select class="form-select form-select-sm" :name="`fields[${field.id}]`" :value="value.value">
			<option :value="option.value" v-for="option in field.options" :key="option.id" v-html="option.key" />
		</select>
	</div>
</template>

<script>
	export default {
		props: {
			field: {
				type: Object,
				default: () => {
					return {
						name: '',
					}
				}
			},
			value: {
				type: Object,
				default: () => {
					return {
						value: '',
					}
				}
			},
			autocomplete: {
				type: Object,
				default: () => {},
			},
			name: {
				type: String,
				default: ''
			}
		}
	}
</script>