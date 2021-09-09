import i18n from '@/modules/i18n'
const { t } = i18n.global
import Home from '@/views/pages/Home.vue'

export default [
{
	path: '/',
	name: 'Home',
	meta: {
		title: t('pages.Главная'),
		requiresAuth: true,
		layout: 'MainLayout'
	},
	component: Home
},
{
	path: '/login',
	name: 'Login',
	meta: {
		title: t('pages.Авторизация'),
		requiresGuest: true,
		layout: 'DefaultLayout'
	},
	component: () => import(/* webpackChunkName: "login" */ '../views/pages/Login.vue')
},
{
	path: '/:pathMatch(.*)*',
	name: '404',
	meta: {
		title: t('pages.Страница не найдена'),
		layout: 'DefaultLayout'
	},
	component: () => import(/* webpackChunkName: "404" */ '../views/pages/404.vue')
}
];