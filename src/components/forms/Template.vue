<template>
	<form class="w-100 d-flex flex-row flex-wrap">
		<input type="hidden" name="templatable_id" :value="templatableId">
		<input type="hidden" name="templatable_type" :value="templatableType">
		<div class="col-12 p-2">
			<label class="form-label" for="name">{{ $t(`models.ALL['Название']`) }}</label>
			<input type="text" class="form-control form-control-sm" id="name" name="name" v-once :value="value.name" :readonly="!canEdit">
		</div>
		<div class="col-12 p-2">
			<label class="form-label">Файл</label>
			<div class="d-flex">
				<label id="input-file" class="btn btn-sm btn-primary">
					<font-awesome-icon :icon="['fa', 'upload']" />
					<input class="form-control form-control-sm d-none" :name="selectedFile == 'upload' ? 'file' : ''" type="file" :readonly="!canEdit" @change="selectUploadedFile">
				</label>
				<select id="select-file" class="form-select form-select-sm" :name="selectedFile ? 'file' : ''" v-model="selectedFile" :readonly="!canEdit">
					<option></option>
					<optgroup label="Загрузка" v-if="selectedFile == 'upload'">
						<option value="upload">{{ uploadFileName }}</option>
					</optgroup>
					<optgroup :label="template.name" v-for="template in templates" :key="template.id">
						<option :value="template.file">{{ template.file }}</option>
					</optgroup>
				</select>
			</div>
		</div>
		<div class="p-2 d-flex flex-column w-100">
			<label for="code" class="form-label">Код</label>
			<textarea class="form-control" name="code" id="code" rows="3" v-once :value="value.code" :readonly="!canEdit"></textarea>
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
			templatableType: {
				type: String,
				default: null
			},
			templatableId: {
				type: Number,
				default: null
			},
		},
		data() {
			return {
				uploadFileName: null,
				selectedFile: this.value.file,
			}
		},
		methods: {
			selectUploadedFile(event) {
				this.uploadFileName = event.currentTarget.files[0].name;
				this.selectedFile = 'upload';
			}
		},
		computed: {
			templates() {
				return Template.query().where('templatable_type', this.templatableType).where('templatable_id', this.templatableId).get().sort((a, b) => {
					return b.id == this.value.id ? 1 : 0;
				});
			},
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