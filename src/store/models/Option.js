import CustomModel from '@/store/models/CustomModel'
/*import { Model } from '@vuex-orm/core'*/
/*import store from '@/store'*/
import Field from '@/store/models/Field'
import FieldOption from '@/store/models/FieldOption'

export default class Option extends CustomModel {
	static entity = 'options'

	static fields () {
		return {
			id: this.attr(null),
			key: this.attr(''),
			value: this.attr(''),
			field_options: this.hasMany(FieldOption, 'option_id'),
			fields: this.belongsToMany(Field, FieldOption, 'user_id', 'field_id'),
		}
	}

/*	static apiConfig = {
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
	}*/
}