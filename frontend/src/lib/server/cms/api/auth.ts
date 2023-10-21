import { BACKEND_URL } from "$env/static/private";

type CreateParams = {
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
        'Content-Type': 'application/json',
        'Accept-Language': 'ru'
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

type LoginParams = {
  email: string
  password: string
}

export const login = async ({ email, password }: LoginParams) => {
  return fetch(`${BACKEND_URL}/api/users/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Language': 'ru'
    },
    body: JSON.stringify({
      email,
      password
    }),
  });
}

export const logout = async (token: string) => {
  try {
    const res = await fetch(`${BACKEND_URL}/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`,
        'Accept-Language': 'ru'
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
        'Accept-Language': 'ru'
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
