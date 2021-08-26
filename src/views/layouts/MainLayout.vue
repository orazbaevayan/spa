<template>
	<Header />
	<Content>
		<slot />
	</Content>
</template>

<script>
	import Header from '@/components/Header'
	import Content from '@/components/Content'

	export default {
		components: {
			Header,
			Content
		}
	}
</script>