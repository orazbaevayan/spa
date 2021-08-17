//import router from '@/router'

export default {
	namespaced: true,
	state: {
	},
	getters: {
		getUserById: state => id => {
			return state[id];
		}
	},
	mutations: {
		SET_USER (state, user) {
			state[user.id] = user;
		}
	},
	actions: {
	},
}