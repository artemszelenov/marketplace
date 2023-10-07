interface CreateParams {
  email: string
  password: string
  passwordConfirm: string
  name?: string
}

const create = async ({ email, password, passwordConfirm, name }: CreateParams) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/users`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        passwordConfirm,
        name
      })
    });

    if (res.ok) {
      return (await res.json());
    } else {
      throw new Error('Invalid user creation')
    }
  } catch (e) {
    throw new Error('An error occurred while attempting to login.')
  }
}

interface LoginParams {
  email: string
  password: string
}

const login = async ({ email, password }: LoginParams) => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      }),
    })

    if (res.ok) {
      const { user, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      return user
    }

    throw new Error('Invalid login')
  } catch (e) {
    throw new Error('An error occurred while attempting to login.')
  }
}

const logout = async () => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('An error occurred while attempting to logout.')
    }
  } catch (e) {
    throw new Error('An error occurred while attempting to logout.')
  }
}

const me = async () => {
  try {
    const res = await fetch(`${import.meta.env.PUBLIC_BACKEND_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      const json = await res.json()
      console.log(json)
      return json
    } else {
      throw new Error('An error occurred while fetching your account.')
    }
  } catch (e) {
    throw new Error('An error occurred while fetching your account.')
  }
}

export { me, create, login, logout }
