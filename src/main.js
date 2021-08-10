import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import '@/assets/styles/reset.css'
import '@/assets/styles/styles.css'

router.beforeEach((to, from, next) => {
	store.dispatch('auth/getUser').then(() => {
		if (to.matched.some(record => record.meta.requiresAuth)) {
			if (!store.getters['auth/user']) {
				next({
					name: 'Login',
					query: { redirect: to.fullPath }
				})
			} else {
				next()
			}
		} else {
			next()
		}
	});
})

const app = createApp(App)
app.use(store)
app.use(router)
app.mount('#app')

axios.defaults.withCredentials = true;
window.axios = axios;