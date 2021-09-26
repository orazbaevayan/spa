<template>
	<button type="button" class="btn btn-link p-0" @click.prevent="modal.show()">
		<slot name="open-button" />
	</button>
	<div ref="modal" class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header" v-if="header">
					<slot name="header" />
				</div>
				<div class="modal-body p-2">
					<slot name="body" />
				</div>
				<div class="modal-footer" v-if="footer">
					<slot name="footer" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { Modal as BootstrapModal } from 'bootstrap';

	export default {
		name: 'modal',
		props: {
			header: {
				type: Boolean,
				default: false
			},
			footer: {
				type: Boolean,
				default: false
			},
		},
		mounted() {
			this.modal = new BootstrapModal(this.$refs.modal);
		},
		data() {
			return {
				modal: null
			}
		}
	}
</script>

<style lang="scss" scoped>
	button {
		border: none;
	}
	.modal {
		padding-right: 0 !important;
	}
</style>