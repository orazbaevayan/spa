<template>
	<div id="photo-cropper">
		<img :src="value">
		<input type="file" ref="photo" name="photo" class="d-none">
		<a :href="`#${$options.name}${index}`" class="brn btn btn-sm btn-warning text-white p-1" data-bs-toggle="modal">
			<font-awesome-icon :icon="['fas', 'pencil-alt']" />
		</a>
	</div>
	<div class="modal fade" :id="`${$options.name}${index}`" tabindex="-1" aria-hidden="true">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-body text-center">
						<div ref="croppie"></div>

						<div v-if="editMode">
							<span type="button" class="brn btn btn-sm btn-success p-1 lh-100" @click="crop">
								<font-awesome-icon :icon="['fas', 'crop']" />
							</span>

							<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="zoomIn">
								<font-awesome-icon :icon="['fas', 'plus']" />
							</span>

							<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="zoomOut">
								<font-awesome-icon :icon="['fas', 'minus']" />
							</span>

							<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="rotateLeft">
								<font-awesome-icon :icon="['fas', 'undo']" />
							</span>
							<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="rotateRight">
								<font-awesome-icon :icon="['fas', 'redo']" />
							</span>

							<span type="button" class="brn btn btn-sm btn-danger p-1 lh-100" @click="cancelEdit">
								<font-awesome-icon class="text-white" :icon="['fas', 'window-close']" />
							</span>
						</div>
						<div v-else>
							<label class="btn btn-sm btn-warning brn">
								<font-awesome-icon class="text-white" :icon="['fas', 'upload']" />
								<input type="file" accept="image/*" class="d-none" @change="selectImage">
							</label>
						</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Croppie from 'croppie'

	export default {
		name: 'photoCropper',
		props: {
			value: {
				type: String,
				default: '/images/blank-photo.jpeg'
			},
			index: {
				type: String,
				default: 'new'
			}
		},
		mounted() {
			this.croppie = new Croppie(this.$refs.croppie, {
				showZoomer: false,
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
		data() {
			return {
				croppie: null,
				editMode: false,
				preview: null
			}
		},
		methods: {
			selectImage(event) {
				let self = this;
				let file = event.target.files[0];
				let mime_types = ['image/png', 'image/jpeg'];

				if (mime_types.indexOf(file.type) == -1) {
					alert('Ошибка: Неверный формат файла');
					return;
				}

				if(file.size > 10*1024*1024) {
					alert('Ошибка : Допустимый размер фала до 10 MB');
					return;
				}

				this.preview = URL.createObjectURL(file);

				self.croppie.bind({
					url: this.preview,
				});

				this.editMode = true;
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
					console.log(self);
					self.$refs.photo.value = blob;
					self.editMode = false;
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	#photo-cropper {
		position: relative;
		img {
			height: 209px;
		}
		a {
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
	.brn {
		border-radius: 0;
		padding: 0.25rem;
		line-height: 1;
	}
	.modal {
		padding-right: 0;
	}
</style>