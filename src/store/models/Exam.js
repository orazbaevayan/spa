import CustomModel from '@/store/models/CustomModel'
import Question from '@/store/models/Question'
/*import store from '@/store'*/

export default class Exam extends CustomModel {
	static entity = 'exams'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			examable: this.morphTo('examable_id', 'examable_type'),
			examable_id: this.attr(null),
			examable_type: this.attr(null),
			passing_percent: this.attr(''),
			total_questions: this.attr(''),
			duration: this.attr(''),
			ends_at: this.attr(null),
			questions: this.hasMany(Question, 'exam_id'),
		}
	}
}