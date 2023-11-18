import { BACKEND_URL } from "$env/static/private";

type CreateParams = {
  email: string
  password: string
  passwordConfirm: string
  name: string
}

export const create = async (query: typeof fetch, { email, password, passwordConfirm, name }: CreateParams) => {
  return query(`${BACKEND_URL}/api/users`, {
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
}

type LoginParams = {
  email: string
  password: string
}

export const login = async (query: typeof fetch, { email, password }: LoginParams) => {
  return query(`${BACKEND_URL}/api/users/login`, {
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

type LogoutParams = {
  token: string
}

export const logout = async (query: typeof fetch, { token }: LogoutParams) => {
  return query(`${BACKEND_URL}/api/users/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
      'Accept-Language': 'ru'
    },
  });
}

type MeParams = LogoutParams

export const me = async (query: typeof fetch, { token }: MeParams) => {
  return query(`${BACKEND_URL}/api/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `JWT ${token}`,
      'Accept-Language': 'ru'
    },
  });
}
