import router from '@/router'

export default {
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
		getCookie() {
			return window.axios.get('http://localhost:8040/sanctum/csrf-cookie');
		},
		getUser(context) {
			return window.axios.get('http://localhost:8040/api/user').then(response => {
				if (response.status === 200) {
					context.commit('SET_USER', response.data);
				}
			}).catch(error => {
				if (error.status === 401) {
					context.commit('SET_USER', null);
				}
			})
		},
		login(context, credentials) {
			context.dispatch('getCookie').then(() => {
				window.axios.post('http://localhost:8040/login', credentials).then(response => {
					if (response.status === 200) {
						context.dispatch('getUser').then(() => {
							if (!router.currentRoute._value.query.redirect) {
								router.push({ name: 'Home' });
							} else {
								router.push({ path: router.currentRoute._value.query.redirect });
							}
						}).catch(error => {
							console.log(error.response);
						});
					}
				}).catch(error => {
					if ([422, 429].includes(error.response.status)) {
						alert(error.response.data.message);
					}
				});
			});
		},
		logout(context) {
			window.axios.post('http://localhost:8040/logout').then(response => {
				if (response.status === 204) {
					router.push({ name: 'Login' });
					context.commit('SET_USER', null);
				}
			}).catch(error => {
				console.log(error);
			});
		},
	},
}