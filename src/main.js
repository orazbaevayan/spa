import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import axios from '@/modules/axios'
import i18n from '@/modules/i18n'
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
	} else if(to.matched.some(record => record.meta.requiresGuest)) {
		next({
			name: 'Home'
		})
	} else {
		next()
	}
})

const app = createApp(App)
app.use(store)
app.use(router)
app.use(i18n)
app.mount('#app');

window.axios = axios;