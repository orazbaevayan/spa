import { Model } from '@vuex-orm/core'
import store from '@/store'

export default class Template extends Model {
	static entity = 'templates'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			file: this.attr(''),
			code: this.attr(''),
			templatable_id: this.attr(null),
			templatable_type: this.attr(null),
			templatable: this.morphTo('templatable_id', 'templatable_type'),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/templates'
			},
			fetchById(id) {
				return this.get(`/api/templates/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/templates/${id}`, {
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