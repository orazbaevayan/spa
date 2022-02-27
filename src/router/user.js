import i18n from '@/modules/i18n'
const { t } = i18n.global

export default [
{
	name: 'user-index-exams',
	path: '/user/exams',
	meta: {
		title: () => t('pages.Экзамены'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		]
	},
	component: () => import('../views/pages/user/exams/IndexExams.vue')
},
];