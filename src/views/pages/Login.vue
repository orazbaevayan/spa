<template>
	<form>
		<label for="iin">ИИН</label>
		<input id="iin" type="text" v-model="credentials.email" autocomplete="off">
		<label for="password">Пароль</label>
		<input id="password" type="password" v-model="credentials.password">
		<input type="button" value="Вход" @click.prevent="handleLogin">
	</form>
</template>

<script>
	import axios from 'axios'
	axios.defaults.withCredentials = true;
	export default {
		data() {
			return {
				credentials: {
					email: '',
					password: ''
				}
			}
		},
		methods: {
			handleLogin() {
				axios.get('http://localhost:8040/sanctum/csrf-cookie').then(response => {
					console.log(response);
					axios.post('http://localhost:8040/login', this.credentials).then(response => {
						console.log(response);
					});
				});
			}
		}
	}
</script>

<style lang="scss">
	form {
		max-width: 100%;
		width: 300px;
		display: flex;
		flex-direction: column;
		align-self: center;
		margin: 0 auto;
		label {
			margin-bottom: 4px;
		}
		input {
			margin-bottom: 16px;
		}
	}
</style>