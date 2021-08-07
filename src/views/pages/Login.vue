<template>
	<form>
		<label for="iin">ИИН</label>
		<input id="iin" type="text" autocomplete="off">
		<label for="password">Пароль</label>
		<input id="password" type="password">
		<input type="button" value="Вход">
	</form>
</template>

<script>
	
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