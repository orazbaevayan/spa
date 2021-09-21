<template>
	<div>
		<a href="#" @click.prevent="modal.show()">
			<slot name="modal-open-button" />
		</a>
		<div class="modal fade" tabindex="-1" aria-hidden="true" data-bs-backdrop="static">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header" v-if="header">
						<slot name="modal-header" />
					</div>
					<div class="modal-body">
						<slot name="modal-body" />
					</div>
					<div class="modal-footer" v-if="footer">
						<slot name="modal-footer" />
					</div>
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
			this.modal = new BootstrapModal(this.$el.querySelector('.modal'));
		},
		data() {
			return {
				modal: null
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>