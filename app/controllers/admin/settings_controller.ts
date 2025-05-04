import type { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  /**
   * Fungsi untuk menampilkan halaman pengaturan aplikasi
   */
  public setting({ view }: HttpContext) {
    view.share({
      title: 'Pengaturan Aplikasi',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/setting/index')
  }
}
