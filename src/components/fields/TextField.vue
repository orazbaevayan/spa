<template>
	<div>
		<label class="form-label">{{ field.name }}</label>
		<input type="text" :name="`fields[${field.id}]`" class="form-control form-control-sm" :value="value.value">
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