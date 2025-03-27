import type { HttpContext } from '@adonisjs/core/http'

export default class ManageUsersController {
  public admin({ view }: HttpContext) {
    view.share({
      title: 'Daftar Admin',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-user/list/admin')
  }

  public user({ view }: HttpContext) {
    view.share({
      title: 'Daftar Pengguna',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-user/list/user')
  }

  public seller({ view }: HttpContext) {
    view.share({
      title: 'Daftar Penjual UMKM',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-user/list/seller')
  }
}
