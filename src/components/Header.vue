<template>
	<div id="header">
		<div id="header-body">
			<button type="button" id="left-sidebar-open-button" class="btn text-light d-lg-none" @click.prevent="toggleLeftSidebar">
				<font-awesome-icon :icon="['fas', 'bars']" />
			</button>
			<div id="logo">
				<img src="/images/logo-light.svg" alt="Учебный центр АЗиЯ 2012">
			</div>
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
				'toggleFocus': 'ui/toggleFocus',
				'clearFocus': 'ui/clearFocus'
			}),
			toggleLeftSidebar() {
				if (window.innerWidth >= 992) {
					this.clearFocus('left-sidebar');
				} else {
					this.toggleFocus('left-sidebar');
				}
			}
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
		background-color: $primary;
		#header-body {
			max-width: 100%;
			width: $body-width;
			display: flex;
			justify-content: space-between;
			align-items: center;
			height: $header-hight;
			#left-sidebar-open-button {
				border-radius: 0;
				@media(hover: hover) and (pointer: fine) {
					&:hover {
						background-color: darken($primary, 10%);
					}
				}
			}
			#logo {
				padding: 10px;
				cursor: pointer;
				@media(hover: hover) and (pointer: fine) {
					&:hover {
						background-color: darken($primary, 10%);
					}
				}
				img {
					height: 20px;
					display: block;
				}
			}
		}
	}
</style>