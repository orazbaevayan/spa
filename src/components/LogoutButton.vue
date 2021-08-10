<template>
	<input type="button" value="Выход" @click.prevent="logout">
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions([
				'logout'
			])
		}
	}
</script>