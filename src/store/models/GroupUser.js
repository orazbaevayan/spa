import CustomModel from '@/store/models/CustomModel'
import User from '@/store/models/User'
import Group from '@/store/models/Group'
import Field from '@/store/models/Field'
import Exam from '@/store/models/Exam'
import CourseVersion from '@/store/models/CourseVersion'
import Value from '@/store/models/Value'

export default class GroupUser extends CustomModel {
	static entity = 'group_users'

	static fields () {
		return {
			id: this.attr(null),
			first_name: this.attr(''),
			last_name: this.attr(''),
			middle_name: this.attr(''),
			first_name_to: this.attr(''),
			last_name_to: this.attr(''),
			middle_name_to: this.attr(''),
			photo: this.attr(null),
			group_id: this.attr(null),
			user_id: this.attr(null),
			user: this.belongsTo(User, 'user_id'),
			course_version: this.hasOne(CourseVersion, 'course_version_id'),
			group: this.belongsTo(Group, 'group_id'),
			fields: this.morphMany(Field, 'fieldable_id', 'fieldable_type'),
			exams: this.morphMany(Exam, 'examable_id', 'examable_type'),
			values: this.morphMany(Value, 'valueable_id', 'valueable_type'),
			all_exams_passed: this.attr(null),
		}
	}

	get fullName() {
		return this.last_name + ' ' + this.first_name + (this.middle_name ? ' ' + this.middle_name : '');
	}
}