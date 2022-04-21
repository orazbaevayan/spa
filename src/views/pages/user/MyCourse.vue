<template>
	<Title class="mt-2">{{ group_user?.group.course.name }} - {{ group_user?.group.group_name }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Обучение', 'Экзамены']">

			<template v-slot:0>
				
			</template>

			<template v-slot:1>
				<div class="p-2 d-flex flex-column">
					<Card class="my-1" v-for="exam in group_user?.exams" :key="exam.id">
						<template v-slot:header>
							<div class="flex flex-fill px-1">
								{{ exam.name }}
							</div>
							<div class="flex flex-fill text-end px-1" v-html="`${exam.gradeHTML}`"></div>
							<div class="px-1">
								<router-link class="text-primary px-1 py-0" :to="{ name: 'user-exam', params: { exam_id: exam.id } }">
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
			this.$fetchApiData([
				GroupUser.api().fetchById(this.$route.params.group_user_id, '?include=exams,group.course'),
			]);
		},
		computed: {
			group_user() {
				return GroupUser.query().with(['exams', 'group.course']).find(this.$route.params.group_user_id) || null;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>