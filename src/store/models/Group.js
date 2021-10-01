import { Model } from '@vuex-orm/core'
import store from '@/store'
import GroupUser from '@/store/models/GroupUser'
import Course from '@/store/models/Course'

export default class Group extends Model {
	static entity = 'groups'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			course_id: this.attr(null),
			course: this.belongsTo(Course, 'course_id'),
			group_users: this.hasMany(GroupUser, 'group_id'),
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