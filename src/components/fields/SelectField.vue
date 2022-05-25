<template>
	<div>
		<label class="form-label">{{ value.name }}</label>
		<select class="form-select form-select-sm" :name="`fields[${value.id}]`" :value="value.value">
			<option :value="option.value" v-for="option in (value.parent_field_id ? value.parent?.options : value.options)" :key="option.id" v-html="option.key" />
		</select>
	</div>
</template>

<script>
	export default {
		props: {
			value: {
				type: Object,
				default: () => {
					return {
						name: '',
						value: '',
					}
				}
			},
			name: {
				type: String,
				default: ''
			}
		}
	}
</script>