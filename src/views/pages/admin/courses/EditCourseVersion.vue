<template>
	<Title>{{ $t('pages.Редактирование курса') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Курс', 'Версия', 'Шаблоны', 'Группа', 'Студент']">

			<template v-slot:0>
				<CourseForm :value="course_version.course" @submit.prevent="updateCourse">
					<div class="p-2 text-start">
						<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Сохранить')">
					</div>
				</CourseForm>
			</template>

			<template v-slot:1>
				<CourseVersionForm :value="course_version" @submit.prevent="updateCourseVersion">
					<div class="p-2 text-start">
						<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Сохранить')">
					</div>
				</CourseVersionForm>
			</template>

			<template v-slot:2>
				<TemplatesTab />
			</template>

			<template v-slot:3>
				<GroupTab />
			</template>

			<template v-slot:4>
				<GroupUserFieldsTab />
			</template>

		</Tabs>
	</div>
</template>

<script>
	//import Group from '@/store/models/Group'
	import Course from '@/store/models/Course'
	import CourseVersion from '@/store/models/CourseVersion'
	//import Option from '@/store/models/Option'
	//import GroupUser from '@/store/models/GroupUser'
	import CourseForm from '@/components/forms/Course'
	import CourseVersionForm from '@/components/forms/CourseVersion'
	import GroupUserFieldsTab from '@/views/pages/admin/courses/EditCourse/GroupUserFieldsTab'
	import GroupTab from '@/views/pages/admin/courses/EditCourse/GroupTab'
	import TemplatesTab from '@/views/pages/admin/courses/EditCourse/TemplatesTab'

	export default {
		created() {
			CourseVersion.api().fetchById(this.$route.params.course_version_id, '?include=course,templates,group.fields.options,group_user.fields.options');
		},
		components: {
			CourseForm,
			CourseVersionForm,
			GroupTab,
			GroupUserFieldsTab,
			TemplatesTab,
		},
		methods: {
			updateCourse(event) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				Course.api().post(`/api/courses/${this.course_version.course.id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
			updateCourseVersion(event) {
				CourseVersion.api().update(event.currentTarget, this.$route.params.course_version_id, '?include=course,templates,group.fields.options,group_user.fields.options');
			},
		},
		computed: {
			course_version() {
				return CourseVersion.query().with(['course', 'templates', 'group.fields.options', 'group_user.fields.options']).find(this.$route.params.course_version_id) || new CourseVersion;
				
			}
		}
	}
</script>