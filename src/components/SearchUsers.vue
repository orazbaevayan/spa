<template>
	<form class="input-group input-group-sm p-2" @submit.prevent="search">
		<select v-model="searchField" class="text-start input-group-text bg-white flex-grow-0">
			<option value="iin">{{ $t('models.user.ИИН') }}</option>
			<option value="fullName">{{ $t(`models.user['Ф.И.О']`) }}</option>
			<option value="phone">{{ $t('models.user.Телефон') }}</option>
		</select>
		<input type="text" class="form-control" v-model="searchText" :maxlength="maxLength">
		<button class="btn btn-primary" type="submit">
			<font-awesome-icon :icon="['fa', 'search']" />
		</button>
	</form>
</template>

<script>
	import User from '@/store/models/User'
	import Fuse from 'fuse.js'

	export default {
		mounted() {
			this.query()
		},
		data() {
			return {
				searchText: this.$route.query.search || '',
				searchField: this.$route.query.field || 'iin'
			}
		},
		methods: {
			search() {
				this.query().then(() => {
					if (this.searchText) {
						this.$router.replace({ query: { ...this.$route.query, search: this.searchText, field: this.searchField } })
					} else {
						this.$router.replace({ query: {} })
					}
				});
			},
			query() {
				return User.api().fetch().then(() => {
					const options = {
						includeScore: true,
						ignoreLocation: true,
						threshold: this.threshold,
						keys: [this.searchField]
					}
					const result = this.searchText !== '' ? new Fuse(User.all(), options).search(this.searchText).map(i => i.item.id) : User.all().map(i => i.id);
					this.$emit('search', result)
				});
			}
		},
		computed: {
			maxLength() {
				const rules = {
					iin: 12,
					fullName: 256,
					phone: 11
				}
				return rules[this.searchField];
			},
			threshold() {
				const rules = {
					iin: 0.0,
					fullName: 0.5,
					phone: 0.0
				}
				return rules[this.searchField];
			}
		}
	}
</script>

<style lang="scss" scoped>
	form {
		flex-direction: row;
		input, button {
			z-index: auto !important;
		}
	}
</style>