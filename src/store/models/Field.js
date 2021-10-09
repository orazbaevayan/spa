import { Model } from '@vuex-orm/core'
import store from '@/store'

export default class Field extends Model {
	static entity = 'fields'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			value: this.attr(''),
			type: this.attr(''),
			category: this.attr(''),
			options: this.attr([]),
			fieldable_id: this.attr(null),
			fieldable_type: this.attr(null),
			fieldable: this.morphTo('fieldable_id', 'fieldable_type'),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/fields'
			},
			fetchById(id) {
				return this.get(`/api/fields/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/fields/${id}`, {
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