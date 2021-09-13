<template>
	<div>
		<ul class="nav nav-tabs d-flex align-items-end">
			<li v-for="(tab, index) in tabs" class="nav-item" :class="{ active: index === selectedTab }" :key="tab">
				<a class="nav-link" :class="{ active: index === selectedTab }" @click.prevent="setTab(index)">{{ tab }}</a>
			</li>
			<li class="nav-item flex-fill">
				<a href="#" class="nav-link"></a>
			</li>
		</ul>
		<!-- <div class="nav-content p-2"> -->
			<slot :name="selectedTab"/>
		<!-- </div> -->
	</div>
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
.nav.nav-tabs {
	flex-wrap: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	border: none;
	.nav-item {
		flex-shrink: 0;
		.nav-link {
			cursor: pointer;
			background-color: transparent;
			margin: 0;
			&.active {
				border-color: black black transparent;
			}
			&:not(.active) {
				border-bottom: 1px solid black;
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