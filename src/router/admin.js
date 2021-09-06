export default [
{
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
];