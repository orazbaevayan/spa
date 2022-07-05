import CustomModel from '@/store/models/CustomModel'
import GroupUser from '@/store/models/GroupUser'
import CourseVersion from '@/store/models/CourseVersion'
import Value from '@/store/models/Value'

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
			values: this.morphMany(Value, 'valueable_id', 'valueable_type'),
		}
	}
	
	get usersCount() {
		return this.group_users.length || 0;
	}
}