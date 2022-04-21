<template>
	<div v-if="exam">
		<div class="p-2" v-if="exam.is_active">
			<div class="card">
				<div class="card-header d-flex justify-content-between p-2">
					<span class="px-2">Вопрос {{ currentQuestionNumber }} из {{ totalQuestions }}</span>
					<span class="px-2">{{ displayTimer }}</span>
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
			</div>
		</div>
		<div class="p-2 justify-content-center d-flex" v-if="exam.is_active">
			<Modal :header="true" :footer="true" :dialog-class="'modal-md'">
				<template v-slot:open-button>
					<button class="btn btn-sm btn-outline-primary">Завершить экзамен</button>
				</template>
				<template v-slot:header>
					Завершение экзамена
				</template>
				<template v-slot:body>
					<p class="p-2 m-0">
						Вы уверены что хотите завершить этот экзамен? {{ questionsWithoutAnswerConformation }}
					</p>
				</template>
				<template v-slot:footer>
					<form @submit.prevent="completeExamWithConformation">
						<input type="hidden" name="command" value="endExam">
						<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal">Завершить</button>
						<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
					</form>
				</template>
			</Modal>
		</div>
		<div class="p-2" v-if="exam.is_ended">
			<div class="card">
				<div class="card-body p-2 text-center">
					<div class="p-1">
						<h6 class="mb-0 p-1 text-center">Результат</h6>
						<div class="p-1" v-html="`${exam.gradeHTML}`"></div>
					</div>
				</div>
			</div>
		</div>

<!-- 		<Card :toggle-on="true" class="mx-2 my-1">
			<template v-slot:header>
				Подробнее
			</template>
			<template v-slot:body>
				
			</template>
		</Card> -->

		<div id="details" class="p-2" v-if="exam.is_ended">
			<div class="card">
				<div class="card-body px-2 py-0 text-center">
					<div v-for="question in exam.questions" :key="question.id">
						<div class="px-1 py-2">
							<p class="text-start m-0 px-2 py-1"><b>{{ question.text }}</b></p>
							<div class="text-start m-0" v-for="answer in question.answers" :key="answer.id">
								<p class="text-start m-0 px-2 py-1" :class="{ 'alert-success': answer.id == question.answer_id && answer.proper, 'alert-danger': answer.id == question.answer_id && !answer.proper }">
								{{ answer.text }}
								</p>
							</div>
						</div>
					</div>
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
			this.init();
		},
		beforeUnmount() {
			this.destroyCountdown();
		},
		data () {
			return {
				currentQuestionIndex: 0,
				timer: {
					interval: null,
					h: '00',
					m: '00',
					s: '00',
					distance: 0,
				},
			}
		},
		computed: {
			exam() {
				return Exam.query().with(['questions.answers']).find(this.$route.params.exam_id);
			},
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
				return (this.questionsWithoutAnswerCount > 0) ? 'Вы оставили без ответа ' + this.questionsWithoutAnswerCount + ' вопрос(a|ов). ' : '';
			},
			displayTimer() {
				return `${this.timer.h}:${this.timer.m}:${this.timer.s}`;
			}
		},
		methods: {
			init() {
				this.getExam().then(() => {
					this.initCountdown();
				});
			},
			getExam() {
				return Exam.api().fetchById(this.$route.params.exam_id, '?include=questions.answers');
			},
			changeAnswer(event, currentQuestionId) {
				Question.api().update(event.currentTarget.form, currentQuestionId, '?include=answers,exam', false);
			},
			completeExamWithConformation(event) {
				Exam.api().update(event.currentTarget, this.exam.id, '?include=questions.answers', false);
			},
			nextQuestion() {
				if (this.nextQuestionExist) this.currentQuestionIndex++;
			},
			prevQuestion() {
				if (this.prevQuestionExist) this.currentQuestionIndex--;
			},
			initCountdown() {
				var self = this;
				this.timer.interval = setInterval(function() {
					self.calculateTime();
					if ((Math.floor(self.timer.distance / 1000)) == -1) self.getExam();
				}, 1000);
			},
			destroyCountdown() {
				clearInterval(this.timer.interval);
			},
			calculateTime() {
				this.timer.distance = (new Date(this.exam.ends_at) - Date.now());
				let distance = this.timer.distance < 0 ? 0 : this.timer.distance;
				var hours = Math.floor(Math.abs(distance) / (1000 * 60 * 60));
				var minutes = Math.floor((Math.abs(distance) % (1000 * 60 * 60)) / (1000 * 60));
				var seconds = Math.floor((Math.abs(distance) % (1000 * 60)) / 1000);
				this.timer.h = ('0' + hours).slice(hours.toString().length < 3 ? -2 : -hours.toString().length);
				this.timer.m = ('0' + minutes).slice(-2);
				this.timer.s = ('0' + seconds).slice(-2);
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>