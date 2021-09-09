import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from '@/modules/axios'
import User from '@/store/models/User'
import Role from '@/store/models/Role'
import RoleUser from '@/store/models/RoleUser'
import Course from '@/store/models/Course'
import Group from '@/store/models/Group'

VuexORM.use(VuexORMAxios, { axios, dataKey: 'data' })

const database = new VuexORM.Database()
database.register(User)
database.register(Role)
database.register(RoleUser)
database.register(Course)
database.register(Group)

export default database