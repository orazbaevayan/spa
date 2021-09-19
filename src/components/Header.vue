<template>
	<div id="header">
		<div class="container">
			<LeftSidebarButton />
			<Logo />
			<div><SelectLanguage /></div>
			<RightSidebarButton />
		</div>
	</div>
</template>

<script>
	import RightSidebarButton from '@/components/RightSidebarButton'
	import LeftSidebarButton from '@/components/LeftSidebarButton'
	import Logo from '@/components/Logo'
	import SelectLanguage from '@/components/SelectLanguage'

	export default {
		components: {
			RightSidebarButton,
			LeftSidebarButton,
			Logo,
			SelectLanguage
		}
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
		background-color: $header-background;
		.container {
			padding: 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: $header-hight;
		}
	}
</style>