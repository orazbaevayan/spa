import { Model } from '@vuex-orm/core'
import store from '@/store'
import router from '@/router'

export default class CustomModel extends Model {
	static entity = '';

	static apiConfig = {
		actions: {
			fetch(query = '', options = { pagination: { name: 'page', entity: this.model?.entity } }) {
				let page = router.currentRoute.value.query[options.pagination.name] ? (query != '' ? `&page=${router.currentRoute.value.query[options.pagination.name]}` : `?page=${router.currentRoute.value.query[options.pagination.name]}`) : '';
				return this.get(`/api/${this.model?.entity}${query}${page}`).then(r => {
					store.commit('pagination/SET_DATA', { entity: options.pagination.entity, ...{ items: r.response.data.data.map(a => a.id), meta: r.response.data.meta, links: r.response.data.links } });
				});
			},
			fetchById(id, query = '') {
				return this.get(`/api/${this.model?.entity}/${id}${query}`);
			},
			deleteById(id, notification = 'Запись успешно удалена') {
				return this.delete(`/api/${this.model?.entity}/${id}`, {
					delete: id
				}).then((r) => {
					if (r.response.data === true) {
						if (notification) store.dispatch('ui/notify', { text: notification, status: 'danger' });
					}
					return r;
				});
			},
			update(form, id, query = '', notification = 'Запись успешно отредактирована') {
				let formData = new FormData(form);
				formData.append('_method', 'PATCH');
				return this.post(`/api/${this.model?.entity}/${id}${query}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						if (notification) store.dispatch('ui/notify', { text: notification, status: 'warning' });
					}
					return r;
				})
				.catch(e => console.log(e));
			},
			store(form, query = '', notification = 'Запись успешно создана') {
				let formData = new FormData(form);
				return this.post(`/api/${this.model?.entity}${query}`, formData)
				.then(r => {
					if (r.response.status === 201) {
						if (notification) store.dispatch('ui/notify', { text: notification, status: 'success' });
					}
					return r;
				})
				.catch(e => console.log(e));
			}
		}
	}
}