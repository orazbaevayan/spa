import CustomModel from '@/store/models/CustomModel'
import Question from '@/store/models/Question'
import CourseVersion from '@/store/models/CourseVersion'

export default class Exam extends CustomModel {
	static entity = 'exams'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			grade: this.attr(''),
			gradeHTML: this.attr(''),
			result: this.attr(''),
			passed: this.attr(null),
			/*parent_exam_id: this.attr(null),
			parent: this.belongsTo(Exam, 'parent_exam_id'),*/
			course_version: this.belongsTo(CourseVersion, 'course_version_id'),
			course_version_id: this.attr(null),
			/*examable_type: this.attr(null),*/
			passing_percent: this.attr(''),
			number_of_question: this.attr(''),
			duration: this.attr(''),
			is_active: this.attr(false),
			is_ended: this.attr(false),
			ends_at: this.attr(null),
			questions: this.hasMany(Question, 'exam_id'),
		}
	}
}