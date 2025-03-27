import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  async home({ view }: HttpContext) {
    view.share({
      title: 'Selamat Datang di Toko UMKM Desa Kaputihan',
    })

    return view.render('pages/user/index')
  }
}
