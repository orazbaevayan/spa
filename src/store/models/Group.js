import { Model } from '@vuex-orm/core'
import store from '@/store'

export default class User extends Model {
	static entity = 'groups'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr('')
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