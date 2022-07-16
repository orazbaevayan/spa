<template>
	<div class="card">
		<div class="card-body p-2">
			<div class="question p-2">
				<p class="mb-0"><b>{{ currentQuestion.text }}</b></p>
			</div>
			<div class="p-2 comment" v-if="check && currentQuestion.comment && !this.userAnswer.proper">
				<p class="mb-0 alert-warning p-2">Подсказка: {{ currentQuestion.comment }}</p>
			</div>
			<div class="answers p-2">
				<ul class="list-unstyled mb-0">
					<li v-for="answer in currentQuestion.answers" :key="answer.id">
						<label :for="'answer_' + answer.id" class="mb-0 d-inline">
							<div class="p-2" :class="alertClass(answer)">
								<input type="radio" v-model="userAnswerId" :value="answer.id" :name="'question_' + currentQuestionIndex + '_selected_answer'" class="me-2" :id="'answer_' + answer.id" :disabled="check">
								<span>{{ answer.text }}</span>
							</div>
						</label>
					</li>
				</ul>
			</div>
			<div class="p-2 d-flex" :class="{ 'justify-content-end': check, 'justify-content-center': !check }">
				<button class="btn btn-sm btn-primary" @click.prevent="submit" v-if="!check" :disabled="!userAnswerId">Ответить</button>
				<button class="btn btn-sm btn-primary" @click.prevent="nextQuestion" v-if="check">Далее</button>
			</div>
		</div>
	</div>
</template>

<script>
	import Exam from '@/store/models/Exam'
	import Answer from '@/store/models/Answer'

	export default {
		mounted() {
			this.getExam();
		},
		data() {
			return {
				questions: [
					{
						text: ''
					}
				],
				currentQuestionIndex: 0,
				userAnswerId: null,
				check: false
			}
		},
		methods: {
			getExam() {
				Exam.api().fetchById(this.$route.params.exam_id, '?include=course_version.course,questions.answers').then(() => {
					let questions = this.exam.questions;
					let result = [];
					while (questions.length > 0) {
						let random = Math.floor(Math.random() * ((questions.length - 1) - 0 + 1)) + 0;
						let elem = questions.splice(random, 1)[0];
						result.push(elem);
					}
					this.questions = result;
				});
			},
			submit() {
				this.check = true;
			},
			nextQuestion() {
				if ((this.currentQuestionNumber + 1) > this.questions.length) {
					this.currentQuestionIndex = 0;
				} else {
					this.currentQuestionIndex++;
				}
				this.check = false;
				this.userAnswerId = null;
			},
			alertClass(answer) {
				if (!this.check || answer.id != this.userAnswerId) {
					return '';
				} else {
					return (this.userAnswerId === answer.id && answer.proper) ? 'alert-success' : 'alert-danger';
				}
			}
		},
		computed: {
			exam() {
				return Exam.query().with(['examable.group.course', 'questions.answers', 'parent.questions.answers']).find(this.$route.params.exam_id) || null;
			},
			userAnswer() {
				return Answer.query().find(this.userAnswerId);
			},
			currentQuestion() {
				return this.questions[this.currentQuestionIndex];
			},
			currentQuestionNumber() {
				return this.currentQuestionIndex + 1;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>