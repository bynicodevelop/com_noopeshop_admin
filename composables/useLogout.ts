export const useLogout = () => {
  const router = useRouter()

  const onLogout = () => {
    const authCookies = useCookie('auth', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: true
    })

    authCookies.value = null

    router.push({ path: '/login' })
  }

  return {
    onLogout
  }
}
