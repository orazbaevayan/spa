import CustomModel from '@/store/models/CustomModel'
import Field from '@/store/models/Field'

export default class Option extends CustomModel {
	static entity = 'options'

	static fields () {
		return {
			id: this.attr(null),
			key: this.attr(''),
			value: this.attr(''),
			field_id: this.attr(null),
			field: this.belongsTo(Field, 'field_id'),
		}
	}
}