<template>
	<Title class="mt-2">{{ group_user?.group.course_version.course.name }} - {{ group_user?.group.group_name }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Обучение', 'Экзамены']">

			<template v-slot:0>

			</template>

			<template v-slot:1>
				<div class="p-2 d-flex flex-column">
					<Card class="my-1" v-for="attempt in group_user?.attempts" :key="attempt.id">
						<template v-slot:header>
							<div class="flex flex-fill px-1">
								{{ attempt.exam.name }}
							</div>
							<div class="flex flex-fill text-end px-1">
								<ExamResult :attempt="attempt"/>
							</div>
							<div class="px-1">
								<router-link class="text-primary px-1 py-0" :to="{ name: 'user-attempt', params: { exam_id: attempt.exam.id, attempt_id: attempt.id } }">
									<font-awesome-icon :icon="['fa', 'arrow-right']" />
								</router-link>
							</div>
						</template>
						<template v-slot:append>

						</template>
					</Card>
				</div>
			</template>
		</Tabs>
	</div>
</template>

<script>
	import GroupUser from '@/store/models/GroupUser'

	export default {
		created() {
			GroupUser.api().fetchById(this.$route.params.group_user_id, '?include=attempts.exam,attempts.attempt_questions,group.course_version.course');
		},
		computed: {
			group_user() {
				return GroupUser.query().with(['attempts.exam', 'attempts.attempt_questions', 'group.course_version.course']).find(this.$route.params.group_user_id) || null;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>