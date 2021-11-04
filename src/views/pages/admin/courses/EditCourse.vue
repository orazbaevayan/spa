<template>
	<Title>{{ $t('pages.Редактирование курса') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Общие данные', 'Шаблоны', 'Группа', 'Студент']">

			<template v-slot:0>
				<CourseForm :value="course" @submit.prevent="updateCourse">
					<div class="p-2 text-start">
						<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Сохранить')">
					</div>
				</CourseForm>
			</template>

			<template v-slot:1>
				<TemplatesTab />
			</template>

			<template v-slot:2>
				<GroupTab />
			</template>

			<template v-slot:3>
				<GroupUserFieldsTab />
			</template>

		</Tabs>
	</div>
</template>

<script>
	import Group from '@/store/models/Group'
	import Course from '@/store/models/Course'
	import Option from '@/store/models/Option'
	import GroupUser from '@/store/models/GroupUser'
	import CourseForm from '@/components/forms/Course'
	import GroupUserFieldsTab from '@/views/pages/admin/courses/EditCourse/GroupUserFieldsTab'
	import GroupTab from '@/views/pages/admin/courses/EditCourse/GroupTab'
	import TemplatesTab from '@/views/pages/admin/courses/EditCourse/TemplatesTab'

	export default {
		created() {
			Option.api().fetch();
			Group.api().fetch();
			Course.api().fetchById(this.$route.params.course_id);
			GroupUser.api().fetch();
		},
		components: {
			CourseForm,
			GroupTab,
			GroupUserFieldsTab,
			TemplatesTab,
		},
		methods: {
			updateCourse(event) {
				let formData = new FormData(event.currentTarget);
				formData.append('_method', 'PATCH');
				Course.api().post(`/api/courses/${this.$route.params.course_id}`, formData)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			},
		},
		computed: {
			course() {
				return Course.query().with(['groups', 'templates', 'group.fields']).find(this.$route.params.course_id) || new Course;
			}
		}
	}
</script>