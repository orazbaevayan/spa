import { createStore } from 'vuex'
import auth from './modules/auth'
import locales from './modules/locales'
import ui from './modules/ui'
import pagination from './modules/pagination'
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
    locales,
    ui,
    pagination,
  },
  plugins: [VuexORM.install(database)]
})