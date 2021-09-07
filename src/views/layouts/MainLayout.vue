<template>
	<Body>
		<slot />
	</Body>
	<Ui />
</template>

<script>
	import Body from '@/components/Body'
	import Ui from '@/components/Ui'

	export default {
		components: {
			Body,
			Ui
		}
	}
</script>