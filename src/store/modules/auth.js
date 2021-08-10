export default {
	name: 'auth',
	namespaced: true,
	state: {
		user: null
	},
	getters: {
		user: state => {
			return state.user;
		}
	},
	mutations: {
		SET_USER (state, user) {
			state.user = user;
		}
	},
	actions: {
		getUser(context) {
			window.axios.get('http://localhost:8040/api/user').then(response => {
				if (response.status === 200) {
					context.commit('SET_USER', response.data);
				}
			})
		},
		login(context, credentials) {
			window.axios.get('http://localhost:8040/sanctum/csrf-cookie').then(() => {
				window.axios.post('http://localhost:8040/login', credentials).then(response => {
					if (response.status === 200) {
						context.dispatch('getUser');
					}
				});
			});
		},
		logout(context) {
			window.axios.get('http://localhost:8040/sanctum/csrf-cookie').then(() => {
				window.axios.post('http://localhost:8040/logout').then(response => {
					if (response.status === 204) {
						context.commit('SET_USER', null)
					}
				});
			});
		},
	},
}