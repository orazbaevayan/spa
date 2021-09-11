import { Model } from '@vuex-orm/core'
import store from '@/store'
import GroupUser from '@/store/models/GroupUser'
import User from '@/store/models/User'

export default class Group extends Model {
	static entity = 'groups'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			course_id: this.attr(null),
			users: this.belongsToMany(User, GroupUser, 'group_id', 'user_id'),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/groups'
			},
			fetchById(id) {
				return this.get(`/api/groups/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/groups/${id}`, {
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