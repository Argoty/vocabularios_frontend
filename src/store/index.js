import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    snackbar: {
      status: false,
      message: "",
      type: ""
    }
  },
  getters: {
  },
  mutations: {
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setSnackbar(state, payload) {
      state.snackbar = {
        status: payload.status,
        message: payload.message,
        type: payload.type
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
