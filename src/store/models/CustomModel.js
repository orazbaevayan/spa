import { Model } from '@vuex-orm/core'
import store from '@/store'

export default class CustomModel extends Model {
	static entity = '';

	static apiConfig = {
		actions: {
			fetch(options = { save: false }) {
				return this.get(`/api/${this.model?.entity}`, options);
			},
			fetchById(id, options = { save: false }) {
				return this.get(`/api/${this.model?.entity}/${id}`, options);
			},
			deleteById(id) {
				return this.delete(`/api/${this.model?.entity}/${id}`, {
					delete: id
				}).then((r) => {
					if (r.response.data === true) {
						store.dispatch('ui/notify', { text: 'Запись успешно удалена', status: 'danger' });
					}
				});
			},
			update(event, id) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				return this.post(`/api/${this.model?.entity}/${id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
		}
	}
}