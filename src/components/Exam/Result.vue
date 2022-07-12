<template>
	<div>
		<span v-if="result && attempt.is_ended">{{ attempt.result }}</span><span v-if="result && grade && attempt.is_ended"> - </span><span v-if="grade" :class="textClass">{{ attempt.grade }}</span>
	</div>
</template>

<script>
	import Exam from '@/store/models/Exam'

	export default {
		props: {
			attempt: {
				type: Object,
				default: new Exam
			},
			grade: {
				type: Boolean,
				default: true
			},
			result: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			textClass() {
				let self = this;
				let result = self.attempt.passed ? 'text-success' : 'text-danger';
				let textClass = self.attempt.is_ended ? result : 'text-secondary';
				return textClass; 
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>