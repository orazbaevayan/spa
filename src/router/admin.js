export default [
{
	path: '/courses',
	name: 'Courses',
	meta: {
		requiresAuth: true,
		layout: 'MainLayout'
	},
	component: () => import(/* webpackChunkName: "courses" */ '../views/pages/admin/courses/IndexCourses.vue')
},
];