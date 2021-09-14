<template>
	<div id="tabs-wrapper" class="m-2">
		<ul class="nav nav-tabs d-flex align-items-end">
			<li v-for="(tab, index) in tabs" class="nav-item" :class="{ active: index === selectedTab }" :key="tab">
				<a class="nav-link py-1 px-2" :class="{ active: index === selectedTab }" @click.prevent="setTab(index)">{{ tab }}</a>
			</li>
		</ul>
	</div>
	<slot :name="selectedTab" class="m-2" />
</template>

<script>
	export default {
		props: {
			tabs: {
				type: Array,
				default: () => { return ['Tab 1'] }
			}
		},
		methods: {
			setTab(index) {
				this.$router.push({ query: {...this.$route.query, tab: index }});
			}
		},
		computed: {
			selectedTab() {
				return parseInt(this.$route.query.tab) || 0;
			}
		}
	}
</script>

<style lang="scss" scoped>
#tabs-wrapper {
	position: relative;
	&::before {
		background-color: $lighten-primary;
		content: '';
		position: absolute;
		height: 1px;
		width: 100%;
		bottom: 0;
	}
	.nav.nav-tabs {
		flex-wrap: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		border: none;
		.nav-item {
			flex-shrink: 0;
			background-color: $app-background-color;
			&:not(:first-child) {
				margin-left: -1px;
			}
			&:first-child {
				border-radius: 5px 0 0 0;
			}
			&:last-child {
				border-radius: 0 5px 0 0;
			}
			&.active {
				border-width: 1px;
				border-style: solid;
				border-color: $lighten-primary $lighten-primary $app-background-color;
				position: relative;
				.nav-link {
					color: $lighten-primary;
				}
			}
			&:not(.active) {
				border: 1px solid $secondary;
				.nav-link {
					color: $secondary;
				}
			}
			.nav-link {
				cursor: pointer;
				background-color: transparent;
				margin: 0;
				border: none;
			}
		}
	}
}
/*.nav-content {
	background-color: #fff;
	border: 1px solid;
	border-bottom-color: rgb(222, 226, 230);
	border-right-color: rgb(222, 226, 230);
	border-top-color: rgb(255, 255, 255);
	border-left-color: rgb(222, 226, 230);
	border-bottom-left-radius: 0.25rem;
	border-bottom-right-radius: 0.25rem;
}*/
</style>