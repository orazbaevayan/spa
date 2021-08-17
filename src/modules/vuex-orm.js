import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from '@/modules/axios'
import User from '@/store/models/User'
import Role from '@/store/models/Role'
import RoleUser from '@/store/models/RoleUser'

VuexORM.use(VuexORMAxios, { axios, dataKey: 'data' })

const database = new VuexORM.Database()
database.register(User)
database.register(Role)
database.register(RoleUser)

export default database