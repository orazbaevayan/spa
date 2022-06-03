import i18n from '@/modules/i18n'
import CourseVersion from '@/store/models/CourseVersion'
const { t } = i18n.global
export default [
{
	name: 'admin-index-courses',
	path: '/admin/courses',
	meta: {
		title: () => t('pages.Курсы'),
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
	name: 'admin-index-course-versions',
	path: '/admin/courses/:course_id',
	meta: {
		title: () => t('pages.Версии курса'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Админ') },
		{ name: 'admin-index-courses' },
		]
	},
	component: () => import('../views/pages/admin/courses/IndexCourseVersions.vue')
},
{
	name: 'admin-create-course',
	path: '/admin/courses/create',
	meta: {
		title: () => t('pages.Создание курса'),
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
	name: 'admin-edit-course-version',
	path: '/admin/courses/:course_id/course_versions/:course_version_id',
	meta: {
		title: (route) => CourseVersion.find(route.params.course_version_id)?.comment,
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Админ') },
		{ name: 'admin-index-courses' },
		{ name: 'admin-index-course-versions' }
		]
	},
	component: () => import('../views/pages/admin/courses/EditCourseVersion.vue')
},
];