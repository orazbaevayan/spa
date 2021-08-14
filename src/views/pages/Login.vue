<template>
	<div id="header">
		<SelectLanguage />
	</div>
	<div id="content">
		<LoginForm />
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
#header {
	display: flex;
	justify-content: center;
}
#content {
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
}
</style>