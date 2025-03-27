import type { HttpContext } from '@adonisjs/core/http'

export default class HelpsController {
  public help({ view }: HttpContext) {
    view.share({
      title: 'Daftar Permintaan Bantuan',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-help/index')
  }
}
