import router from '@/router'
import store from '@/store'

router.beforeEach((to, from, next) => {
	if (to.query.page) store.commit('pagination/SET_CURRENT_PAGE', to.query.page);
	store.dispatch('auth/getUser').then(() => {
		if (to.matched.some(record => record.meta.requiresAuth)) {
			if (!store.getters['auth/check']) {
				next({
					name: 'Login',
					query: { redirect: to.fullPath }
				})
			} else {
				next()
			}
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