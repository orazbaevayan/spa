import router from '@/router'
import axios from '@/modules/axios'
import User from '@/store/models/User'

export default {
	namespaced: true,
	state: {
		user: null
	},
	getters: {
		user: state => {
			return User.query().with(['roles']).find(state.user) || null;
		},
		check: state => {
			return state.user != null;
		}
	},
	mutations: {
		SET_USER (state, user_id) {
			state.user = user_id;
		}
	},
	actions: {
		getCookie() {
			return axios.get('sanctum/csrf-cookie');
		},
		getUser(context) {
			return User.api().get('/api/user?includes=roles').then(response => {
				if (response.response.status === 200) {
					context.commit('SET_USER', response.response.data.data.id);
				}
			}).catch(error => {
				if (error.status === 401) {
					context.commit('SET_USER', null);
				}
			})
		},
		login(context, credentials) {
			context.dispatch('getCookie').then(() => {
				axios.post('login', credentials).then(response => {
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
			axios.post('logout').then(response => {
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