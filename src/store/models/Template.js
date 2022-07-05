import CustomModel from '@/store/models/CustomModel'
import CourseVersion from '@/store/models/CourseVersion'

export default class Template extends CustomModel {
	static entity = 'templates'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			file: this.attr(''),
			code: this.attr(''),
			course_version_id: this.attr(null),
			selection_required: this.attr(false),
			course_version: this.belongsTo(CourseVersion, 'course_version_id'),
		}
	}
}