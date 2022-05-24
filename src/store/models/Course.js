import CustomModel from '@/store/models/CustomModel'
import Group from '@/store/models/Group'
import Exam from '@/store/models/Exam'
import Company from '@/store/models/Company'

export default class Course extends CustomModel {
	static entity = 'courses'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			groups_table: this.attr(''),
			students_table: this.attr(''),
			order_groups_by: this.attr(''),
			groups: this.hasMany(Group, 'course_id'),
			group_id: this.attr(null),
			group: this.belongsTo(Group, 'group_id'),
			exams: this.morphMany(Exam, 'examable_id', 'examable_type'),
			company_id: this.attr(null),
			company: this.belongsTo(Company, 'company_id'),
		}
	}
}