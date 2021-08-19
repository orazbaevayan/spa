<template>
	<div id="left-sidebar">
		<router-link class="link" :to="{ name: 'Home' }">{{ $t('pages.Главная') }}</router-link>
		<router-link class="link" :to="{ name: 'Courses' }">{{ $t('pages.Курсы') }}</router-link>
	</div>
</template>

<style lang="scss" scoped>
#left-sidebar {
	position: fixed;
	max-width: 80%;
	width: 300px;
	top: 0;
	bottom: 0;
	padding-top: 41px;
	.link {
		display: block;
		text-decoration: none;
		padding: 8px;
		line-height: 100%;
	}
}
</style>