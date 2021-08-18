<template>
	<div id="header">
		<div id="header-body">
			<img src="/images/logo-light.svg" alt="Учебный центр АЗиЯ 2012" id="logo">
			<SelectLanguage />
			<LogoutButton />
		</div>
	</div>
</template>

<script>
	import LogoutButton from '@/components/LogoutButton'
	import SelectLanguage from '@/components/SelectLanguage'

	export default {
		components: {
			LogoutButton,
			SelectLanguage
		},
	}
</script>

<style lang="scss" scoped>
	#header {
		display: flex;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #4b636e;
		#header-body {
			max-width: 100%;
			width: 1124px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 8px;
		}
		#logo {
			height: 25px;
		}
	}
</style>