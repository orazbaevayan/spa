<template>
	<Body>
		<slot />
	</Body>
	<Header />
	<Ui />
</template>

<script>
	import Header from '@/components/Header'
	import Body from '@/components/Body'
	import Ui from '@/components/Ui'

	export default {
		components: {
			Header,
			Body,
			Ui
		}
	}
</script>