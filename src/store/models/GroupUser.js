import { Model } from '@vuex-orm/core'
import store from '@/store'
import User from '@/store/models/User'
import Group from '@/store/models/Group'

export default class GroupUser extends Model {
	static entity = 'groupUser'

	static fields () {
		return {
			id: this.attr(null),
			group_id: this.attr(null),
			user_id: this.attr(null),
			user: this.belongsTo(User, 'user_id'),
			group: this.belongsTo(Group, 'group_id'),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/group_users'
			},
			fetchById(id) {
				return this.get(`/api/group_users/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/group_users/${id}`, {
					delete: id
				}).then((r) => {
					if (r.response.data === true) {
						store.dispatch('ui/notify', { text: 'Запись успешно удалена', status: 'danger' });
					}
				});
			}
		}
	}
}