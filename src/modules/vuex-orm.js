import VuexORM from '@vuex-orm/core'
import User from '@/store/models/User'

const database = new VuexORM.Database()
database.register(User)

export default database