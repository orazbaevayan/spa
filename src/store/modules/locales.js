//import router from '@/router'

export default {
	namespaced: true,
	state: {
		languages: [],
		messages: []
	},
	getters: {
		language: () => {
			if (!localStorage.getItem("locales.language")) {
				localStorage.setItem("locales.language", 'ru');
			}
			return localStorage.getItem("locales.language");
		},
		languages: state => {
			return state.languages;
		}
	},
	mutations: {
		SET_LANGUAGES (state, value) {
			state.languages = value;
		},
		SET_LANGUAGE (_, value) {
			localStorage.setItem("locales.language", value);
		}
	},
	actions: {
/*		getLanguages(context) {
			return window.axios.get('http://localhost:8040/api/locales/languages').then(response => {
				if (response.status === 200) {
					context.commit('SET_LANGUAGES', response.data);
				}
			}).catch(error => {
				console.log(error);
			})
		},*/
	},
}