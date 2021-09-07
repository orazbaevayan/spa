<template>
	<div id="ui" class="container">
		<Header />
		<div id="left">
			<LeftSidebar />
		</div>
		<div id="right">
			<RightSidebar />
		</div>
		<Overlay />
		<Notifications />
		<Loading />
	</div>
</template>

<script>
	import Header from '@/components/Header'
	import Overlay from '@/components/Overlay'
	import LeftSidebar from '@/components/LeftSidebar'
	import RightSidebar from '@/components/RightSidebar'
	import Notifications from '@/components/Notifications'
	import Loading from '@/components/Loading'

	export default {
		components: {
			Header,
			Overlay,
			LeftSidebar,
			RightSidebar,
			Notifications,
			Loading
		}
	}
</script>

<style lang="scss" scoped>
#ui {
	display: flex;
	padding: 0;
	#left {
		display: flex;
		justify-content: flex-start;
		width: 100%;
	}
	#right {
		display: flex;
		justify-content: flex-end;
		width: 100%;
	}
}
</style>