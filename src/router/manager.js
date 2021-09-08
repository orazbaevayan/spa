import i18n from '@/modules/i18n'
/*import Course from '@/store/models/Course'*/
const { t } = i18n.global

export default [
{
	name: 'manager-index-courses',
	path: '/manager/courses',
	meta: {
		title: 'Курсы',
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
		title: 'Группы',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-courses' },
		{ isLink: false, text: () => 'Пром без' },
		]
	},
	component: () => import('../views/pages/manager/courses/ShowCourse.vue')
},
];