import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async home(ctx: HttpContext) {
    return ctx.view.render('pages/user/index')
  }
}
