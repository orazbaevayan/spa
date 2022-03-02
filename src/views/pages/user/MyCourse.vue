<template>
	<Title class="mt-2">{{ $t('pages.Мой курс') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Обучение', 'Экзамены']">

			<template v-slot:0>
				
			</template>

			<template v-slot:1>
				<div class="p-2 d-flex flex-column">
					<Card class="my-1" v-for="exams in group_user?.exams" :key="exams.id">
						<template v-slot:header>
							<div class="flex flex-fill px-1">
								{{ exams.name }}
							</div>
							<div class="flex flex-fill text-end px-1">
								<span class="text-secondary">
									Нет оценки
								</span>
							</div>
							<div class="px-1">
								<font-awesome-icon :icon="['fa', 'arrow-right']" />
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
				GroupUser.api().fetchById(this.$route.params.group_user_id, '?include=exams'),
			]);
		},
		computed: {
			group_user() {
				return GroupUser.query().with(['exams']).find(this.$route.params.group_user_id) || null;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>