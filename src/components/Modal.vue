<template>
	<button type="button" class="btn btn-link p-0" @click.prevent="modal.show()" v-if="openButton">
		<slot name="open-button" />
	</button>
	<div ref="modal" :id="modalId" class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
		<div class="modal-dialog" :class="dialogClass">
			<div class="modal-content">
				<div class="modal-header d-flex justify-content-between p-3" v-if="header">
					<span class="modal-title fw-bold" style="line-height: 1rem;"><slot name="header" /></span>
					<button type="button" class="btn-close p-0 m-0" data-bs-dismiss="modal" aria-label="Close"></button>
				</div>
				<div class="modal-body p-2">
					<slot name="body" />
				</div>
				<div class="modal-footer p-2" v-if="footer">
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
			openButton: {
				type: Boolean,
				default: true
			},
			dialogClass: {
				type: String,
				default: ''
			},
			modalId: {
				type: String,
				default: ''
			}
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
		.modal-header {
			line-height: 1;
		}
	}
</style>