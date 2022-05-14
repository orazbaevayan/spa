import CustomModel from '@/store/models/CustomModel'
import Group from '@/store/models/Group'

export default class Template extends CustomModel {
	static entity = 'templates'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			file: this.attr(''),
			code: this.attr(''),
			group_id: this.attr(null),
			selection_required: this.attr(false),
			group: this.belongsTo(Group, 'group_id'),
		}
	}
}