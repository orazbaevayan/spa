import CustomModel from '@/store/models/CustomModel'
/*import { Model } from '@vuex-orm/core'*/

export default class RoleUser extends CustomModel {
	static entity = 'roleUser'

	static primaryKey = ['role_id', 'user_id']

	static fields () {
		return {
			role_id: this.attr(null),
			user_id: this.attr(null)
		}
	}
}