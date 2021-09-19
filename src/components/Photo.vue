<template>
	<div class="text-center" style="height: 197px; width: 148px; overflow: hidden;">
		<div class="text-center" v-show="editMode" style="position: relative;">
			<div class="croppie" ref="croppie"></div>
			<span type="button" class="brn btn btn-sm btn-success p-1 lh-100" @click="crop" style="position: absolute; left: 0; bottom: 0;">
				<font-awesome-icon :icon="['fas', 'crop']" />
			</span>

			<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="zoomIn" style="position: absolute; left: 0; bottom: 50%;">
				<font-awesome-icon :icon="['fas', 'plus']" />
			</span>
			<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="zoomOut" style="position: absolute; left: 0; top: 50%;">
				<font-awesome-icon :icon="['fas', 'minus']" />
			</span>

			<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="rotateLeft" style="position: absolute; right: 50%; bottom: 0;">
				<font-awesome-icon :icon="['fas', 'undo']" />
			</span>
			<span type="button" class="brn btn btn-sm btn-primary p-1 lh-100" @click="rotateRight" style="position: absolute; left: 50%; bottom: 0;">
				<font-awesome-icon :icon="['fas', 'redo']" />
			</span>

			<span type="button" class="brn btn btn-sm btn-danger p-1 lh-100" @click="cancelEdit" style="position: absolute; right: 0; bottom: 0;">
				<font-awesome-icon class="text-white" :icon="['fas', 'window-close']" />
			</span>
		</div>

		<div class="text-center edit-container mw-100 mh-100" v-show="!editMode" style="height: 197px; width: 148px; overflow: hidden;">
				<img :src="imageUrl" ref="photo" class="photo mw-100 mh-100 h-100">
				<input type="hidden" name="photo" ref="inputphoto" :value="value">
				<label class="edit-button btn btn-sm btn-warning lh-100 p-1 m-0 brn" v-if="canEdit">
					<font-awesome-icon class="text-white" :icon="['fas', 'pencil-alt']" />
					<input type="file" accept="image/*" class="d-none" @change="selectImage">
				</label>
		</div>
	</div>
</template>

<script>
	import Croppie from 'croppie'
	export default {
		props: {
			value: {},
			canEdit: {
				type: Boolean,
				default: true
			}
		},
		mounted() {
			this.croppie = new Croppie(this.$refs.croppie, {
				enableExif: true,
				showZoomer: false,
				viewport: {
					width: 105,
					height: 140,
				},
				enableOrientation: true,
				boundary: {
					width: 148,
					height: 197,
				}
			});
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
					self.$refs.photo.src = blob;
					self.$refs.inputphoto.value = blob;
					self.$emit('input', blob);
					self.editMode = false;
				});
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
		},
		computed: {
			imageUrl() {
				return this.value ? '/api/photos/' + this.value : '/images/blank-photo.jpeg';
			}
		}
	}
</script>

<style lang="scss" scoped>
	.edit-container {
		position: relative;
		.edit-button {
			position: absolute;
			right: 0;
			bottom: 0;
		}
	}
	.brn {
		border-radius: 0;
		font-size: 0.8rem;
		display: flex;
	}
</style>