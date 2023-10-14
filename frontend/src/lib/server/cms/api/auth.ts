import { BACKEND_URL } from "$env/static/private";

interface CreateParams {
  email: string
  password: string
  passwordConfirm: string
  name: string
}

export const create = async ({ email, password, passwordConfirm, name }: CreateParams) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users`, {
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
      return res
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

export const login = async ({ email, password }: LoginParams) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/login`, {
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
      return res
    }

    throw new Error('Invalid login')
  } catch (e) {
    throw new Error('An error occurred while attempting to login.')
  }
}

export const logout = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    })

    if (res.ok) {
      return res
    } else {
      throw new Error('An error occurred while attempting to logout.')
    }
  } catch (e) {
    throw new Error('An error occurred while attempting to logout.')
  }
}

export const me = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
      },
    })

    if (res.ok) {
      return res
    } else {
      throw new Error('An error occurred while fetching your account.')
    }
  } catch (e) {
    throw new Error('An error occurred while fetching your account.')
  }
}
