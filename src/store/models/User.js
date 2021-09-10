import { Model } from '@vuex-orm/core'
import store from '@/store'
import RoleUser from '@/store/models/RoleUser'
import Role from '@/store/models/Role'
import Group from '@/store/models/Group'
import GroupUser from '@/store/models/GroupUser'

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
			roles: this.belongsToMany(Role, RoleUser, 'user_id', 'role_id'),
			groups: this.belongsToMany(Group, GroupUser, 'user_id', 'group_id'),
		}
	}

	static apiConfig = {
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
	}

	get fullName() {
		return this.last_name + ' ' + this.first_name + (this.middle_name ? ' ' + this.middle_name : '');
	}
}