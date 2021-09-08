import i18n from '@/modules/i18n'
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
		{ isLink: false, text: t('roles.Менеджер') },
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
		{ isLink: false, text: t('roles.Менеджер') },
		{ name: 'manager-index-courses' },
		{ isLink: false, text: 'Промышленная безопасность' },
		]
	},
	component: () => import('../views/pages/manager/courses/ShowCourse.vue')
},
/*{
	name: 'admin-create-course',
	path: '/admin/courses/create',
	meta: {
		title: 'Создание курса',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
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
		{ name: 'admin-index-courses' }
		]
	},
	component: () => import('../views/pages/admin/courses/EditCourse.vue')
},*/
];