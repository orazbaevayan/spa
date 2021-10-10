<template>
	<div>
		<label class="form-label">{{ value.name }}</label>
		<input type="text" :name="`fields[${value.id}]`" class="form-control form-control-sm" :value="value.value">
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