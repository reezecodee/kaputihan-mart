import Store from '#models/store'
import User from '#models/user'
import { createStoreValidator } from '#validators/store'
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
  public async storeStore({ session, request, response }: HttpContext) {
    const payload = await request.validateUsing(createStoreValidator)

    try {
      let fileName: string | null = null

      if (payload.foto_toko) {
        fileName = `${cuid()}.${payload.foto_toko.extname}`
        await payload.foto_toko.move('public/uploads/foto_toko', { name: fileName })
      }

      await Store.create({
        foto_toko: fileName ?? undefined,
        penjual_id: payload.penjual_id,
        nama_toko: payload.nama_toko,
        deskripsi: payload.deskripsi,
        status: payload.status as 'Aktif' | 'Nonaktif',
      })

      session.flash('success', { message: `Berhasil menambahkan toko baru.` })
      return response.redirect().back()
    } catch (error) {
      session.flash('failed', {
        message: `Gagal menambahkan toko baru. Periksa kembali input Anda.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk memperbarui data toko
   */
  public async updateStore() {}

  /**
   * Fungsi untuk menghapus data toko
   */
  public async deleteStore() {}
}
