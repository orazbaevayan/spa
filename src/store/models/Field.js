import CustomModel from '@/store/models/CustomModel'
import Option from '@/store/models/Option'

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
			options: this.hasMany(Option, 'field_id'),
			parent_field_id: this.attr(null),
			parent: this.belongsTo(Field, 'parent_field_id'),
		}
	}
}