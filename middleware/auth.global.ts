import { navigateTo } from '#app'
import { useAuth } from '~/composables/useAuth'

export default defineNuxtRouteMiddleware(async (to, _from) => {
  const { isLoggedIn, checkAuth } = useAuth()
  const { $auth } = useNuxtApp()

  if (!$auth) {
    return
  }
  await checkAuth()

  if (isLoggedIn.value) {
    if (to.path === '/login' || to.path === '/signup') {
      return navigateTo('/home', { replace: true })
    } else {
      return
    }
  }

  if (!isLoggedIn.value && to.path !== '/login' && to.path !== '/signup') {
    return navigateTo('/login', { replace: true })
  }
})
