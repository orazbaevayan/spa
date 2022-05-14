<template>
	<div v-if="user.company" id="logo" class="px-2" :data-bs-target="`#company_switch_modal`" data-bs-toggle="modal">
		<!-- <img src="/images/logo-light.svg" alt="Учебный центр АЗиЯ 2012"> -->
		<span >{{ user.company.name }}</span>
		<span class="d-flex ms-1">
			<font-awesome-icon :icon="['fa', 'caret-down']" />
		</span>
	</div>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		computed: {
			user() {
				return User.query().with(['company']).find(this.$store.getters['auth/user'].id);
			}
		}
	}
</script>

<style lang="scss" scoped>
#logo {
	cursor: pointer;
	display: flex;
	flex-direction: row;
	color: #fff;
	align-items: center;
	line-height: 1;
	height: 40px;
	@media(hover: hover) and (pointer: fine) {
		&:hover {
			background-color: darken($header-background, 5%);
		}
	}
}
</style>