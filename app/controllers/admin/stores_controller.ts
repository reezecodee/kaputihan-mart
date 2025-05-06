import Store from '#models/store'
import User from '#models/user'
import { storeValidator } from '#validators/store_validators/index'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

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
    try {
      const payload = await request.validateUsing(storeValidator)
      let storePhoto: string | null = null

      if (payload.foto_toko) {
        storePhoto = `${cuid}.${payload.foto_toko.extname}`
        await payload.foto_toko.move('public/uploads/foto_toko', { name: storePhoto })
      }

      const store = await Store.create({
        nama_toko: payload.nama_toko,
        deskripsi: payload.deskripsi,
        alamat: payload.alamat,
        no_telepon: payload.no_telepon,
        email: payload.email,
        status: payload.status as 'Aktif' | 'Nonaktif',
        foto_toko: storePhoto,
      })

      session.flash('success', {
        type: 'alert-success',
        message: `Berhasil menambahkan toko baru ${store.nama_toko}.`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('failed', { type: 'alert-danger', message: 'Gagal menambahkan toko baru.' })
      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk memperbarui data toko
   */
  public async updateStore({ request, response, session, params }: HttpContext) {
    const store = await Store.findOrFail(params.id)

    try {
      const payload = await request.validateUsing(storeValidator)
      let storePhoto: string | null = null

      if (payload.foto_toko) {
        if (store.foto_toko) {
          const oldPhotoPath = app.publicPath(`uploads/foto_toko/${store.foto_toko}`)
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath)
          }
        }

        storePhoto = `${cuid()}.${payload.foto_toko.extname}`
        await payload.foto_toko.move('public/uploads/foto_toko', { name: storePhoto })

        store.foto_toko = storePhoto
      }

      store.nama_toko = payload.nama_toko
      store.deskripsi = payload.deskripsi
      store.alamat = payload.alamat
      store.no_telepon = payload.no_telepon
      store.email = payload.email
      store.status = payload.status as 'Aktif' | 'Nonaktif'

      await store.save()

      session.flash('success', {
        type: 'alert-success',
        message: `Berhasil memperbarui toko ${store.nama_toko}.`,
      })
      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('failed', {
        type: 'alert-danger',
        message: `Gagal memperbarui toko ${store.nama_toko}.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk menghapus data toko
   */
  public async deleteStore({ params, session, response }: HttpContext) {
    const store = await Store.findOrFail(params.id)
    const storeName = store.nama_toko

    try {
      if (store.foto_toko) {
        const oldPhotoPath = app.publicPath(`uploads/foto_toko/${store.foto_toko}`)
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath)
        }
      }

      await store.delete()

      session.flash('success', {
        type: 'alert-success',
        message: `Berhasil menghapus toko ${storeName}`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flash('failed', {
        type: 'alert-danger',
        message: `Gagal menghapus toko ${store.nama_toko}`,
      })

      return response.redirect().back()
    }
  }
}
