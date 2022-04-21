<template>
	<div class="p-2">
		<div v-if="exam">
			<div class="mb-0 p-2 text-center">
				<h6 class="mb-0 p-0 pb-1">Экзамен</h6>
				<p class="mb-0 p-0">{{ exam.examable?.group.course.name }}. {{ exam.name }}</p>
			</div>
			<div >
				<p class="mb-0 p-2" v-if="exam.ends_at == null">
					Экзамен проходит в формате тестов ({{ exam.questions.length }} вопросов). На экзамен отводится {{ exam.duration }} минут. Для успешной сдачи необходимо правильно ответить на {{ exam.passing_percent }}% вопросов, то есть {{ Math.ceil(exam.questions.length / 100 * exam.passing_percent) }} из {{ exam.questions.length }}. В режиме тренировки количество попыток неограничено.
				</p>
				<div class="d-flex justify-content-center" v-if="!exam.is_active && !exam.is_ended">
					<div class="p-2">

						<Modal :header="true" :footer="true" :dialog-class="'modal-md'">
							<template v-slot:open-button>
								<button class="btn btn-sm btn-primary">Начать экзамен</button>
							</template>
							<template v-slot:header>
								Экзамен
							</template>
							<template v-slot:body>
								<p class="p-2 m-0">
									Вы уверены что хотите начать этот экзамен? У Вас будет <b>{{ exam.duration }} минут</b> для его завершения.
								</p>
							</template>
							<template v-slot:footer>
								<form @submit.prevent="startExam">
									<input type="hidden" name="command" value="startExam">
									<button type="submit" class="btn btn-sm btn-primary" data-bs-dismiss="modal">Начать экзамен</button>
									<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
								</form>
							</template>
						</Modal>

					</div>
					<div class="p-2">
						<router-link
						:to="{ name: 'user-exam-training'}"
						class="btn btn-sm btn-outline-secondary"
						v-text="'Тренировка'"
						/>
					</div>
				</div>
			</div>
		</div>
		
		<Exam :exam-id="$route.params.exam_id"></Exam>
	</div>
</template>

<script>
	import Exam from '@/store/models/Exam'

	export default {
		mounted() {
			//console.log(this.$router.options.history.state.back);

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
