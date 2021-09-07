export default [
{
	name: 'admin-index-courses',
	path: '/admin/courses',
	meta: {
		title: 'Курсы',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' }
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
},
];