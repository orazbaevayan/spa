<template>
	<form class="p-2" @submit.prevent="updateGroup">
		<Title>{{ $t('pages.Редактирование группы') }}</Title>
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" v-model="group.name">
		</div>
		<div class="p-2">
			<input type="submit" class="btn btn-sm btn-warning text-white" :value="$t('ui.Редактировать')">
		</div>
	</form>
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'

	export default {
		created() {
			Course.api().fetchById(this.$route.params.course_id);
			Group.api().fetchById(this.$route.params.group_id)
			.then(r => this.group = r.response.data.data);
		},
		data() {
			return {
				group: new Group
			}
		},
		methods: {
			updateGroup() {
				Course.api().patch('/api/groups/' + this.$route.params.group_id, this.group)
				.then(r => {
					if (r.response.status === 200) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно отредактирована', status: 'warning' });
					}
				})
				.catch(e => console.log(e));
			}
		}
	}
</script>