import CustomModel from '@/store/models/CustomModel'
import Group from '@/store/models/Group'

export default class Course extends CustomModel {
	static entity = 'courses'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			order_groups_by: this.attr(''),
			groups: this.hasMany(Group, 'course_id'),
			group_id: this.attr(null),
			group: this.belongsTo(Group, 'group_id'),
		}
	}

/*	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/courses'
			},
			fetchById (id) {
				return this.get(`/api/courses/${id}`)
			},
			deleteById(id) {
				return this.delete(`/api/courses/${id}`, {
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