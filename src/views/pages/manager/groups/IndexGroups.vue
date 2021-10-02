<template>
	<Title class="mt-2">{{ $t('pages.Группы') }}</Title>
	<div class="p-2 d-flex flex-column">
		<Card class="mx-2 my-1" :is-control-panel="true">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				<div class="col-md-6">
					Ф.И.О
				</div>
			</template>
			<template v-slot:append>
				<router-link class="text-primary px-1 py-0" :to="{ name: 'manager-create-group' }">
					<font-awesome-icon :icon="['fa', 'plus-square']" />
				</router-link>
			</template>
		</Card>
		<Card class="mx-2 my-1" v-for="group in groups" :key="group.id">
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
				<DeleteModal @delete="deleteGroup(group)">
					Вы действительно хотите удалить запись <span class="fw-bold">{{ group.name }}</span>?
				</DeleteModal>
<!-- 				<a href="#" class="text-danger px-1 py-0" @click="deleteGroup(group)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</a> -->
			</template>
		</Card>
	</div>
	<Pagination :value="course.groups" class="p-2" v-if="course.groups.length" />
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'
	import { mapGetters } from 'vuex'

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
			...mapGetters({
				'currentPageElements': 'pagination/currentPageElements',
			}),
			groups() {
				return this.currentPageElements(this.course.groups);
			},
		}
	}
</script>

<style lang="scss" scoped>

</style>