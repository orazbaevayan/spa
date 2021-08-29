<template>
	<div id="body" class="container">
		<div id="content">
			<Breadcrumbs />
			<slot />
		</div>
	</div>
</template>

<script>
	import Breadcrumbs from '@/components/Breadcrumbs'

	export default {
		components: {
			Breadcrumbs
		}
	}
</script>

<style lang="scss" scoped>
#body {
	padding: 0;
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