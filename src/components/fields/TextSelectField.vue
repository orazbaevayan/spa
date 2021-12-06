<template>
	<div>
		<label class="form-label">{{ value.name }}</label>
		<div class="d-flex position-relative">
			<input type="text" :name="`fields[${value.id}]`" class="form-control form-control-sm" v-model="text" autocomplete="off">
			<button type="button" class="btn btn-sm btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" data-bs-auto-close="inside" data-bs-reference="parent" aria-expanded="false">
				<span class="visually-hidden">Toggle Dropdown</span>
			</button>
			<ul class="dropdown-menu">
				<!-- <div class="px-3 py-2 position-relative">
					<input type="search" class="form-control form-control-sm mw-100" placeholder="Фильтр" v-model="search">
				</div> -->
				<div class="results">
					<p class="m-0 text-center px-3 py-1 text-muted" v-if="!options.length">
						Нет вариантов
					</p>
					<li class="dropdown-item" v-for="option in options" :key="option.id" v-else @click="text = option.key">
						<span v-if="option.key != option.value"><b>{{ option.key }}</b> - </span>{{ option.value }}
					</li>
				</div>
			</ul>
		</div>
	</div>
</template>

<script>
	import Fuse from 'fuse.js'

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
		},
		created() {
			this.text = this.value.value;
		},
		data() {
			return {
				text: '',
				/*search: '',*/
			}
		},
		computed: {
			options() {
				const options = {
					includeScore: true,
					ignoreLocation: true,
					threshold: 0.0,
					keys: ['key', 'value']
				}
				const result = [...(this.text ? new Fuse(this.value.options, options).search(this.text).map(i => i.item) : this.value.options)];
				return [...new Set(result)];
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