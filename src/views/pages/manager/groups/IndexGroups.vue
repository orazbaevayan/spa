<template>
	<div class="p-2 d-flex flex-column">
		<Title>{{ $t('pages.Группы') }}</Title>
		<div class="mx-2 my-1 p-1 d-flex justify-content-between" style="border: 1px solid transparent;">
			<input type="checkbox" class="mx-1">
			<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-create-group' }">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</router-link>
		</div>
		<Card class="mx-2 my-1" v-for="group in course.groups" :key="group.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				{{ group.name }}
			</template>
			<template v-slot:append>
				<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-edit-group', params: { group_id: group.id } }">
					<font-awesome-icon :icon="['fa', 'eye']" />
				</router-link>
				<a href="#" class="text-danger px-1 py-0" @click="deleteGroup(group)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</a>
			</template>
		</Card>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'

	export default {
		beforeCreate() {
			Course.api().fetchById(this.$route.params.course_id);
		},
		methods: {
			deleteGroup(group) {
				Group.api().deleteById(group.id);
			},
		},
		computed: {
			course() {
				return Course.query().with('groups').find(this.$route.params.course_id) || new Course;
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>