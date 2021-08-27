<template>
	<div id="ui" class="container">
		<div id="left">
			<LeftSidebar />
		</div>
		<div id="right">
			<RightSidebar />
		</div>
	</div>
</template>

<script>
	import LeftSidebar from '@/components/LeftSidebar'
	import RightSidebar from '@/components/RightSidebar'

	export default {
		components: {
			LeftSidebar,
			RightSidebar
		}
	}
</script>

<style lang="scss" scoped>
#ui {
	display: flex;
	padding: 0;
	#left {
		flex-grow: 1;
		direction: ltr;
	}
	#right {
		flex-grow: 1;
		direction: rtl;
	}
}
</style>