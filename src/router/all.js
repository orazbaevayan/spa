import Home from '@/views/pages/Home.vue'

export default [
{
	path: '/',
	name: 'Home',
	meta: {
		title: 'Главная',
		requiresAuth: true,
		layout: 'MainLayout'
	},
	component: Home
},
{
	path: '/login',
	name: 'Login',
	meta: {
		requiresGuest: true,
		layout: 'DefaultLayout'
	},
	component: () => import(/* webpackChunkName: "login" */ '../views/pages/Login.vue')
},
{
	path: '/:pathMatch(.*)*',
	name: '404',
	meta: {
		layout: 'DefaultLayout'
	},
	component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue')
}
];