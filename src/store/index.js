import { createStore } from 'vuex'

export default createStore({
  state: {
    auth: {
      user: null
    }
  },
  getters: {
    AUTH_USER: state => {
      return state.auth.user;
    }
  },
  mutations: {
    setAuthUser (state, user) {
      state.auth.user = user;
    }
  },
  actions: {
    login(context, credentials) {
      window.axios.get('http://localhost:8040/sanctum/csrf-cookie').then(() => {
        window.axios.post('http://localhost:8040/login', credentials).then(response => {
          if (response.status === 200) {
            context.dispatch('getAuthUser');
          }
        });
      });
    },
    logout(context) {
      window.axios.get('http://localhost:8040/sanctum/csrf-cookie').then(() => {
        window.axios.post('http://localhost:8040/logout').then(response => {
          if (response.status === 204) {
            context.commit('setAuthUser', null)
          }
        });
      });
    },
    getAuthUser(context) {
      window.axios.get('http://localhost:8040/api/user').then(response => {
        if (response.status === 200) {
          context.commit('setAuthUser', response.data);
        }
      })
    }
  },
  modules: {
  }
})
