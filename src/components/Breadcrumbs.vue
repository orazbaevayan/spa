<template>
	<div id="navigation" class="text-dark d-flex align-items-center mw-100 flex-shrink-0 p-2" v-if="breadcrumbs != undefined">
		<router-link :to="breadcrumbs[breadcrumbs.length - 1]" class="px-2 py-1 mr-2">
			<font-awesome-icon :icon="['fas', 'arrow-left']" />
		</router-link>
		<div class="navigation-line align-items-center d-flex">
			<div class="d-flex" style="direction: ltr;">
				<div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.name" class="d-flex align-items-center">
					<router-link :to="breadcrumb" v-text="$router.resolve(breadcrumb).meta.title" class="px-2 py-1 navigation-link"/>
					<span>/</span>
					<span v-if="(index + 1) == breadcrumbs.length" class="px-2 py-1 navigation-link" v-text="$route.meta.title"></span>
				</div>
			</div>
		</div>
		<div class="flex-fill"></div>
	</div>
</template>

<script>
	export default {
		computed: {
			breadcrumbs() {
				return this.$route.meta.breadcrumbs;
			},
		}
	}
</script>

<style lang="scss" scoped>
	#navigation {
		height: 50px;
		.navigation-line {
			direction: rtl;
			&::-webkit-scrollbar {
				display: none;
			}
			-ms-overflow-style: none;
			overflow-x: auto;
			.navigation-link {
				white-space: nowrap;
				text-decoration: none;
			}
			span.navigation-link {
				text-decoration: underline;
			}
		}
	}
</style>