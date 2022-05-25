import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
	store.dispatch('auth/getUser').then(() => {
		if (to.matched.some(record => record.meta.requiresAuth) && !store.getters['auth/check']) {
			next({
				name: 'Login',
				query: { redirect: to.fullPath }
			})
		} else if(to.matched.some(record => record.meta.requiresGuest) && store.getters['auth/check']) {
			next({
				name: 'Home'
			})
		} else {
			next()
		}
	});
})

export default router