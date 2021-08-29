import { Model } from '@vuex-orm/core'
import RoleUser from '@/store/models/RoleUser'
import Role from '@/store/models/Role'

export default class User extends Model {
	static entity = 'users'

	static fields () {
		return {
			id: this.attr(null),
			first_name: this.attr(''),
			last_name: this.attr(''),
			middle_name: this.attr(''),
			position: this.attr(''),
			email: this.attr(''),
			phone: this.attr(''),
			iin: this.attr(''),
			roles: this.belongsToMany(Role, RoleUser, 'user_id', 'role_id')
		}
	}

	get fullName() {
		return this.last_name + ' ' + this.first_name + (this.middle_name ? ' ' + this.middle_name : '');
	}
}