import type { HttpContext } from '@adonisjs/core/http'

export default class SettingsController {
  public setting({ view }: HttpContext) {
    view.share({
      title: 'Pengaturan Aplikasi',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/setting/index')
  }
}
