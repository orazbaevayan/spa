<template>
	<div id="content">
		<LoginForm />
	</div>
</template>

<script>
	import LoginForm from '@/components/LoginForm'
	export default {
		components: {
			LoginForm
		}
	}
</script>

<style lang="scss" scoped="">
#content {
	display: flex;
	flex-grow: 1;
	justify-content: center;
	align-items: center;
}
</style>