import i18n from '@/modules/i18n'
const { t } = i18n.global

export default [
{
	name: 'user-my-courses',
	path: '/user/my_courses',
	meta: {
		title: () => t('pages.Мои курсы'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		]
	},
	component: () => import('../views/pages/user/MyCourses.vue')
},
{
	name: 'user-my-course',
	path: '/user/my_courses/:group_user_id',
	meta: {
		title: () => t('pages.Мой курс'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		{ name: 'user-my-courses' },
		]
	},
	component: () => import('../views/pages/user/MyCourse.vue')
},
];