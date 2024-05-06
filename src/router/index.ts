import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import auth from '@/views/auth.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/welcome.vue'
import { isAuthenticated } from '@/guards/guards'
import EmailConfirmation from '@/views/EmailConfirmation.vue'
import Profile from '@/views/profile.vue'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: isAuthenticated
  },
  {
    path: '/profile',
    name: 'profile',
    component: Profile,
    beforeEnter: isAuthenticated
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/notFound.vue')
  },
  {
    path: '/EmailConfirmation',
    name: 'EmailConfirmation',
    component: EmailConfirmation
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