import CustomModel from '@/store/models/CustomModel'
/*import store from '@/store'*/
import Option from '@/store/models/Option'
import FieldOption from '@/store/models/FieldOption'

export default class Field extends CustomModel {
	static entity = 'fields'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			value: this.attr(''),
			type: this.attr(''),
			validation: this.attr(''),
			category: this.attr(''),
			fieldable_id: this.attr(null),
			fieldable_type: this.attr(null),
			fieldable: this.morphTo('fieldable_id', 'fieldable_type'),
			field_options: this.hasMany(FieldOption, 'field_id'),
			options: this.belongsToMany(Option, FieldOption, 'field_id', 'option_id'),
		}
	}

/*	static apiConfig = {
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
	}*/
}