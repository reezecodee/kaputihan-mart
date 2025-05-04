import type { HttpContext } from '@adonisjs/core/http'

export default class DashboardController {
  /**
   * Fungsi untuk menampilkan halaman dashboard admin & super admin
   */
  public dashboard({ view }: HttpContext) {
    view.share({
      title: 'Dashboard Admin',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/dashboard/index')
  }
}
