<template>
	<div id="body">
		<div id="content">
			<slot />
		</div>
		<LeftSidebar />
	</div>
</template>

<script>
	import LeftSidebar from '@/components/LeftSidebar'

	export default {
		components: {
			LeftSidebar
		}
	}
</script>

<style lang="scss" scoped>
#body {
	max-width: 100%;
	width: 1140px;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	position: relative;
	#content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 100%;
		width: 840px;
		padding-left: 300px;
		padding-top: 41px;
	}
}
</style>