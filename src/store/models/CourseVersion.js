import CustomModel from '@/store/models/CustomModel'
import Group from '@/store/models/Group'
import Exam from '@/store/models/Exam'
import Course from '@/store/models/Course'
//import GroupUser from '@/store/models/GroupUser'
import Template from '@/store/models/Template'
import Field from '@/store/models/Field'

export default class CourseVersion extends CustomModel {
	static entity = 'course_versions'

	static fields () {
		return {
			id: this.attr(null),
			comment: this.attr(''),
			group_name_template: this.attr(''),
			generate_group_name: this.attr(''),
			groups_table: this.attr(''),
			students_table: this.attr(''),
			groups: this.hasMany(Group, 'course_version_id'),
			exams: this.hasMany(Exam, 'course_version_id'),
			course_id: this.attr(null),
			course: this.belongsTo(Course, 'course_id'),
			templates: this.hasMany(Template, 'course_version_id'),
			fields: this.hasMany(Field, 'course_version_id'),
		}
	}
}