import CustomModel from '@/store/models/CustomModel'

export default class RoleUser extends CustomModel {
	static entity = 'role_user'

	static primaryKey = ['role_id', 'user_id']

	static fields () {
		return {
			role_id: this.attr(null),
			user_id: this.attr(null)
		}
	}
}