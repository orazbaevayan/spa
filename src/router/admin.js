import i18n from '@/modules/i18n'
const { t } = i18n.global

export default [
{
	name: 'admin-index-courses',
	path: '/admin/courses',
	meta: {
		title: 'Курсы',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Админ') },
		]
	},
	component: () => import('../views/pages/admin/courses/IndexCourses.vue')
},
{
	name: 'admin-create-course',
	path: '/admin/courses/create',
	meta: {
		title: 'Создание курса',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Админ') },
		{ name: 'admin-index-courses' }
		]
	},
	component: () => import('../views/pages/admin/courses/CreateCourse.vue')
},
{
	name: 'admin-edit-course',
	path: '/admin/courses/:course_id',
	meta: {
		title: 'Редактирование курса',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Админ') },
		{ name: 'admin-index-courses' }
		]
	},
	component: () => import('../views/pages/admin/courses/EditCourse.vue')
},
];