import { Model } from '@vuex-orm/core'

export default class User extends Model {
	static entity = 'courses'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr('')
		}
	}
}