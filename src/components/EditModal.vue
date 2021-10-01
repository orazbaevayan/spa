<template>
	<Modal :header="true" :footer="true" dialog-class="modal-lg">
		<template v-slot:open-button>
			<font-awesome-icon class="text-warning mx-1" :icon="['fa', 'pencil-alt']"/>
		</template>
		<template v-slot:header>
			Редактировать
		</template>
		<template v-slot:body>
			<div class="p-2">
				<slot />
			</div>
		</template>
		<template v-slot:footer>
			<button type="submit" class="m-0 m-2 btn btn-sm btn-warning text-white" data-bs-dismiss="modal" @click="$emit('update')" :form="form">Сохранить</button>
			<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
		</template>
	</Modal>
</template>

<script>
	export default {
		props: ['form'],
		emits: ['update']
	}
</script>