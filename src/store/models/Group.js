import CustomModel from '@/store/models/CustomModel'
import GroupUser from '@/store/models/GroupUser'
import CourseVersion from '@/store/models/CourseVersion'
import Field from '@/store/models/Field'

export default class Group extends CustomModel {
	static entity = 'groups'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			order: this.attr(''),
			group_name: this.attr(''),
			generate_name: this.attr(0),
			course_version_id: this.attr(null),
			course_version: this.belongsTo(CourseVersion, 'course_version_id'),
			group_users: this.hasMany(GroupUser, 'group_id'),
			fields: this.morphMany(Field, 'fieldable_id', 'fieldable_type'),
		}
	}
	
	get usersCount() {
		return this.group_users.length || 0;
	}
}