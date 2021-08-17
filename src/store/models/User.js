import { Model } from '@vuex-orm/core'

export default class User extends Model {
	static entity = 'users'

	static fields () {
		return {
			id: this.attr(null),
			first_name: this.attr(''),
			last_name: this.attr(''),
			middle_name: this.attr(''),
			email: this.attr(''),
			phone: this.attr(''),
			iin: this.attr(''),
		}
	}
}