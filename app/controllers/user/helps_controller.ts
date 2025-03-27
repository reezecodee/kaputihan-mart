import type { HttpContext } from '@adonisjs/core/http'

export default class HelpsController {
  public help({ view }: HttpContext) {
    view.share({
      title: 'Pusat Bantuan',
    })

    return view.render('pages/user/help')
  }
}
