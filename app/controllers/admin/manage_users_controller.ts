import User from '#models/user'
import { createEditSellerValidator } from '#validators/edit_seller'
import { createUserValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import { type HttpContext } from '@adonisjs/core/http'

export default class ManageUsersController {
  /**
   * Fungsi untuk menampilkan halaman daftar admin
   */
  public admin({ view, session }: HttpContext) {
    view.share({
      title: 'Daftar Admin',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Admin',
      },
    })

    return view.render('pages/admin/manage-user/list/admin')
  }

  /**
   * Fungsi untuk menampilkan halaman daftar pengguna
   */
  public user({ session, view }: HttpContext) {
    view.share({
      title: 'Daftar Pengguna',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: false,
      headerData: {},
    })

    return view.render('pages/admin/manage-user/list/user')
  }

  /**
   * Fungsi untuk menyimpan data pengguna
   */
  public async store({ request, params, session, response }: HttpContext) {
    const role =
      params.role === 'Admin' || params.role === 'Seller' || params.role === 'User'
        ? params.role
        : 'User'
    const payload = await request.validateUsing(createUserValidator)

    try {
      let fileName: string | null = null

      if (role === 'User' || role === 'Seller') {
        if (payload.foto) {
          fileName = `${cuid()}.${payload.foto.extname}`
          await payload.foto.move('public/uploads/foto_profil', { name: fileName })
        }
      }

      const userData = {
        ...payload,
        foto: fileName,
        role,
      }

      await User.create(userData)

      session.flash('success', { message: `Berhasil menambahkan ${role} baru.` })
      return response.redirect().back()
    } catch (error) {
      session.flash('failed', {
        message: `Gagal menambahkan ${role} baru. Periksa kembali input Anda.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk menghapus data pengguna
   */
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
