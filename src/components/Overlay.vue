<template>
	<div id="overlay" :class="$store.getters['ui/overlayClass']"></div>
</template>

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