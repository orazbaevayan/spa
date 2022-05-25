<template>
	<div id="logo" :data-bs-target="`#company_switch_modal`" data-bs-toggle="modal">
		<!-- <img src="/images/logo-light.svg" alt="Учебный центр АЗиЯ 2012"> -->
		<div v-if="user && user.company && user.companies.length" id="company" class="px-2" >
			<span >{{ user.company.name }}</span>
			<span class="d-flex ms-1">
				<font-awesome-icon :icon="['fa', 'caret-down']" />
			</span>
		</div>
	</div>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		computed: {
			user() {
				return User.query().with(['company', 'companies']).find(this.$store.getters['auth/user']?.id);
			}
		}
	}
</script>

<style lang="scss" scoped>
#logo {
	display: flex;
	align-items: center;
	#company {
		height: 40px;
		display: flex;
		flex-direction: row;
		color: #fff;
		align-items: center;
		justify-content: flex-start;
		line-height: 1;
		cursor: pointer;
		@media(hover: hover) and (pointer: fine) {
			&:hover {
				background-color: darken($header-background, 5%);
			}
		}
	}
}
</style>