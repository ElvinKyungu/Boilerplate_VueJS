// guards.ts
import { useUserStore } from '@/stores/userStore'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

export function isAuthenticated(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext
): void {
  const userStore = useUserStore()
  userStore.restoreUserData()
  console.log('Route de départ:', from)
  console.log('Route d\'arrivée:', to)

  if (userStore.access_token) {
    console.log(userStore.access_token)
    console.log("User exist")
    next()
  } else {
    next('/auth')
    console.log("User not exist");
  }
}