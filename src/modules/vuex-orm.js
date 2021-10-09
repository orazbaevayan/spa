import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from '@/modules/axios'
import User from '@/store/models/User'
import Role from '@/store/models/Role'
import RoleUser from '@/store/models/RoleUser'
import Course from '@/store/models/Course'
import Group from '@/store/models/Group'
import GroupUser from '@/store/models/GroupUser'
import Template from '@/store/models/Template'
import Field from '@/store/models/Field'
import Option from '@/store/models/Option'
import FieldOption from '@/store/models/FieldOption'

VuexORM.use(VuexORMAxios, { axios, dataKey: 'data' })

const database = new VuexORM.Database()
database.register(User)
database.register(Role)
database.register(RoleUser)
database.register(Course)
database.register(Group)
database.register(GroupUser)
database.register(Template)
database.register(Field)
database.register(Option)
database.register(FieldOption)

export default database