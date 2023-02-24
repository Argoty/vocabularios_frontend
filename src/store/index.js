import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLoading: false,
    snackbar: {
      status: false,
      message: "",
      type: "",
    },

    user: null,
    isAuthenticated: false,
  },
  getters: {},
  mutations: {
    setIsLoading(state, status) {
      state.isLoading = status;
    },
    setSnackbar(state, payload) {
      state.snackbar = {
        status: payload.status,
        message: payload.message,
        type: payload.type,
      };
    },

    initializeStore(state) {
      if (localStorage.getItem('user')) {
        state.user = localStorage.getItem("user");
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },

    setUser(state, payload) {
      state.user = payload.user;
      state.isAuthenticated = payload.stateAuth;
    },
  },
  actions: {},
  modules: {},
});
