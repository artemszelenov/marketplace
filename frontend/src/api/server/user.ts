const create = async args => {
  try {
    const res = await fetch(`http://localhost:4000/api/users/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: args.email,
        password: args.password,
        passwordConfirm: args.passwordConfirm
      })
    })

    console.log(res)

    if (res.ok) {
      const { data, errors } = await res.json()
      if (errors) throw new Error(errors[0].message)
      console.log(data)
    } else {
      throw new Error('Invalid login')
    }
  } catch (e) {
    throw new Error('An error occurred while attempting to login.')
  }
}

const login = async args => {
  try {
    const res = await fetch(`http://localhost:4000/api/users/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: args.email,
        password: args.password,
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
    const res = await fetch(`http://localhost:4000/api/users/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      localStorage.setItem('me', '')
    } else {
      throw new Error('An error occurred while attempting to logout.')
    }
  } catch (e) {
    throw new Error('An error occurred while attempting to logout.')
  }
}

const me = async () => {
  try {
    const res = await fetch(`http://localhost:4000/api/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (res.ok) {
      return await res.json()
    } else {
      throw new Error('An error occurred while fetching your account.')
    }
  } catch (e) {
    // localStorage.setItem('me', '')
    throw new Error('An error occurred while fetching your account.')
  }
}

export { me, create, login, logout }
