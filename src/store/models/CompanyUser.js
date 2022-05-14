import CustomModel from '@/store/models/CustomModel'

export default class CompanyUser extends CustomModel {
	static entity = 'company_user'

	static primaryKey = ['company_id', 'user_id']

	static fields () {
		return {
			company_id: this.attr(null),
			user_id: this.attr(null),
		}
	}
}