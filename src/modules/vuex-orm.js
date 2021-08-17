import VuexORM from '@vuex-orm/core'
import User from '@/store/models/User'
import Role from '@/store/models/Role'
import RoleUser from '@/store/models/RoleUser'

const database = new VuexORM.Database()
database.register(User)
database.register(Role)
database.register(RoleUser)

export default database