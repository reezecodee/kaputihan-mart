import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class ManageUsersController {
  public admin({ view }: HttpContext) {
    view.share({
      title: 'Daftar Admin',
      pageHeader: true,
      headerData: {
        btnTitle: 'Tambah Admin',
      },
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

  public async destroy({ params, session, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      session.flash('success', { message: 'Berhasil menghapus data pengguna' })

      return response.redirect().back()
    } catch (error) {
      session.flash('failed', { message: 'Gagal menghapus data pengguna' })
      return response.redirect().back()
    }
  }
}
