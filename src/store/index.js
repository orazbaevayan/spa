import { createStore } from 'vuex'
import auth from './modules/auth'
import locales from './modules/locales'
import VuexORM from '@vuex-orm/core'
import database from '@/modules/vuex-orm'
/*import users from './modules/users'
import roles from './modules/roles'*/

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth,
    locales,
/*    users,
    roles*/
  },
  plugins: [VuexORM.install(database)]
})