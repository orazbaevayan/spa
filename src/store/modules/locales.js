//import store from '@/store'
//import { i18n } from '@/main'

export default {
	namespaced: true,
	getters: {
		language: () => {
			if (!localStorage.getItem("language")) {
				localStorage.setItem("language", 'ru');
			}
			return localStorage.getItem("language");
		}
	},
	mutations: {
		SET_LANGUAGE (_, value) {
			localStorage.setItem("language", value);
			location.reload();
		}
	}
}