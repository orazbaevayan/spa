import CustomModel from '@/store/models/CustomModel'
import Question from '@/store/models/Question'
/*import store from '@/store'*/

export default class Answer extends CustomModel {
	static entity = 'answers'

	static fields () {
		return {
			id: this.attr(null),
			text: this.attr(''),
			proper: this.attr(false),
			question_id: this.attr(null),
			question: this.belongsTo(Question, 'question_id'),
		}
	}
}