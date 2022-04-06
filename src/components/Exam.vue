<template>
	<div class="card">
		<div v-if="!exam.result">
			<div class="card-header d-flex justify-content-between p-2">
				<span class="px-2">Вопрос {{ currentQuestionNumber }} из {{ totalQuestions }}</span>
				<span class="px-2">{{ countdown.h }}:{{ countdown.m }}:{{ countdown.s }}</span>
			</div>
			<div class="card-body p-2">
				<div class="question p-2">
					<p class="mb-0"><b>{{ currentQuestion.text }}</b></p>
				</div>
				<div class="answers p-2">
					<ul class="list-unstyled mb-0">
						<form>
							<li v-for="answer in currentQuestion.answers" :key="answer.id">
								<!-- <span class="mb-0">{{ answer.text }}</span> -->
								<label :for="'answer_' + answer.id" class="mb-0 d-inline">
									<div class="p-2">
										<input type="radio" v-model="currentQuestion.answer_id" name="answer_id" :value="answer.id" class="me-2" @change="changeAnswer($event, currentQuestion.id)" :id="'answer_' + answer.id">
										<span>{{ answer.text }}</span>
									</div>
								</label>
							</li>
						</form>
					</ul>
				</div>
				<div class="p-2 d-flex justify-content-between">
					<button class="btn btn-sm btn-primary" @click="prevQuestion" :class="{ disabled: !prevQuestionExist }">
						Назад
					</button>
					<button class="btn btn-sm btn-primary" @click="nextQuestion" :class="{ disabled: !nextQuestionExist }">
						Далее
					</button>
				</div>
			</div>
			<div class="card-footer d-flex justify-content-center p-2">
				<button class="btn btn-sm btn-primary" @click.prevent="completeExamWithConformation">Завершить экзамен</button>
			</div>
		</div>
		<div v-if="exam.result">
			<div class="card-body p-2 text-center">
				<h6 class="mb-0 p-2 text-center">Результат</h6>
				<div class="p-2">
					<span>{{ exam.result }}</span>
					<span class="mx-1">-</span>
					<span :class="exam.passed ? 'text-success' : 'text-danger'">{{ exam.passed ? 'зачёт' : 'незачёт' }}</span>
				</div>
				<div class="p-2">
					<router-link
					:to="{ name: 'my-course', query: { tab: 1 } }"
					v-text="'Вернутся в курс'"
					class="btn btn-sm btn-primary"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import Exam from '@/store/models/Exam'
	import Question from '@/store/models/Question'

	export default {

		name: 'exam',

		props: {
			examId: {
				default: null
			}
		},
		mounted() {
			this.getExam();
		},
		data () {
			return {
				exam: {
					questions: [
						{
							text: ''
						}
					]
				},
				currentQuestionIndex: 0,
				countdown: {
					h: '00',
					m: '00',
					s: '00'
				}
			}
		},
		computed: {
			totalQuestions() {
				return this.exam.questions.length;
			},
			currentQuestion() {
				return this.exam.questions[this.currentQuestionIndex];
			},
			currentQuestionNumber() {
				return this.currentQuestionIndex + 1;
			},
			nextQuestionExist() {
				return this.currentQuestionNumber < this.totalQuestions;
			},
			prevQuestionExist() {
				return this.currentQuestionNumber > 1;
			},
			questionsWithoutAnswerCount() {
				var count = 0;
				for (var i = this.exam.questions.length - 1; i >= 0; i--) {
					if (this.exam.questions[i].answer_id == null) count++;
				}
				return count;
			},
			questionsWithoutAnswerConformation() {
				return (this.questionsWithoutAnswerCount > 0) ? 'Вы оставили без ответа ' + this.questionsWithoutAnswerCount + ' вопрос(ов). ' : '';
			}
		},
		methods: {
			getExam() {
				Exam.api().fetchById(this.$route.params.exam_id, '?include=questions.answers').then(response => {
					this.exam = response.response.data.data;
					this.initCountdown();
				})
				/*this.$http({
					method: 'GET',
					url: this.$store.state.api_server_url + '/api/user_exams/' + this.examId + '?with[]=questions.answers',
				}).then(response => {
					this.exam = response.data.data;
					this.initCountdown();
				});*/
			},
			changeAnswer(event, currentQuestionId) {
				Question.api().update(event.currentTarget.form, currentQuestionId, '?include=answers');
			},
			completeExamWithConformation() {
				if (!confirm(this.questionsWithoutAnswerConformation + 'Вы уверены что хотите завершить этот экзамен?')) return false;
				this.completeExam();
			},
			completeExam() {
				this.$http({
					method: 'PATCH',
					url: this.$store.state.api_server_url + '/api/user_exams/' + this.exam.id,
					data: {
						ends_at: 'now'
					}
				}).then(response => {
					if (response.status === 200) {
						this.exam = response.data.data;
					}
				});
			},
			nextQuestion() {
				if (this.nextQuestionExist) this.currentQuestionIndex++;
			},
			prevQuestion() {
				if (this.prevQuestionExist) this.currentQuestionIndex--;
			},
			initCountdown() {
				var self = this;
				var timer = setInterval(function() {
					let timeLeft = Math.round((new Date(self.exam.ends_at) - Date.now()) / 1000)
					if (timeLeft >= 0) {
						var hours = Math.floor(timeLeft / (60 * 60));
						self.countdown.h = hours.toString().length === 1 ? '0' + hours : hours.toString();
						var minutes = Math.floor((timeLeft - (self.countdown.h * (60 * 60))) / 60);
						self.countdown.m = minutes.toString().length === 1 ? '0' + minutes : minutes.toString();
						var seconds = timeLeft - (self.countdown.h * (60 * 60)) - (self.countdown.m * 60);
						self.countdown.s = seconds.toString().length === 1 ? '0' + seconds : seconds.toString();
					} else {
						clearInterval(timer);
						if (self.exam.is_active) {
							self.completeExam();
						}
					}
				}, 1000);
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>