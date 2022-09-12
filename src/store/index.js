import { createStore } from 'vuex'

export default createStore({
  strict: true,
  state: {
    isMobile: false
  },
  getters: {
    isMobile: state => state.isMobile
  },
  mutations: {
    CHANGE_DEVICE(state, payload) {
      return state.isMobile = payload
    }
  },
  actions: {
    verifyDevice: function (context) {
      if (screen.width <= 760) {
        context.commit('CHANGE_DEVICE', true)
      } else {
        context.commit('CHANGE_DEVICE', false)
      }
    }
  },
  modules: {
  }
})
