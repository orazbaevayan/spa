<template>
	<div id="navigation" class="text-dark d-flex align-items-center mw-100 flex-shrink-0 p-2" v-if="breadcrumbs != undefined">
		<router-link :to="activeBreadcrumbs[activeBreadcrumbs.length - 1]" class="px-2 py-1 mr-2">
			<font-awesome-icon :icon="['fas', 'arrow-left']" />
		</router-link>
		<div class="navigation-line align-items-center d-flex">
			<div class="d-flex align-items-center" style="direction: ltr;">
				<div v-for="(breadcrumb, index) in breadcrumbs" :key="breadcrumb.name" class="d-flex align-items-center">
					<div v-if="breadcrumb.isLink != false">
						<router-link :to="breadcrumb" v-text="$router.resolve(breadcrumb).meta.title($route)" class="px-2 py-1 navigation-link"/>
					</div>
					<div v-else>
						<span class="navigation-link px-2 py-1" v-text="breadcrumb.text($route)"></span>
					</div>
					<span>/</span>
					<span v-if="(index + 1) == breadcrumbs.length" class="px-2 py-1 navigation-link active" v-text="$route.meta.title($route)"></span>
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
			activeBreadcrumbs() {
				return this.$route.meta.breadcrumbs.filter(breadcrumb => breadcrumb.isLink != false);
			}
		}
	}
</script>

<style lang="scss" scoped>
	#navigation {
		height: 50px;
		user-select: none;
		.navigation-line {
			direction: rtl;
			-ms-overflow-style: none;
			overflow-x: auto;
			&::-webkit-scrollbar {
				display: none;
			}
			-ms-overflow-style: none;
			scrollbar-width: none;
			.navigation-link {
				white-space: nowrap;
				text-decoration: none;
			}
			span.navigation-link.active {
				text-decoration: underline;
			}
		}
	}
</style>