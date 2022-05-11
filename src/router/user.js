import i18n from '@/modules/i18n'
import GroupUser from '@/store/models/GroupUser'
const { t } = i18n.global

export default [
{
	name: 'user-my-courses',
	path: '/user/my_courses',
	meta: {
		title: () => t('pages.Мои курсы'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		]
	},
	component: () => import('../views/pages/user/MyCourses.vue')
},
{
	name: 'user-my-course',
	path: '/user/my_courses/:group_user_id',
	meta: {
		title: (route) => GroupUser.query().with(['group.course']).find(route.params.group_user_id)?.group.course.name + ' - ' + GroupUser.query().with(['group']).find(route.params.group_user_id)?.group.group_name,
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		{ name: 'user-my-courses' },
		]
	},
	component: () => import('../views/pages/user/MyCourse.vue')
},
{
	name: 'user-exam',
	path: '/user/my_courses/:group_user_id/exams/:exam_id',
	meta: {
		title: () => t('pages.Экзамен'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		{ name: 'user-my-courses' },
		{ name: 'user-my-course', query: { tab: 1 } },
		]
	},
	component: () => import('../views/pages/user/Exam.vue')
},
{
	name: 'user-exam-training',
	path: '/user/my_courses/:group_user_id/exams/:exam_id/training',
	meta: {
		title: () => t('pages.Тренировка'),
		requiresAuth: true,
		layout: 'MainLayout',
		breadcrumbs: [
		{ name: 'Home' },
		{ isLink: false, text: () => t('roles.Пользователь') },
		{ name: 'user-my-courses' },
		{ name: 'user-my-course' },
		{ name: 'user-exam' },
		]
	},
	component: () => import('../views/pages/user/Training.vue')
},
];