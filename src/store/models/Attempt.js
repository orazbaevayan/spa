import CustomModel from '@/store/models/CustomModel'
//import Question from '@/store/models/Question'
import Exam from '@/store/models/Exam'
import GroupUser from '@/store/models/GroupUser'
import AttemptQuestion from '@/store/models/AttemptQuestion'
/*import store from '@/store'*/

export default class Attempt extends CustomModel {
	static entity = 'attempts'

	static fields () {
		return {
			id: this.attr(null),
			exam_id: this.attr(null),
			exam: this.belongsTo(Exam, 'exam_id'),
			attempt_questions: this.hasMany(AttemptQuestion, 'attempt_id'),
			group_user_id: this.attr(null),
			group_user: this.belongsTo(GroupUser, 'group_user_id'),
			grade: this.attr(''),
			result: this.attr(''),
			passed: this.attr(null),
			is_active: this.attr(false),
			is_ended: this.attr(false),
			ends_at: this.attr(null),
		}
	}
}