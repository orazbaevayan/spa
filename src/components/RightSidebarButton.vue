<template>
	<button type="button" id="right-sidebar-open-button" class="btn text-light" @click.prevent="toggleRightSidebar">
		<span id="name">{{ user?.first_name }}</span>
		<div id="avatar"></div>
		<font-awesome-icon :icon="['fa', 'chevron-down']" />
	</button>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

	export default {
		methods: {
			...mapActions({
				'toggleFocus': 'ui/toggleFocus',
			}),
			toggleRightSidebar() {
				this.toggleFocus('right-sidebar');
			}
		},
		computed: {
			...mapGetters({
				'user': 'auth/user'
			})
		}
	}
</script>

<style lang="scss" scoped>
#right-sidebar-open-button {
	border-radius: 0;
	display: flex;
	flex-direction: row;
	align-items: center;
	@media(hover: hover) and (pointer: fine) {
		&:hover {
			background-color: darken($header-background, 5%);
		}
	}
	#name {
		margin-right: 8px;
	}
	#avatar {
		margin-right: 8px;
		border-radius: 50%;
		width: 1.6rem;
		height: 1.6rem;
		background-color: #fff;
	}
}
</style>