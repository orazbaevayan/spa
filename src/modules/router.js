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
		}
		let previousRoute = {
			path: localStorage.getItem('previous_route_path'),
			query: JSON.parse(localStorage.getItem('previous_route_query'))
		}
		localStorage.setItem('previous_route_path', from.path);
		localStorage.setItem('previous_route_query', JSON.stringify(from.query));
		
		if (to.query.page) store.commit('pagination/SET_CURRENT_PAGE', to.query.page);
		(to.path == previousRoute.path && from.path != to.path) ? next(previousRoute) : next()
	});
})

export default router