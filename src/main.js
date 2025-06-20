import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import axios from 'axios';

axios.defaults.baseURL = "https://vocabulariosingles-fastapi.onrender.com/"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  axios,
  render: function (h) { return h(App) }
}).$mount('#app')

