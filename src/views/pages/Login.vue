<template>
	<div id="body">
		<div id="header">
			<SelectLanguage />
		</div>
		<div id="content">
			<img src="/images/logo-dark.svg" alt="Учебный центр АЗиЯ 2012" id="logo">
			<div id="login-form">
				<LoginForm />
			</div>
		</div>
	</div>
</template>

<script>
	import LoginForm from '@/components/LoginForm'
	import SelectLanguage from '@/components/SelectLanguage'
	export default {
		components: {
			LoginForm,
			SelectLanguage
		}
	}
</script>

<style lang="scss" scoped>
#body {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	#header {
		display: flex;
		justify-content: center;
		padding: 16px;
	}
	#content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		justify-content: center;
		align-items: center;
		#logo {
			margin-top: 30px;
			max-width: 90%;
			max-width: 150px;
			margin-bottom: 30px;
		}
		#login-form {
			margin-bottom: 250px;
		}
	}
}
</style>