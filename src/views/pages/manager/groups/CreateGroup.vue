<template>
	<form class="p-2 w-100" @submit.prevent="storeGroup">
		<Title>{{ $t('pages.Создание группы') }}</Title>
		<div class="p-2">
			<label class="form-label" for="name">Название</label>
			<input type="text" class="form-control form-control-sm" name="name" v-model="group.name">
		</div>
		<div class="p-2">
			<input type="submit" class="btn btn-sm btn-primary text-white" :value="$t('ui.Создать')">
		</div>
	</form>
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'

	export default {
		created() {
			Course.api().fetchById(this.$route.params.course_id);
		},
		data() {
			return {
				group: new Group
			}
		},
		methods: {
			storeGroup() {
				Group.api().post('api/groups', this.group)
				.then(r => {
					if (r.response.status === 201) {
						this.$store.dispatch('ui/notify', { text: 'Запись успешно создана', status: 'success' });
						this.$router.push({ name: 'manager-index-groups' });
					}
				})
				.catch(e => console.log(e));
			}
		}
	}
</script>