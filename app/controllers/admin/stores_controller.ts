import Store from '#models/store'
import User from '#models/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoresController {
  /**
   * Fungsi untuk menampilkan daftar toko
   */
  public async store({ view, session }: HttpContext) {
    view.share({
      title: 'Daftar Toko UMKM',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Toko',
      },
      owners: await User.query().where('role', 'Seller').doesntHave('store'),
    })

    return view.render('pages/admin/manage-umkm/list/store')
  }

  /**
   * Fungsi untuk menampilkan halaman edit toko
   */
  public async editStore({ view, session, params }: HttpContext) {
    view.share({
      title: 'Edit Toko UMKM',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnBack: true,
      headerData: {
        btnTitle: 'Kembali',
      },
      url: '/admin/kelola-umkm/toko',
      store: await Store.findOrFail(params.id),
    })

    return view.render('pages/admin/manage-umkm/edit/edit-store')
  }

  /**
   * Fungsi untuk menyimpan data toko
   */
  public async storeStore({ session, request, response }: HttpContext) {}

  /**
   * Fungsi untuk memperbarui data toko
   */
  public async updateStore() {}

  /**
   * Fungsi untuk menghapus data toko
   */
  public async deleteStore() {}
}
