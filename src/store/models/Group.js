import CustomModel from '@/store/models/CustomModel'
import GroupUser from '@/store/models/GroupUser'
import Course from '@/store/models/Course'
import Template from '@/store/models/Template'
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
			course_id: this.attr(null),
			course: this.belongsTo(Course, 'course_id'),
			group_users: this.hasMany(GroupUser, 'group_id'),
			templates: this.hasMany(Template, 'group_id'),
			fields: this.morphMany(Field, 'fieldable_id', 'fieldable_type'),
		}
	}
	
	get usersCount() {
		return this.group_users.length || 0;
	}
}