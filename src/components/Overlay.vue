<template>
	<div id="overlay" v-if="show">
		<Loading v-if="$store.getters['ui/loading']" />
	</div>
</template>

<script>
	import Loading from '@/components/Loading'

	export default {
		components: {
			Loading
		},
		computed: {
			show() {
				return this.$store.getters['ui/overlay'] || this.$store.getters['ui/loading'];
			}
		}
	}
</script>

<style lang="scss" scoped>
	#overlay {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		opacity: 0.7;
		background-color: black;
	}
</style>