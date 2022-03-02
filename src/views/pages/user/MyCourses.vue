<template>
	<Title class="mt-2">{{ $t('pages.Мои курсы') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Tabs :tabs="['Активные', 'Завершенные']">

			<template v-slot:0>
				<div class="p-2 d-flex flex-column">
					<Card class="my-1" v-for="group_user in user.group_users" :key="group_user.id">
						<template v-slot:header>
							<span class="px-1">
								{{ group_user.group?.course.name }} - {{ group_user.group?.group_name }}
							</span>
						</template>
						<template v-slot:append>
							<router-link class="text-primary px-1 py-0" :to="{ name: 'user-my-course', params: { group_user_id: group_user.id } }">
								<font-awesome-icon :icon="['fa', 'eye']" />
							</router-link>
						</template>
					</Card>
				</div>

				<!-- <div v-for="group_user in user.group_users" :key="group_user.id">
					{{ group_user.id }}
				</div> -->
			</template>

			<template v-slot:1>
				Завершенные
			</template>
		</Tabs>
	</div>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		created() {
			this.$fetchApiData([
				User.api().fetchById(this.$store.state.auth.user, '?include=group_users.group.course'),
			]);
		},
		computed: {
			user() {
				return User.query().with(['group_users.group.course']).find(this.$store.state.auth.user) || null;
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>