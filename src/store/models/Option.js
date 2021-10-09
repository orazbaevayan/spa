import { Model } from '@vuex-orm/core'
import store from '@/store'

export default class Option extends Model {
	static entity = 'options'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			value: this.attr(''),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/options'
			},
			fetchById(id) {
				return this.get(`/api/options/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/options/${id}`, {
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