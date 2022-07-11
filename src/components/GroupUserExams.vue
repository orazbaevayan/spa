<template>
	<div>
		<Modal :modal-id="`group_user_attempts_${groupUser.id}`" :header="true" :footer="false" :dialog-class="'modal-lg'" :open-button="true">
			<template v-slot:open-button>
				{{ openButtonName }}
			</template>
			<template v-slot:header>
				Экзамены - {{ groupUser.fullName }}
			</template>
			<template v-slot:body>
				<div class="p-2">
					<table class="table table-striped table-borderless mb-0">
						<thead>
							<tr>
								<th><span class="mx-1">#</span></th>
								<th>Название</th>
								<th>Результат</th>
								<th>
									<!-- <span class="btn btn-link text-primary mx-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#addExam`" data-bs-toggle="modal">
										<font-awesome-icon :icon="['fa', 'plus-square']" />
									</span> -->
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(attempt, index) in groupUser.attempts" :key="attempt.id">
								<td><span class="mx-1">{{ index + 1 }}</span></td>
								<td>{{ attempt.exam.name }}</td>
								<td>
									<!-- <ExamResult :exam="exam"/> -->
								</td>
								<td>
									<span class="btn btn-link text-danger mx-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#delete_attempt_${attempt.id}`" data-bs-toggle="modal">
										<font-awesome-icon :icon="['fa', 'trash-alt']" />
									</span>
								</td>
							</tr>
							<tr v-if="!groupUser.attempts.length">
								<td colspan="4" class="text-center">
									Нет экзаменов
								</td>
							</tr>
						</tbody>
					</table>
					<form class="d-flex position-relative add-attempt-form mt-3" @submit.prevent="addAttemptToGroupUser">
						<select class="form-select form-select-sm" name="exam_id">
							<option v-for="exam in groupUser.group.course_version.exams" :key="exam.id" :value="exam.id">{{ exam.name }}</option>
						</select>
						<input type="hidden" name="group_user_id" :value="groupUser.id">
						<button type="submit" class="btn btn-sm btn-primary">
							Добавить
						</button>
					</form>
				</div>
			</template>
			<template v-slot:footer>
				<button type="submit" class="m-0 m-2 btn btn-sm btn-primary text-white" data-bs-dismiss="modal" @click="$emit('store')" :form="''">Создать</button>
				<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" data-bs-dismiss="modal">Отмена</button>
			</template>
		</Modal>

		<Modal v-for="attempt in groupUser.attempts" :key="attempt.id" :header="true" :footer="true" :open-button="false" :modal-id="`delete_attempt_${attempt.id}`">
			<template v-slot:open-button>
				<font-awesome-icon class="text-danger mx-1" :icon="['fa', 'trash-alt']" />
			</template>
			<template v-slot:header>
				Удаление
			</template>
			<template v-slot:body>
				<div class="p-2">
					Вы действительно хотите удалить экзамен <span class="fw-bold">{{ groupUser.fullName }} - {{ attempt.exam.name }}</span>?
				</div>
			</template>
			<template v-slot:footer>
				<button type="button" class="m-0 m-2 btn btn-sm btn-danger text-white" :data-bs-target="`#group_user_attempts_${groupUser.id}`" data-bs-toggle="modal" @click.prevent="deleteAttempt(attempt)">Удалить</button>
				<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" :data-bs-target="`#group_user_attempts_${groupUser.id}`" data-bs-toggle="modal">Отмена</button>
			</template>
		</Modal>
	</div>
</template>

<script>
	import GroupUser from '@/store/models/GroupUser'
	import Attempt from '@/store/models/Attempt'

	export default {
		props: {
			groupUser: {
				type: Object,
				default: new GroupUser
			}
		},
		computed: {
			openButtonName() {
				return this.groupUser.attempts.length;
			},
		},
		methods: {
			deleteAttempt(attempt) {
				Attempt.api().deleteById(attempt.id);
			},
			addAttemptToGroupUser() {
				Attempt.api().store(event.currentTarget);
			}
		}
	}
</script>

<style lang="scss" scoped>
	table {
		tr {
			th {
				padding-top: 0;
				&:first-child {
					width: 1%;
					white-space: nowrap;
				}
				&:nth-child(2) {
					width: 100%;
				}
				&:nth-last-child(2) {
					white-space: nowrap;
				}
				&:last-child {
					width: 1%;
					white-space: nowrap;
				}
			}
			td {
				&:nth-last-child(2) {
					white-space: nowrap;
				}
			}
		}
		&:not(caption)>*>* {
			background-color: #fff;
		}
	}
	.add-attempt-form {
		select {
			border-top-right-radius: 0;
			border-bottom-right-radius: 0;
			border-right: none;
		}
		button {
			border-top-left-radius: 0;
			border-bottom-left-radius: 0;
		}
	}
</style>