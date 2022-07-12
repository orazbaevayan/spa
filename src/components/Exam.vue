<template>
	<div v-if="attempt">
		<div class="p-2" v-if="attempt.is_active">
			<div class="card">
				<div class="card-header d-flex justify-content-between p-2">
					<span class="px-2">Вопрос {{ currentQuestionNumber }} из {{ totalQuestions }}</span>
					<span class="px-2">{{ displayTimer }}</span>
				</div>
				<div class="card-body p-2">
					<div class="question p-2">
						<p class="mb-0"><b>{{ currentQuestion?.text }}</b></p>
					</div>
					<div class="answers p-2">
						<ul class="list-unstyled mb-0">
							<form>
								<li v-for="answer in currentQuestion?.question.answers" :key="answer.id">
									<label :for="'answer_' + answer.id" class="mb-0 d-inline">
										<div class="p-2">
											<input type="radio" v-model="currentQuestion.answer_id" name="answer_id" :value="answer.id" class="me-2" @change="changeAttemptQuestionAnswer($event, currentQuestion?.id)" :id="'answer_' + answer.id">
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

		<div class="p-2 justify-content-center d-flex" v-if="attempt.is_active">
			<Modal :header="true" :footer="true" :dialog-class="'modal-md'">
				<template v-slot:open-button>
					<button class="btn btn-sm btn-outline-primary">Завершить экзамен</button>
				</template>
				<template v-slot:header>
					Завершение экзамена
				</template>
				<template v-slot:body>
					<p class="p-2 m-0">
						Вы уверены что хотите завершить этот экзамен? <span v-html="questionsWithoutAnswerConformation"></span>
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

		<div class="p-2" v-if="attempt.is_ended">
			<div class="card">
				<div class="card-body p-2 text-center">
					<div class="p-1">
						<h6 class="mb-0 p-1 text-center">Результат</h6>
						<div class="p-1">
							<ExamResult :attempt="attempt" />
						</div>
					</div>
				</div>
			</div>
		</div>

		<div id="details" class="p-2" v-if="attempt.is_ended">
			<div class="card">
				<div class="card-body px-2 pt-0 pb-2 text-center">
					<div v-for="attempt_question in attempt.attempt_questions" :key="attempt_question.id">
						<div class="px-1 py-2">
							<p class="text-start m-0 px-2 py-1"><b>{{ attempt_question.question.text }}</b></p>
							<div class="text-start m-0" v-for="answer in attempt_question.question.answers" :key="answer.id">
								<p class="text-start m-0 px-2 py-1" :class="{ 'alert-success': answer.id == attempt_question.answer_id && (attempt_question.answer_id == attempt_question.question.answer_id), 'alert-danger': answer.id == attempt_question.answer_id && (attempt_question.answer_id != attempt_question.question.answer_id) }">
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
	import Attempt from '@/store/models/Attempt'
	import AttemptQuestion from '@/store/models/AttemptQuestion'

	export default {

		name: 'exam',

		props: {
			attemptId: {
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
			attempt() {
				return Attempt.query().with(['attempt_questions.question.answers']).find(this.$route.params.attempt_id);
			},
			totalQuestions() {
				return this.attempt.attempt_questions.length;
			},
			currentQuestion() {
				return this.attempt.attempt_questions[this.currentQuestionIndex];
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
				for (var i = this.attempt.attempt_questions.length - 1; i >= 0; i--) {
					if (this.attempt.attempt_questions[i].answer_id == null) count++;
				}
				return count;
			},
			questionsWithoutAnswerConformation() {
				return (this.questionsWithoutAnswerCount > 0) ? 'Вы оставили без ответа <b>' + this.questionsWithoutAnswerCount + ' вопрос(a|ов)</b>. ' : '';
			},
			displayTimer() {
				return `${this.timer.h}:${this.timer.m}:${this.timer.s}`;
			}
		},
		methods: {
			init() {
				this.getAttempt().then(() => {
					this.initCountdown();
				});
			},
			getAttempt() {
				return Attempt.api().fetchById(this.$route.params.attempt_id, '?include=attempt_questions.question.answers');
			},
			changeAttemptQuestionAnswer(event, currentQuestionId) {
				AttemptQuestion.api().update(event.currentTarget.form, currentQuestionId, '?include=', false);
			},
			completeExamWithConformation(event) {
				Attempt.api().update(event.currentTarget, this.attempt.id, '?include=attempt_questions.question.answers', false);
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
					if ((Math.floor(self.timer.distance / 1000)) == -1) self.getAttempt();
				}, 1000);
			},
			destroyCountdown() {
				clearInterval(this.timer.interval);
			},
			calculateTime() {
				this.timer.distance = (new Date(this.attempt.ends_at) - Date.now());
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