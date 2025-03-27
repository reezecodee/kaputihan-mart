import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  async dashboard(ctx: HttpContext) {
    return ctx.view.render('pages/admin/dashboard/index')
  }
}
