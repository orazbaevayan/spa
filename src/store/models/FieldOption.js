import { Model } from '@vuex-orm/core'
import store from '@/store'
import Field from '@/store/models/Field'
import Option from '@/store/models/Option'

export default class FieldOption extends Model {
	static entity = 'field_options'

	static fields () {
		return {
			id: this.attr(null),
			field_id: this.attr(null),
			option_id: this.attr(null),
			field: this.belongsTo(Field, 'field_id'),
			option: this.belongsTo(Option, 'option_id'),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/field_options'
			},
			fetchById(id) {
				return this.get(`/api/field_options/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/field_options/${id}`, {
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