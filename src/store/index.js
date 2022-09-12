import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate";


export default createStore({
  strict: true,
  state: {
    isMobile: false,
    permission: {
      system: null,
      level: null,
      function: null
    },
    user: {
      firstName: ''
    }
  },
  getters: {
    isMobile: state => state.isMobile,
    user: state => state.user,
    permissions: state => state.permission
  },
  mutations: {
    CHANGE_DEVICE(state, payload) {
      return state.isMobile = payload
    },

    SAVE_FIRSTNAME(state, payload) {
      return state.user.firstName = payload
    },

    SAVE_PERMISSION(state, payload) {
      return [
          state.permission.system = payload.permission.system,
          state.permission.level = payload.permission.level,
          state.permission.function = payload.permission.function,
      ]
    }
  },
  actions: {
    verifyDevice: function (context) {
      if (screen.width <= 760) {
        context.commit('CHANGE_DEVICE', true)
      } else {
        context.commit('CHANGE_DEVICE', false)
      }
    },

  },
  modules: {
  },
  plugins: [createPersistedState()]
})
