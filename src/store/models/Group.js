import { Model } from '@vuex-orm/core'
import store from '@/store'
import router from '@/router'
import GroupUser from '@/store/models/GroupUser'
import Course from '@/store/models/Course'
import Template from '@/store/models/Template'
import Field from '@/store/models/Field'

export default class Group extends Model {
	static entity = 'groups'

	static fields () {
		return {
			id: this.attr(null),
			name: this.attr(''),
			group_name: this.attr(''),
			generate_name: this.attr(0),
			course_id: this.attr(null),
			course: this.belongsTo(Course, 'course_id'),
			group_users: this.hasMany(GroupUser, 'group_id'),
			templates: this.hasMany(Template, 'group_id'),
			fields: this.morphMany(Field, 'fieldable_id', 'fieldable_type'),
		}
	}

	static apiConfig = {
		actions: {
			fetch: {
				method: 'get',
				url: '/api/groups'
			},
			fetchById(id) {
				return this.get(`/api/groups/${id}`);
			},
			deleteById(id) {
				return this.delete(`/api/groups/${id}`, {
					delete: id
				}).then((r) => {
					if (r.response.data === true) {
						store.dispatch('ui/notify', { text: 'Запись успешно удалена', status: 'danger' });
					}
				});
			},
			update(event) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				this.post('/api/groups/' + router.currentRoute._value.params.group_id, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
		}
	}

	get usersCount() {
		return this.group_users.length || 0;
	}
}