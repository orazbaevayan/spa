<template>
	<div class="notification-list d-flex flex-column-reverse">
		<div :class="'alert-' + notification.status" class="notification alert" v-for="notification in $store.getters['ui/notifications']" :key="notification.id">
			{{ notification.text }}
		</div>
	</div>
</template>

<script>
	export default {
		name: 'notification',
	}
</script>

<style lang="scss" scoped>
	.notification-list {
		position: fixed;
		z-index: 600000;
		top: 40px;
		right: 0px;
		padding: 8px;
		.notification {
			margin: 8px;
		}
	}
</style>