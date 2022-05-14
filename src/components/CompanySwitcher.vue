<template>
	<Modal v-if="user.company" :header="true" :footer="true" :dialog-class="'modal-md'" :modal-id="'company_switch_modal'" :open-button="false">
		<template v-slot:open-button>
			
		</template>
		<template v-slot:header>
			Переключение учебного центра
		</template>
		<template v-slot:body>
			<div class="p-2">
				<form @submit.prevent="switchCompany">
				<div class="form-check" v-for="(company, index) in user.companies" :key="company.id">
					<input class="form-check-input" type="radio" name="company_id" :id="`company_${index}`" v-model="user.company.id" :value="company.id">
					<label class="form-check-label" :for="`company_${index}`">
						{{ company.name }}
					</label>
				</div>
			</form>
			</div>
		</template>
		<template v-slot:footer>
			<button type="submit" class="m-0 m-2 btn btn-sm btn-success text-white" data-bs-dismiss="modal" @click="switchCompany" :form="'company_switch'">Сохранить</button>
			<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
		</template>
	</Modal>
</template>

<script>
	import User from '@/store/models/User'

	export default {
		methods: {
			switchCompany() {

			}
		},
		computed: {
			user() {
				return User.query().with(['company', 'companies']).find(this.$store.getters['auth/user'].id);
			}
		}
	}
</script>