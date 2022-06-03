import CustomModel from '@/store/models/CustomModel'
import Group from '@/store/models/Group'
import Exam from '@/store/models/Exam'
import Course from '@/store/models/Course'
import GroupUser from '@/store/models/GroupUser'
import Template from '@/store/models/Template'

export default class CourseVersion extends CustomModel {
	static entity = 'course_versions'

	static fields () {
		return {
			id: this.attr(null),
			comment: this.attr(''),
			groups_table: this.attr(''),
			students_table: this.attr(''),
			groups: this.hasMany(Group, 'course_version_id'),
			group_id: this.attr(null),
			group: this.belongsTo(Group, 'group_id'),
			group_user_id: this.attr(null),
			group_user: this.belongsTo(GroupUser, 'group_user_id'),
			exams: this.morphMany(Exam, 'examable_id', 'examable_type'),
			course_id: this.attr(null),
			course: this.belongsTo(Course, 'course_id'),
			templates: this.hasMany(Template, 'group_id'),
		}
	}
}