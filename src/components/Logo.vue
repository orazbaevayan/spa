<template>
	<div id="logo">
		<img src="/images/logo-light.svg" alt="Учебный центр АЗиЯ 2012">
	</div>
</template>

<style lang="scss" scoped>
#logo {
	padding: 10px;
	cursor: pointer;
	@media(hover: hover) and (pointer: fine) {
		&:hover {
			background-color: darken($header-background, 5%);
		}
	}
	img {
		height: 20px;
		display: block;
	}
}
</style>