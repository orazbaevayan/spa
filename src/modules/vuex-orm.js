import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import axios from '@/modules/axios'
import User from '@/store/models/User'
import Role from '@/store/models/Role'
import RoleUser from '@/store/models/RoleUser'
import Course from '@/store/models/Course'
import CourseVersion from '@/store/models/CourseVersion'
import Group from '@/store/models/Group'
import GroupUser from '@/store/models/GroupUser'
import Template from '@/store/models/Template'
import Field from '@/store/models/Field'
import Option from '@/store/models/Option'
import Exam from '@/store/models/Exam'
import Question from '@/store/models/Question'
import Answer from '@/store/models/Answer'
import Company from '@/store/models/Company'
import CompanyUser from '@/store/models/CompanyUser'
import Value from '@/store/models/Value'
import Attempt from '@/store/models/Attempt'
import AttemptQuestion from '@/store/models/AttemptQuestion'

VuexORM.use(VuexORMAxios, { axios, dataKey: 'data' })

const database = new VuexORM.Database()
database.register(User)
database.register(Role)
database.register(RoleUser)
database.register(Course)
database.register(CourseVersion)
database.register(Group)
database.register(GroupUser)
database.register(Template)
database.register(Field)
database.register(Option)
database.register(Exam)
database.register(Question)
database.register(Answer)
database.register(Company)
database.register(CompanyUser)
database.register(Value)
database.register(Attempt)
database.register(AttemptQuestion)

export default database