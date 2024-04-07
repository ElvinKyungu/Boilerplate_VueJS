import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

import auth from '@/views/auth.vue'
import resetPassword from '@/views/forgetPassword.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import { isAuthenticated } from '@/guards/guards.ts'
import EmailConfirmationVue from '@/views/EmailConfirmationVue.vue'
import test from '@/views/test.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/notFound.vue')
  },
  {
    path: '/EmailConfirmationVue',
    name: 'EmailConfirmationVue',
    component: EmailConfirmationVue
  },
  {
    path: '/auth',
    name: 'auth',
    component: auth
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router