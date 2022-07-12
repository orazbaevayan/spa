<template>
	<div class="p-2">
		<div v-if="attempt && attempt.group_user">
			<div class="mb-0 p-2 text-center">
				<h6 class="mb-0 p-0 pb-1">Экзамен</h6>
				<p class="mb-0 p-0">{{ attempt.group_user.group.course_version.course.name }}. {{ attempt.exam.name }}</p>
			</div>
			<div >
				<p class="mb-0 p-2" v-if="attempt.ends_at == null">
					Экзамен проходит в формате тестов ({{ attempt.exam.number_of_questions }} вопросов). На экзамен отводится {{ attempt.exam.duration }} минут. Для успешной сдачи необходимо правильно ответить на {{ attempt.exam.passing_percent }}% вопросов, то есть {{ Math.ceil(attempt.exam.number_of_questions / 100 * attempt.exam.passing_percent) }} из {{ attempt.exam.number_of_questions }}. В режиме тренировки количество попыток неограничено.
				</p>
				<div class="d-flex justify-content-center" v-if="!attempt.is_active && !attempt.is_ended">
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
									Вы уверены что хотите начать этот экзамен? У Вас будет <b>{{ attempt.exam.duration }} минут</b> для его завершения.
								</p>
							</template>
							<template v-slot:footer>
								<form @submit.prevent="startAttempt">
									<input type="hidden" name="command" value="startAttempt">
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

		<Exam :attempt-id="$route.params.attempt_id"></Exam>
	</div>
</template>

<script>
	import Attempt from '@/store/models/Attempt'

	export default {
		mounted() {
			Attempt.api().fetchById(this.$route.params.attempt_id, '?include=group_user.group.course_version.course,attempt_questions.answer,exam')/*.then(r => console.log(r.response.data.data))*/;
		},
		computed: {
			attempt() {
				return Attempt.query().with(['group_user.group.course_version.course', 'attempt_questions.answer', 'exam']).find(this.$route.params.attempt_id) || null;
			}
		},
		methods: {
			startAttempt(event) {
				Attempt.api().update(event.currentTarget, this.$route.params.attempt_id, '?include=group_user.group.course_version.course,attempt_questions.answer,exam', false);
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
