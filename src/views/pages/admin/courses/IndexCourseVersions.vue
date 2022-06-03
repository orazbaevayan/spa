<template>
	<div class="p-2" v-if="course">
		<div class="p-2">
			<table class="table table-striped table-borderless mb-0 custom-table">
				<thead>
					<tr>
						<th scope="col">#</th>
						<th scope="col">Комментарий</th>
						<th scope="col" class="text-end">
							<span class="btn btn-link text-primary mx-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#addGroupUser`" data-bs-toggle="modal">
								<font-awesome-icon :icon="['fa', 'plus-square']" />
							</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(course_version, index) in course.course_versions" :key="course_version.id">
						<td scope="col">{{ index + 1 }}</td>
						<td>{{ course_version.comment }}</td>
						<td>
							<div class="d-flex">
								<router-link class="text-warning px-1 py-0" :to="{ name: 'admin-edit-course-version', params: { course_id: course.id, course_version_id: course_version.id } }">
									<font-awesome-icon :icon="['fa', 'pencil-alt']" />
								</router-link>
								<!-- <span class="btn btn-link text-warning px-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#edit_group_user_modal_${course_version.id}`" data-bs-toggle="modal">
									<font-awesome-icon :icon="['fa', 'pencil-alt']" />
								</span> -->
								<span class="btn btn-link text-danger px-1 p-0" data-bs-dismiss="modal" :data-bs-target="`#delete_group_user_${course_version.id}`" data-bs-toggle="modal">
									<font-awesome-icon :icon="['fa', 'trash-alt']" />
								</span>
							</div>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import Course from '@/store/models/Course'
	import User from '@/store/models/User'

	export default {
		beforeCreate() {
			/*Course.api().fetch()*/
			Course.api().fetchById(this.$route.params.course_id, '?include=course_versions,course_version');
			User.api().get('/api/user?include=company.courses');
		},
		methods: {
			deleteCourse(course) {
				Course.api().deleteById(course.id);
			}
		},
		computed: {
			courses() {
				return Course.all();
			},
			user() {
				return User.query().with(['company.courses']).find(this.$store.getters['auth/user']?.id);
			},
			course() {
				return Course.query().with(['course_version', 'course_versions']).find(this.$route.params.course_id);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.custom-table {
		overflow-x: auto;
		display: block;
		&:not(caption)>*>* {
			background-color: $gray-100;
		}
		tr {
			th {
				white-space: nowrap;
			}
			th:first-child, td:first-child {
				width: 1%; position: sticky; left: 0;
			}
			th:last-child, td:last-child {
				width: 1%; position: sticky; right: 0;
			}
		}
	}
</style>