<template>
	<button type="button" id="left-sidebar-open-button" class="btn text-light d-lg-none" @click.prevent="toggleLeftSidebar">
		<font-awesome-icon :icon="['fas', 'bars']" />
	</button>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

	export default {
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
		}
	}
</script>

<style lang="scss" scoped>
#left-sidebar-open-button {
	border-radius: 0;
	@media(hover: hover) and (pointer: fine) {
		&:hover {
			background-color: darken($header-background, 5%);
		}
	}
}
</style>