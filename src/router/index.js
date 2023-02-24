import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import HomeView from '../views/HomeView.vue'
import VocabWords from '../views/VocabWords.vue'
import PracticarVoc from '../views/PracticarVoc.vue'
import AdminVocab from '../views/AdminVocab.vue'
import AdminPalabras from '../views/AdminPalabras.vue'
import LoginAdmin from '../views/LoginAdmin.vue'

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
  {
    path: '/admin/login',
    name: 'LoginAdmin',
    component: LoginAdmin
  },
  {
    path: '/admin/vocabularios',
    name: 'AdminVocab',
    component: AdminVocab,
    meta: {
      auth: true
    }
  },
  {
    path: '/admin/vocabularios/:vocabulario_slug',
    name: 'AdminPalabras',
    component: AdminPalabras,
    meta: {
      auth: true
    }
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.path == "/admin/login" && store.state.isAuthenticated) {
    next("/admin/vocabularios")
  } else if (to.matched.some(record => record.meta.auth) && !store.state.isAuthenticated) {
    next("/admin/login")
  } else {
    next()
  }
})

export default router
