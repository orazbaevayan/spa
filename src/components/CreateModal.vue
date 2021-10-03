<template>
	<Modal :header="true" :footer="true" :dialog-class="dialogClass">
		<template v-slot:open-button>
			<font-awesome-icon class="text-primary mx-1" :icon="['fa', faIcon]"/>
		</template>
		<template v-slot:header>
			Создание
		</template>
		<template v-slot:body>
			<slot />
		</template>
		<template v-slot:footer>
			<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal" @click="$emit('store')" :form="form">Создать</button>
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
				default: 'plus-square'
			}
		},
		emits: ['store']
	}
</script>