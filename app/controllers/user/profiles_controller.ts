import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  /**
   * Fungsi untuk menampilkan halaman profile
   */
  public profile({ view }: HttpContext) {
    view.share({
      title: 'Profile Saya',
    })

    return view.render('pages/user/profile')
  }
}
