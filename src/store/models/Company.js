import CustomModel from '@/store/models/CustomModel'
import User from '@/store/models/User'
import CompanyUser from '@/store/models/CompanyUser'
import Course from '@/store/models/Course'

export default class Company extends CustomModel {
	static entity = 'companies'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			full_name: this.attr(''),
			type: this.attr(''),
			users: this.belongsToMany(User, CompanyUser, 'company_id', 'user_id'),
			courses: this.hasMany(Course, 'company_id'),
		}
	}
}