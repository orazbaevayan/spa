import Role from '@/store/models/Role'

export default {
	namespaced: true,
	getters: {
		roles: () => {
			return Role.all()
		}
	},
	mutations: {
		SET_ROLES (_, value) {
			Role.insert({
				data: value
			});
		}
	},
	actions: {
		getAllRoles(context) {
			window.axios.get('api/roles').then(response => {
				if (response.status === 200) {
					context.commit('SET_ROLES', response.data);
				}
			}).catch(error => {
				console.log(error);
			});
		},
		getRole(context, value) {
			window.axios.get('api/roles/' + value).then(response => {
				if (response.status === 200) {
					context.commit('SET_ROLES', response.data);
				}
			}).catch(error => {
				console.log(error);
			});
		}
	}
}