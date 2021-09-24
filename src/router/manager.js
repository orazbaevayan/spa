import i18n from '@/modules/i18n'
import Course from '@/store/models/Course'
import Group from '@/store/models/Group'
const { t } = i18n.global

export default [
{
	name: 'manager-index-users',
	path: '/manager/users',
	meta: {
		title: () => t('pages.Пользователи'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		]
	},
	component: () => import('../views/pages/manager/users/IndexUsers.vue')
},
{
	name: 'manager-create-user',
	path: '/manager/users/create',
	meta: {
		title: () => t('pages.Создание пользователя'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-users' },
		]
	},
	component: () => import('../views/pages/manager/users/CreateUser.vue')
},
{
	name: 'manager-edit-user',
	path: '/manager/users/:user_id',
	meta: {
		title: () => t('pages.Редактирование пользователя'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-users' },
		]
	},
	component: () => import('../views/pages/manager/users/EditUser.vue')
},
{
	name: 'manager-index-courses',
	path: '/manager/groups',
	meta: {
		title: () => t('pages.Группы'),
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
	path: '/manager/course/:course_id/groups',
	meta: {
		title: (route) => Course.find(route.params.course_id)?.name,
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-courses' },
		]
	},
	component: () => import('../views/pages/manager/groups/IndexGroups.vue')
},
{
	name: 'manager-create-group',
	path: '/manager/course/:course_id/groups/create',
	meta: {
		title: () => t('pages.Создание группы'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-courses' },
		{ name: 'manager-index-groups' },
		]
	},
	component: () => import('../views/pages/manager/groups/CreateGroup.vue')
},
{
	name: 'manager-edit-group',
	path: '/manager/course/:course_id/groups/:group_id',
	meta: {
		title: (route) => Group.find(route.params.group_id)?.name,
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Менеджер') },
		{ name: 'manager-index-courses' },
		{ name: 'manager-index-groups' },
		]
	},
	component: () => import('../views/pages/manager/groups/EditGroup.vue')
},
];