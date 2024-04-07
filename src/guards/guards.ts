// guards.ts
import { useUserStore } from '@/stores/userStore'
import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function isAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const userStore = useUserStore()
  userStore.restoreUserData()
  console.log('Route de départ:', from)
  console.log('Route d\'arrivée:', to)

  if (userStore.token) {
    next()
  } else {
    next('/auth')
  }
}