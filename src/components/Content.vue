<template>
	<div id="body">
		<div id="content">
			<slot />
		</div>
	</div>
</template>

<style lang="scss" scoped>
#body {
	max-width: 100%;
	width: 100%;
	display: flex;
	justify-content: center;
	#content {
		max-width: 100%;
		width: 840px;
		padding-left: 300px;
		margin-top: 41px;
	}
}
</style>