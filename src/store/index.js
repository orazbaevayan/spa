import { createStore } from 'vuex'
import auth from './modules/auth'
import locales from './modules/locales'
import VuexORM from '@vuex-orm/core'
import database from '@/modules/vuex-orm'

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
    locales
  },
  plugins: [VuexORM.install(database)]
})