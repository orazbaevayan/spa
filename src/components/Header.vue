<template>
	<div id="header">
		<div id="header-body">
			<a href="#" id="logo" @click.prevent="toggleFocus('leftSidebar')">
				<img src="/images/logo-light.svg" alt="Учебный центр АЗиЯ 2012">
			</a>
			<SelectLanguage />
			<LogoutButton />
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapMutations, mapActions } from 'vuex'
	import LogoutButton from '@/components/LogoutButton'
	import SelectLanguage from '@/components/SelectLanguage'

	export default {
		components: {
			LogoutButton,
			SelectLanguage
		},
		methods: {
			...mapMutations({
				'SET_FOCUS': 'ui/SET_FOCUS'
			}),
			...mapActions({
				'toggleFocus': 'ui/toggleFocus'
			})
		},
		computed: {
			...mapGetters([
				'ui/focus'
			])
		}
	}
</script>

<style lang="scss" scoped>
	#header {
		display: flex;
		justify-content: center;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		background-color: #4b636e;
		#header-body {
			max-width: 100%;
			width: $body-width;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: $header-hight;
		}
		#logo {
			padding: 10px;
			&:hover {
				background-color: $primary;
			}
			img {
				height: 20px;
				display: block;
			}
		}
	}
</style>