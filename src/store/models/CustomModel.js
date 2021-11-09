import { Model } from '@vuex-orm/core'
import store from '@/store'

export default class CustomModel extends Model {
	static entity = '';

	static apiConfig = {
		actions: {
			fetch(query = '') {
				return this.get(`/api/${this.model?.entity}${query}`);
			},
			fetchById(id, query = '') {
				return this.get(`/api/${this.model?.entity}/${id}${query}`);
			},
			deleteById(id) {
				return this.delete(`/api/${this.model?.entity}/${id}`, {
					delete: id
				}).then((r) => {
					if (r.response.data === true) {
						store.dispatch('ui/notify', { text: 'Запись успешно удалена', status: 'danger' });
					}
					return r;
				});
			},
			update(event, id, query = '') {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				return this.post(`/api/${this.model?.entity}/${id}${query}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
					return r;
				})
				.catch(e => console.log(e));
			},
			store(event, query = '') {
				let formData = new FormData(event.currentTarget);
				return this.post(`/api/${this.model?.entity}${query}`, formData)
				.then(r => {
					if (r.response.status === 201) {
						store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
					}
					return r;
				})
				.catch(e => console.log(e));
			}
		}
	}
}