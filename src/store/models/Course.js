import CustomModel from '@/store/models/CustomModel'
import Company from '@/store/models/Company'
import CourseVersion from '@/store/models/CourseVersion'

export default class Course extends CustomModel {
	static entity = 'courses'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			order_groups_by: this.attr(''),
			course_version_id: this.attr(null),
			course_version: this.belongsTo(CourseVersion, 'course_version_id'),
			course_versions: this.hasMany(CourseVersion, 'course_id'),
			company_id: this.attr(null),
			company: this.belongsTo(Company, 'company_id'),
		}
	}
}