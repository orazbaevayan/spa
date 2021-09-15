<template>
	<form class="input-group input-group-sm p-2" @submit.prevent="search">
		<select v-model="searchField" class="input-group-text bg-white flex-grow-0">
			<option value="iin">ИИН</option>
			<option value="fullName">Ф.И.О</option>
		</select>
		<input type="text" class="form-control" v-model="searchText">
		<button class="btn btn-primary" type="submit">
			<font-awesome-icon :icon="['fa', 'search']" />
		</button>
	</form>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		data() {
			return {
				searchText: '',
				searchField: 'iin'
			}
		},
		methods: {
			search() {
				User.api().fetch().then(r => {
					console.log(r.response.data.data.filter(user => {
						return user[this.searchField] === this.searchText;
					}));
				});
			}
		}
	}
</script>