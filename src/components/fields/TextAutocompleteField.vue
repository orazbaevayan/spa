<template>
	<div>
		<label class="form-label">{{ field.name }}</label>
		<div class="d-flex position-relative">
			<input type="text" :name="`fields[${field.id}]`" class="form-control form-control-sm" v-model="text" autocomplete="off">
			<button tabindex="-1" type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" data-bs-reference="parent" aria-expanded="false">
				<span class="visually-hidden">Toggle Dropdown</span>
			</button>
			<ul class="dropdown-menu">
				<div class="results">
					<p class="m-0 text-center px-3 py-1 text-muted" v-if="!options.length">
						Нет вариантов
					</p>
					<li class="dropdown-item" v-for="(option, index) in options" :key="index" @click="text = option">
						<span>{{ option }}</span>
					</li>
				</div>
			</ul>
		</div>
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
		},
		created() {
			this.text = this.value.value;
		},
		data() {
			return {
				text: '',
			}
		},
		computed: {
			options() {
				const options = [];
				options.push(...this.field.options.map(i => i.value));
				for (var i = 0; i < this.autocomplete.length; i++) {
					for (var j = 0; j < this.autocomplete[i].values.length; j++) {
						if (this.autocomplete[i].values[j].field.id == this.field.id && !!this.autocomplete[i].values[j].value) options.push(this.autocomplete[i].values[j].value);
					}
				}
				return [...new Set(options)];
			}
		}
	}
</script>

<style lang="scss" scoped>
	input[type="text"] {
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
		border-right: none;
	}
	button[type="button"] {
		border-top-left-radius: 0;
		border-bottom-left-radius: 0;
	}
	ul {
		min-width: 100%;
		font-size: 0.8rem;
		.results {
			max-height: 250px;
			overflow-y: scroll;
			overscroll-behavior: contain;
		}
		li {
			line-height: 1.25;
			white-space:normal;
		}
	}
</style>