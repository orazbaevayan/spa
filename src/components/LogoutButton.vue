<template>
	<input type="button" value="Выход" @click.prevent="logout">
</template>

<script>
	export default {
		methods: {
			logout() {
				this.$axios.get('http://localhost:8040/sanctum/csrf-cookie').then(() => {
					this.$axios.post('http://localhost:8040/logout').then(response => {
						if (response.status === 204) this.$router.push({ name: 'Login' });
					});
				});
			}
		}
	}
</script>