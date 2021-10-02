<template>
	<Modal :header="true" :footer="true">
		<template v-slot:open-button>
			<font-awesome-icon class="text-danger mx-1" :icon="['fa', 'trash-alt']" />
		</template>
		<template v-slot:header>
			Удаление
		</template>
		<template v-slot:body>
			<div class="p-2">
				<slot />
			</div>
		</template>
		<template v-slot:footer>
			<button type="button" class="m-0 m-2 btn btn-sm btn-danger text-white" data-bs-dismiss="modal" @click.prevent="$emit('delete')">Удалить</button>
			<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
		</template>
	</Modal>
</template>

<script>
	export default {
		emits: ['delete']
	}
</script>