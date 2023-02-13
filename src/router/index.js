import Vue from 'vue'
import VueRouter from 'vue-router'

import HomeView from '../views/HomeView.vue'
import VocabWords from '../views/VocabWords.vue'
import PracticarVoc from '../views/PracticarVoc.vue'
import AdminVocab from '../views/AdminVocab.vue'
import AdminPalabras from '../views/AdminPalabras.vue'
// import LoginAdmin from '../views/LoginAdmin.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/:vocabulario_slug',
    name: 'VocabWords',
    component: VocabWords
  },
  {
    path: '/:vocabulario_slug/practicar',
    name: 'PracticarVoc',
    component: PracticarVoc
  },
  // {
  //   path: '/admin/login',
  //   name: 'LoginAdmin',
  //   component: LoginAdmin
  // },
  {
    path: '/admin/vocabularios',
    name: 'AdminVocab',
    component: AdminVocab
  },
  {
    path: '/admin/vocabularios/:vocabulario_slug',
    name: 'AdminPalabras',
    component: AdminPalabras
  },
]

const router = new VueRouter({
  routes
})

export default router
