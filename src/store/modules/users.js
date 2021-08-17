import User from '@/store/models/User'

export default {
	namespaced: true,
	getters: {
		users: () => {
			return User.all()
		}
	},
	mutations: {
		SET_USERS (_, value) {
			User.insert({
				data: value
			});
		}
	},
	actions: {
		getAllUsers(context) {
			window.axios.get('api/users').then(response => {
				if (response.status === 200) {
					context.commit('SET_USERS', response.data);
				}
			}).catch(error => {
				console.log(error);
			});
		},
		getUser(context, value) {
			window.axios.get('api/users/' + value).then(response => {
				if (response.status === 200) {
					context.commit('SET_USERS', response.data);
				}
			}).catch(error => {
				console.log(error);
			});
		}
	}
}