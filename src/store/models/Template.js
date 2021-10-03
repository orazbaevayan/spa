import { Model } from '@vuex-orm/core'
import store from '@/store'
import Course from '@/store/models/Course'

export default class Template extends Model {
	static entity = 'templates'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			file: this.attr(''),
			code: this.attr(''),
			course_id: this.attr(null),
			course: this.belongsTo(Course, 'course_id'),
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