import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  /**
   * hanya Super Admin yang bisa menentukan Admin Chat
   */
  editAdminChat(user: User): AuthorizerResponse {
    if (user.role === 'Super Admin') {
      return true
    }

    return false
  }
}
