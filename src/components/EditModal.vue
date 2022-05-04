<template>
	<Modal :header="true" :footer="true" :dialog-class="dialogClass" :modal-id="modalId" :open-button="openButton">
		<template v-slot:open-button>
			<font-awesome-icon class="text-warning mx-1" :icon="['fa', faIcon ]"/>
		</template>
		<template v-slot:header>
			Редактирование
		</template>
		<template v-slot:body>
			<slot />
		</template>
		<template v-slot:footer>
			<button type="submit" class="m-0 m-2 btn btn-sm btn-warning text-white" data-bs-dismiss="modal" @click="$emit('update')" :form="form">Сохранить</button>
			<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
		</template>
	</Modal>
</template>

<script>
	export default {
		props: {
			form: {
				type: String
			},
			dialogClass: {
				type: String,
				default: 'modal-lg'
			},
			faIcon: {
				type: String,
				default: 'pencil-alt'
			},
			modalId: {
				type: String,
				default: ''
			},
			openButton: {
				type: Boolean,
				default: true
			}
		},
		emits: ['update']
	}
</script>