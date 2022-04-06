<template>
	<div class="p-2">
		<div v-if="exam">
			<div class="mb-0 p-2 text-center">
				<h6 class="mb-0 p-0 pb-1">Экзамен</h6>
				<p class="mb-0 p-0">{{ exam.examable?.group.course.name }}. {{ exam.name }}</p>
			</div>
			<p class="mb-0 p-2">
				Экзамен проходит в формате тестов ({{ exam.total_questions }} вопросов). На экзамен отводится {{ exam.duration }} минут. Для успешной сдачи необходимо правильно ответить на {{ exam.passing_percent }}% вопросов, то есть {{ Math.ceil(exam.total_questions / 100 * exam.passing_percent) }} из {{ exam.total_questions }}. В режиме тренировки количество попыток неограничено.
			</p>
			<div class="d-flex justify-content-center">
				<div class="p-2">
					<button class="btn btn-sm btn-primary">Начать экзамен</button>
				</div>
				<div class="p-2">
					<router-link
					:to="{ name: 'Home'}"
					class="btn btn-sm btn-outline-secondary"
					v-text="'Тренировка'"
					/>
				</div>
			</div>
		</div>
		
		<div class="p-2">
			<Exam :exam-id="$route.params.exam_id"></Exam>
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
			startExam() {
				let formData = new FormData;
				formData.append('_method', 'PATCH');
				formData.append('command', 'startExam');

				Exam.api().post(`/api/exams/${this.$route.params.exam_id}`, formData)
				.catch(e => console.log(e));
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
