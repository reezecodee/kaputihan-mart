import type { HttpContext } from '@adonisjs/core/http'

export default class AboutController {
  public about({ view }: HttpContext) {
    view.share({
      title: 'Tentang Kami',
    })

    return view.render('pages/user/about')
  }
}
