import { Model } from '@vuex-orm/core'

export default class GroupUser extends Model {
	static entity = 'groupUser'

	static primaryKey = ['group_id', 'user_id']

	static fields () {
		return {
			group_id: this.attr(null),
			user_id: this.attr(null)
		}
	}
}