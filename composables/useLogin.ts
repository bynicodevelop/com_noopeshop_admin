type LoginResponse = {
  token: string;
  type: string;
}

type CredentialReponse = {
  credentials: LoginResponse
}

export const useLogin = () => {
  const router = useRouter()

  const email = ref('')
  const password = ref('')

  const submit = async () => {
    const { API_ENTRYPOINT } = useRuntimeConfig()

    const authCookies = useCookie('auth', {
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
      secure: true
    })

    const response = await useFetch(`${API_ENTRYPOINT}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const { credentials: { token, type } } = response.data.value as CredentialReponse

    authCookies.value = JSON.stringify({
      token,
      type
    })

    router.push({ path: '/' })
  }

  onMounted(() => {
    // if development mode, fill the form
    if (process.env.NODE_ENV === 'development') {
      email.value = 'john@domain.tld'
      password.value = '123456'
    }
  })

  return {
    email,
    password,
    submit
  }
}
