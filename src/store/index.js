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
      mode: 'light',
      loading: false,
      login: false,
      cache: true,
      routeLast: '',
      routeNow: '/sistemas',
      alert: {
        type: 'attenttion',
        msg: 'Você não tem permissão para acessar o sistema AgeBoard!',
        display: false
      }
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
        state.system.mode = payload.mode !== undefined ? payload.mode : state.system.mode,
        state.system.loading = payload.loading !== undefined ? payload.loading : state.system.loading,
        state.system.login = payload.login !== undefined ? payload.login : state.system.login,
        state.system.routeLast = payload.routeLast !== undefined ? payload.routeLast : state.system.routeLast,
        state.system.routeNow = payload.routeNow !== undefined ? payload.routeNow : state.system.routeNow
      ]
    },

    SAVE_ALERT(state, payload) {


      return [
        state.system.alert.type = payload.type !== undefined ? payload.type : state.system.type,
        state.system.alert.msg = payload.msg !== undefined ? payload.msg : state.system.msg,
        state.system.alert.display = payload.display !== undefined ? payload.display : state.system.display
      ]
    },
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
