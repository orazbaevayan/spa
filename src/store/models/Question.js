import CustomModel from '@/store/models/CustomModel'
import Exam from '@/store/models/Exam'
import Answer from '@/store/models/Answer'
/*import store from '@/store'*/

export default class Question extends CustomModel {
	static entity = 'questions'

	static fields () {
		return {
			id: this.attr(null),
			text: this.attr(''),
			comment: this.attr(''),
			exam_id: this.attr(null),
			answer_id: this.attr(null),
			exam: this.belongsTo(Exam, 'exam_id'),
			answers: this.hasMany(Answer, 'question_id'),
		}
	}
}