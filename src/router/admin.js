export default [
{
	path: '/courses',
	name: 'Courses',
	meta: {
		title: 'Курсы',
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' }
		]
	},
	component: () => import(/* webpackChunkName: "courses" */ '../views/pages/admin/courses/IndexCourses.vue')
},
];