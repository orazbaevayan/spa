<template>
	<div id="root">
		<div id="drop">
			<div id="border"></div>
			<div id="text" class="d-flex flex-column">
				<font-awesome-icon class="text-secondary mb-2" :icon="['fas', 'file-upload']" style="font-size: 2rem;" />
				<span>Choose a file or drag it here.</span>
			</div>
				<input type="file" class="w-100 mw-100">
		</div>
		<div id="crop">
			<div id="croppie"></div>
			<span class="brn btn btn-sm btn-success p-1 lh-100" @click="crop" style="position: absolute; left: 0; bottom: 0;">
				<font-awesome-icon :icon="['fas', 'crop']" />
			</span>
			<span class="brn btn btn-sm btn-primary p-1 lh-100" @click="zoomIn" style="position: absolute; left: 0; bottom: 50%;">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</span>
			<span class="brn btn btn-sm btn-primary p-1 lh-100" @click="zoomOut" style="position: absolute; left: 0; top: 50%;">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</span>
			<span class="brn btn btn-sm btn-primary p-1 lh-100" @click="rotateLeft" style="position: absolute; right: 50%; bottom: 0;">
				<font-awesome-icon :icon="['fas', 'undo']" />
			</span>
			<span class="brn btn btn-sm btn-primary p-1 lh-100" @click="rotateRight" style="position: absolute; left: 50%; bottom: 0;">
				<font-awesome-icon :icon="['fas', 'redo']" />
			</span>
			<span class="brn btn btn-sm btn-danger p-1 lh-100" @click="cancelEdit" style="position: absolute; right: 0; bottom: 0;">
				<font-awesome-icon class="text-white" :icon="['fas', 'window-close']" />
			</span>
		</div>
	</div>
</template>

<script>
	import Croppie from 'croppie'

	export default {
		name: 'cropper',
		props: {
			value: {
				type: String,
				default: null
			}
		},
		mounted() {
			this.init();
		},
		data() {
			return {
				croppie: null,
			}
		},
		methods: {
			init() {
				this.croppie = new Croppie(this.$el.querySelector('#croppie'), {
					showZoomer: false,
					url: this.value,
					viewport: {
						width: (document.body.clientWidth < 576) ? Math.round((document.body.clientWidth - 50) * 0.8) * 0.75 : Math.round((466 * 0.8) * 0.75),
						height: (document.body.clientWidth < 576) ? Math.round((document.body.clientWidth - 50) * 0.8) : Math.round(466 * 0.8),
					},
					enableOrientation: true,
					boundary: {
						width: (document.body.clientWidth < 576) ? (document.body.clientWidth - 50) : 466,
						height: (document.body.clientWidth < 576) ? (document.body.clientWidth - 50) : 466,
					}
				})
			},
			rotateLeft() {
				this.croppie.rotate(90);
			},
			rotateRight() {
				this.croppie.rotate(-90);
			},
			zoomIn() {
				this.croppie.setZoom(this.croppie._currentZoom + (this.croppie._currentZoom * 0.1));
			},
			zoomOut() {
				this.croppie.setZoom(this.croppie._currentZoom - (this.croppie._currentZoom * 0.1));
			},
			cancelEdit() {
				URL.revokeObjectURL(this.preview);

				this.editMode = false;
			},
			crop() {
				let self = this;
				let options = {
					type: 'base64',
					size: 'original',
					format: 'jpeg',
				}
				self.croppie.result(options).then(function(blob) {
					self.croppie.destroy();
					self.init();
					self.$emit('crop', blob);
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	#root {
		#drop {
			position: relative;
			padding-top: 100%;
			display: flex;
			#border {
				position: absolute;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				margin: 0.5rem;
				border-radius: 10px;
				border: 2px dashed $secondary;
			}
			#text {
				position: absolute;
				transform: translate3d(-50%, -50%, 0);
				top: 50%;
				left: 50%;
				padding: 0.5rem;
				max-width: 100%;
				justify-content: center;
				align-items: center;
			}
			input {
				position: absolute;
				opacity: 0;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
			}
		}
		#crop {
			position: relative;
			.brn {
				border-radius: 0;
				padding: 0.25rem;
				line-height: 1;
			}
			.cr-slider-wrap {
				display: none;
			}
		}
	}
</style>