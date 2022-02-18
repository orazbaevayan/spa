<template>
	<form class="w-100 d-flex flex-row flex-wrap" @submit="resetSelectedFile" v-if="value">
		<input type="hidden" name="group_id" :value="value.group_id">
		<div class="col-12 col-lg-6 p-2">
			<label class="form-label" for="name">{{ $t(`models.ALL['Название']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="name" name="name" v-once :value="value.name" :readonly="!canEdit">
		</div>
		<div class="col-12 col-lg-6 p-2">
			<label class="form-label">Файл</label>
			<div class="d-flex">
				<label id="input-file" class="btn btn-sm btn-primary">
					<font-awesome-icon :icon="['fa', 'upload']" />
					<input class="form-control form-control-sm d-none" :name="uploadFileSelected ? 'file' : ''" type="file" :readonly="!canEdit" @change="selectUploadedFile">
				</label>
				<select id="select-file" class="form-select form-select-sm" :name="!uploadFileSelected ? 'file' : ''" :value="file" :readonly="!canEdit">
					<option></option>
					<optgroup label="Загрузка" v-if="uploadFileSelected">
						<option :value="uploadFileName">{{ uploadFileName }}</option>
					</optgroup>
					<optgroup :label="template.name" v-for="template in templates" :key="template.id">
						<option :value="template.file">{{ template.file }}</option>
					</optgroup>
				</select>
			</div>
		</div>

		<div class="col-12 p-2">
			<div class="form-check form-switch m-0">
				<input type="hidden" name="selection_required" value="0">
				<input class="form-check-input" type="checkbox" name="selection_required" id="selection_required" value="1" :checked="value.selection_required">
				<label class="form-check-label" for="selection_required">Необходим выбор</label>
			</div>
		</div>

		<div class="p-2 d-flex flex-column w-100">
			<label for="code" class="form-label">Код</label>
			<textarea class="form-control" name="code" id="code" rows="12" v-once :value="value.code" :readonly="!canEdit"></textarea>
		</div>
		<div class="w-100 text-center">
			<slot />
		</div>
	</form>
</template>

<script>
	import Template from '@/store/models/Template'

	export default {
		props: {
			value: {
				type: Object,
				default: new Template
			},
			canEdit: {
				type: Boolean,
				default: true
			},
		},
		data() {
			return {
				uploadFileSelected: false,
				uploadFileName: null,
			}
		},
		methods: {
			selectUploadedFile(event) {
				this.uploadFileName = event.currentTarget.files[0].name;
				this.uploadFileSelected = true;
			},
			resetSelectedFile() {
				this.uploadFileName = null;
				this.uploadFileSelected = false;
			}
		},
		computed: {
			templates() {
				return Template.query().where('group_id', this.value.group_id).get().sort((a, b) => {
					return b.id == this.value.id ? 1 : 0;
				}).filter(i => i.file);
			},
			file() {
				return this.uploadFileSelected ? this.uploadFileName : this.value.file;
			}
		}
	}
</script>

<style lang="scss">
	#input-file {
		border-top-right-radius: 0; border-bottom-right-radius: 0;
	}
	#select-file {
		border-top-left-radius: 0; border-bottom-left-radius: 0;
	}
</style>