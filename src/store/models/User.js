import CustomModel from '@/store/models/CustomModel'
/*import { Model } from '@vuex-orm/core'*/
/*import store from '@/store'*/
import RoleUser from '@/store/models/RoleUser'
import Role from '@/store/models/Role'
import GroupUser from '@/store/models/GroupUser'

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
		}
	}

/*	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/users'
			},
			fetchById(id) {
				return this.get(`/api/users/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/users/${id}`, {
					delete: id
				}).then((r) => {
					if (r.response.data === true) {
						store.dispatch('ui/notify', { text: 'Запись успешно удалена', status: 'danger' });
					}
				});
			}
		}
	}*/

	get fullName() {
		return this.last_name + ' ' + this.first_name + (this.middle_name ? ' ' + this.middle_name : '');
	}
}