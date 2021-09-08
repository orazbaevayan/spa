import { Model } from '@vuex-orm/core'

export default class User extends Model {
	static entity = 'courses'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr('')
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
			deleteById (id) {
				return this.delete(`/api/courses/${id}`)
			}
		}
	}
}