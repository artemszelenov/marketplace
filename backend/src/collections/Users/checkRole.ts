import type { User } from '@/payload-types'

export const checkRole = (allRoles: User['roles'] = [], user?: User): boolean => {
  if (user) {
    if (allRoles.some(role => {
      if (Array.isArray(user?.roles)) {
        return user?.roles.some(individualRole => {
          return individualRole === role
        })
      }
      return user?.roles === role
    })) {
      return true
    }
  }

  return false
}