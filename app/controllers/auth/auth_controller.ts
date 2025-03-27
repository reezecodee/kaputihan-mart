import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login(ctx: HttpContext) {
    return ctx.view.render('pages/auth/login')
  }
}
