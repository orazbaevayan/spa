import CustomModel from '@/store/models/CustomModel'

export default class Role extends CustomModel {
	static entity = 'roles'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr('')
		}
	}
}