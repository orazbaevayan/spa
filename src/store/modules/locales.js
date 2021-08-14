export default {
	namespaced: true,
	getters: {
		language: () => {
			if (!localStorage.getItem("language")) {
				let browserLanguage = navigator.language.split('-')[0];
				if (['ru', 'en', 'kk'].includes(browserLanguage)) {
					localStorage.setItem("language", browserLanguage);
				} else {
					localStorage.setItem("language", 'ru');
				}
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