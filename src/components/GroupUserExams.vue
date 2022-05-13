<template>
	<div>
		<Modal :modal-id="`group_user_exams_${groupUser.id}`" :header="true" :footer="false" :dialog-class="'modal-lg'" :open-button="true">
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
							<tr v-for="(exam, index) in groupUser.exams" :key="exam.id">
								<td><span class="mx-1">{{ index + 1 }}</span></td>
								<td>{{ exam.name }}</td>
								<td>
									<ExamResult :exam="exam"/>
								</td>
								<td>
									<span class="btn btn-link text-danger mx-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#delete_exam_${exam.id}`" data-bs-toggle="modal">
										<font-awesome-icon :icon="['fa', 'trash-alt']" />
									</span>
								</td>
							</tr>
							<tr v-if="!groupUser.exams.length">
								<td colspan="4" class="text-center">
									Нет экзаменов
								</td>
							</tr>
						</tbody>
					</table>
					<form class="d-flex position-relative add-exam-form mt-3" @submit.prevent="addExamToGroupUser">
						<select class="form-select form-select-sm" name="parent_exam_id">
							<option v-for="exam in groupUser.group.course.exams" :key="exam.id" :value="exam.id">{{ exam.name }}</option>
						</select>
						<input type="hidden" name="examable_id" :value="groupUser.id">
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

		<Modal v-for="exam in groupUser.exams" :key="exam.id" :header="true" :footer="true" :open-button="false" :modal-id="`delete_exam_${exam.id}`">
			<template v-slot:open-button>
				<font-awesome-icon class="text-danger mx-1" :icon="['fa', 'trash-alt']" />
			</template>
			<template v-slot:header>
				Удаление
			</template>
			<template v-slot:body>
				<div class="p-2">
					Вы действительно хотите удалить экзамен <span class="fw-bold">{{ groupUser.fullName }} - {{ exam.name }}</span>?
				</div>
			</template>
			<template v-slot:footer>
				<button type="button" class="m-0 m-2 btn btn-sm btn-danger text-white" :data-bs-target="`#group_user_exams_${groupUser.id}`" data-bs-toggle="modal" @click.prevent="deleteExam(exam)">Удалить</button>
				<button type="button" class="m-0 m-2 btn btn-sm btn-secondary" :data-bs-target="`#group_user_exams_${groupUser.id}`" data-bs-toggle="modal">Отмена</button>
			</template>
		</Modal>
	</div>
</template>

<script>
	import GroupUser from '@/store/models/GroupUser'
	import Exam from '@/store/models/Exam'

	export default {
		props: {
			groupUser: {
				type: Object,
				default: new GroupUser
			}
		},
		computed: {
			openButtonName() {
				return this.groupUser.exams.length;
			},
		},
		methods: {
			deleteExam(exam) {
				Exam.api().deleteById(exam.id);
			},
			addExamToGroupUser() {
				Exam.api().store(event.currentTarget);
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
	.add-exam-form {
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