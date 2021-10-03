import { Model } from '@vuex-orm/core'
import store from '@/store'
import Group from '@/store/models/Group'
import Template from '@/store/models/Template'

export default class Course extends Model {
	static entity = 'courses'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			groups: this.hasMany(Group, 'course_id'),
			templates: this.morphMany(Template, 'templatable_id', 'templatable_type'),
		}
	}

	static apiConfig = {
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
	}
}