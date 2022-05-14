import CustomModel from '@/store/models/CustomModel'
import RoleUser from '@/store/models/RoleUser'
import Role from '@/store/models/Role'
import GroupUser from '@/store/models/GroupUser'
import CompanyUser from '@/store/models/CompanyUser'
import Company from '@/store/models/Company'

export default class User extends CustomModel {
	static entity = 'users'

	static fields () {
		return {
			id: this.attr(null),
			first_name: this.attr(''),
			last_name: this.attr(''),
			middle_name: this.attr(''),
			first_name_to: this.attr(''),
			last_name_to: this.attr(''),
			middle_name_to: this.attr(''),
			position: this.attr(''),
			email: this.attr(''),
			phone: this.attr(''),
			iin: this.attr(''),
			photo: this.attr(null),
			roles: this.belongsToMany(Role, RoleUser, 'user_id', 'role_id'),
			group_users: this.hasMany(GroupUser, 'user_id'),
			companies: this.belongsToMany(Company, CompanyUser, 'user_id', 'company_id'),
			company_id: this.attr(null),
			company: this.belongsTo(Company, 'company_id'),
		}
	}

	get fullName() {
		return this.last_name + ' ' + this.first_name + (this.middle_name ? ' ' + this.middle_name : '');
	}
}