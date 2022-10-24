export default defineNuxtRouteMiddleware((to, from) => {
  const authCookies = useCookie('auth', {
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
    secure: true
  })

  const { path } = to

  if (!authCookies.value) {
    if (path !== '/login') {
      return navigateTo('/login')
    }
  }

  if (authCookies.value) {
    const { token } = authCookies.value

    if (path !== '/login' && !token) {
      return navigateTo('/login')
    }

    if (path === '/login' && token) {
      return navigateTo('/')
    }
  }

  return true
})
