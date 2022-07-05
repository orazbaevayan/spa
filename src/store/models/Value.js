import CustomModel from '@/store/models/CustomModel'
import Field from '@/store/models/Field'

export default class Value extends CustomModel {
	static entity = 'values'

	static fields () {
		return {
			id: this.attr(null),
			value: this.attr(''),
			field_id: this.attr(''),
			field: this.belongsTo(Field, 'field_id'),
			valueable: this.morphTo('valueable_id', 'valueable_type'),
			valueable_id: this.attr(null),
			valueable_type: this.attr(null),
		}
	}
}