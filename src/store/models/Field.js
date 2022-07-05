import CustomModel from '@/store/models/CustomModel'
import Option from '@/store/models/Option'
import CourseVersion from '@/store/models/CourseVersion'

export default class Field extends CustomModel {
	static entity = 'fields'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			value: this.attr(''),
			type: this.attr(''),
			validation: this.attr(''),
			category: this.attr(''),
			course_version: this.belongsTo(CourseVersion, 'course_version_id'),
			course_version_id: this.attr(null),
			options: this.hasMany(Option, 'field_id'),
		}
	}
}