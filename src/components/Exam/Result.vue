<template>
	<div>
		<span v-if="result && exam.is_ended">{{ exam.result }}</span><span v-if="result && grade && exam.is_ended"> - </span><span v-if="grade" :class="textClass">{{ exam.grade }}</span>
	</div>
</template>

<script>
	import Exam from '@/store/models/Exam'

	export default {
		props: {
			exam: {
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
				let result = self.exam.passed ? 'text-success' : 'text-danger';
				let textClass = self.exam.is_ended ? result : 'text-secondary';
				return textClass; 
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>