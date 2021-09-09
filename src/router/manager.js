import i18n from '@/modules/i18n'
import Course from '@/store/models/Course'
const { t } = i18n.global

export default [
{
	name: 'manager-index-courses',
	path: '/manager/courses',
	meta: {
		title: t('pages.Курсы'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		]
	},
	component: () => import('../views/pages/manager/courses/IndexCourses.vue')
},
{
	name: 'manager-index-groups',
	path: '/manager/courses/:course_id/groups',
	meta: {
		title: t('pages.Группы'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-courses' },
		{ isLink: false, text: (route) => Course.find(route.params.course_id)?.name },
		]
	},
	component: () => import('../views/pages/manager/groups/IndexGroups.vue')
},
];