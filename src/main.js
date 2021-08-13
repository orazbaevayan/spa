import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/styles/reset.css'
import '@/assets/styles/styles.css'

router.beforeEach((to, from, next) => {
	if (to.matched.some(record => record.meta.requiresAuth)) {
		store.dispatch('auth/getUser').then(() => {
			if (!store.getters['auth/user']) {
				next({
					name: 'Login',
					query: { redirect: to.fullPath }
				})
			} else {
				next()
			}
		});
	} else {
		next()
	}
})

const i18n = createI18n({
	legacy: false,
	locale: "ru",
	globalInjection: true,
	messages: {
		ru: {
			message: {
				language: "Russian",
				greeting: "Привет !"
			}
		},
		en: {
			message: {
				language: "English",
				greeting: "Hello !"
			}
		},
		ar: {
			message: {
				language: "العربية",
				greeting: "السلام عليكم"
			}
		},
		es: {
			message: {
				language: "Español",
				greeting: "Hola !"
			}
		}
	}
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app')

axios.interceptors.request.use(
	function (config) {
		config.headers['Accept-Language'] = store.getters['locales/language'];
		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);
axios.defaults.withCredentials = true;
window.axios = axios;