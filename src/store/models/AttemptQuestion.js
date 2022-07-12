import CustomModel from '@/store/models/CustomModel'
import Attempt from '@/store/models/Attempt'
import Question from '@/store/models/Question'
import Answer from '@/store/models/Answer'

export default class AttemptQuestion extends CustomModel {
	static entity = 'attempt_questions'

	static fields () {
		return {
			id: this.attr(null),
			attempt_id: this.attr(null),
			attempt: this.belongsTo(Attempt, 'attempt_id'),
			question_id: this.attr(null),
			question: this.belongsTo(Question, 'question_id'),
			answer_id: this.attr(null),
			answer: this.belongsTo(Answer, 'answer_id'),
		}
	}
}