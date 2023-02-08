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
    },
    menu: {
      system: 'agecontrol',
      selected: 'dash',
      stage: 'increase'
    },
    system: {
      mode: 'light'
    }
  },
  getters: {
    isMobile: state => state.isMobile,
    user: state => state.user,
    permissions: state => state.permission,
    menu: state => state.menu,
    system: state => state.system
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
    },

    SAVE_MENU(state, payload ) {
      return [
        state.menu.system = payload.system !== undefined ? payload.system : state.menu.system,
        state.menu.selected = payload.selected !== undefined ? payload.selected : state.menu.selected,
        state.menu.stage = payload.stage !== undefined ? payload.stage : state.menu.stage,
      ]
    },

    SAVE_SYSTEM(state, payload) {
      return [
          state.system.mode = payload.mode !== undefined ? payload.mode : state.system.mode
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
