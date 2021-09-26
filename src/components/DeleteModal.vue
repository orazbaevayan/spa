<template>
	<Modal :header="true" :footer="true">
		<template v-slot:open-button>
			<button type="button" class="btn btn-link text-danger px-1 py-0">
				<font-awesome-icon :icon="['fa', 'trash-alt']" />
			</button>
		</template>
		<template v-slot:header>
			Удаление записи
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