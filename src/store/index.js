import { createStore } from 'vuex'
import auth from './modules/auth'
import locales from './modules/locales'
import users from './modules/users'

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
    users
  }
})