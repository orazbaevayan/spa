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
	width: $body-width;
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	position: relative;
	margin-top: $header-hight;
	#content {
		display: flex;
		flex-direction: column;
		flex-grow: 1;
		max-width: 100%;
		width: $body-width;
		@include media-breakpoint-up(lg) {
			padding-left: $sidebar-width;
		}
	}
}
</style>