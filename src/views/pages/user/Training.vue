<template>
	<div class="p-2" v-if="exam">
		<div>
			<div class="mb-0 p-2 text-center">
				<h6 class="mb-0 p-0 pb-1">Тренировка</h6>
				<p class="mb-0 p-0">{{ exam.examable?.group.course.name }}. {{ exam.name }}</p>
			</div>
		</div>
		
		<div class="p-2">
			<Training :exam-id="exam.parent_exam_id" />
		</div>
		<div class="p-2 d-flex justify-content-center">
			<router-link
			:to="{ name: 'user-exam'}"
			class="btn btn-sm btn-outline-primary"
			v-text="'Завершить тренировку'"
			/>
		</div>
	</div>
</template>

<script>
	import Exam from '@/store/models/Exam'

	export default {
		mounted() {
			this.$fetchApiData([
				Exam.api().fetchById(this.$route.params.exam_id, '?include=examable.group.course,questions.answers'),
			]);
		},
		computed: {
			exam() {
				return Exam.query().with(['examable.group.course', 'questions.answers']).find(this.$route.params.exam_id) || null;
			}
		},
		methods: {
			startExam(event) {
				Exam.api().update(event.currentTarget, this.$route.params.exam_id, '?include=examable.group.course,questions.answers', false);
			}
		}
/*		methods: {
			getMyCourse() {
				this.$http({
					method: 'GET',
					url: this.$store.state.api_server_url + '/api/user_courses/' + this.$route.params.my_course_id + '?with[]=group.course.exam&with[]=user_exams',
				}).then(response => {
					this.myCourse = response.data.data;
				});
			},
		},*/
	}
</script>

<style lang="scss" scoped>

</style>
