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
	<div class="p-2 d-flex flex-column">
		<Title>{{ $t('pages.Студенты') }}</Title>
		<div class="mx-2 my-1 p-1 d-flex justify-content-between">
			<input type="checkbox" class="mx-1">
			<!-- <router-link class="text-primary px-1 py-0" :to="{ name: 'manager-create-group' }">
				<font-awesome-icon :icon="['fa', 'plus-square']" />
			</router-link> -->
		</div>
		<Card class="mx-2 my-1" v-for="user in group.users" :key="user.id">
			<template v-slot:prepend>
				<input type="checkbox" class="mx-1">
			</template>
			<template v-slot:header>
				{{ user.fullName }}
			</template>
			<template v-slot:append>
				<!-- <router-link class="text-primary px-1 py-0" :to="{ name: 'manager-edit-user', params: { user_id: user.id } }">
					<font-awesome-icon :icon="['fa', 'eye']" />
				</router-link>
				<a href="#" class="text-danger px-1 py-0" @click="deleteGroup(user)">
					<font-awesome-icon :icon="['fa', 'trash-alt']" />
				</a> -->
			</template>
		</Card>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import Group from '@/store/models/Group'
	import Card from '@/components/Card'

	export default {
		created() {
			Course.api().fetchById(this.$route.params.course_id);
			Group.api().fetchById(this.$route.params.group_id)
			.then(() => {
				this.group = Group.query().with(['users']).find(this.$route.params.group_id);
			});
		},
		components: {
			Card
		},
		data() {
			return {
				group: new Group
			}
		},
		methods: {
			updateGroup() {
				Group.api().patch('/api/groups/' + this.$route.params.group_id, this.group)
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