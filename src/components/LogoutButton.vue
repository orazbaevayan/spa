<template>
	<input class="btn btn-sm btn-primary" type="button" :value="$t('ui.Выход')" @click.prevent="logout">
</template>

<script>
	import { mapActions } from 'vuex';

	export default {
		methods: {
			...mapActions({
				logout: 'auth/logout'
			})
		}
	}
</script>