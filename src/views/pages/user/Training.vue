<template>
	<div class="p-2" v-if="attempt && attempt.exam">
		<div>
			<div class="mb-0 p-2 text-center">
				<h6 class="mb-0 p-0 pb-1">Тренировка</h6>
				<p class="mb-0 p-0">{{ attempt.group_user.group.course_version.course.name }}. {{ attempt.exam.name }}</p>
			</div>
		</div>
		
		<div class="p-2">
			<Training :exam-id="attempt.exam.id" />
		</div>
		<div class="p-2 d-flex justify-content-center">
			<router-link
			:to="{ name: 'user-attempt'}"
			class="btn btn-sm btn-outline-primary"
			v-text="'Завершить тренировку'"
			/>
		</div>
	</div>
</template>

<script>
	import Attempt from '@/store/models/Attempt'

	export default {
		mounted() {
			Attempt.api().fetchById(this.$route.params.attempt_id, '?include=group_user.group.course_version.course,exam.questions.answers');
		},
		computed: {
			attempt() {
				return Attempt.query().with(['group_user.group.course_version.course', 'exam.questions.answers']).find(this.$route.params.attempt_id) || null;
			}
		},
		methods: {
			startExam(event) {
				Attempt.api().update(event.currentTarget, this.$route.params.exam_id, '?include=examable.group.course,questions.answers', false);
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
