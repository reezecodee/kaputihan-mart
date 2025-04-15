import Category from '#models/category'
import Store from '#models/store'
import User from '#models/user'
import { createCategoryValidator } from '#validators/category'
import { createStoreValidator } from '#validators/store'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class ManageUmkmsController {
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

  public product({ view, session }: HttpContext) {
    view.share({
      title: 'Daftar Produk UMKM',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Produk',
      },
    })

    return view.render('pages/admin/manage-umkm/list/product')
  }

  public category({ session, view }: HttpContext) {
    view.share({
      title: 'Daftar Kategori Produk',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Kategori',
      },
    })

    return view.render('pages/admin/manage-umkm/list/category')
  }

  public async storeCategory({ session, request, response }: HttpContext) {
    const payload = await request.validateUsing(createCategoryValidator)

    try {
      await Category.create(payload)

      session.flash('success', { message: `Berhasil menambahkan kategori baru.` })
      return response.redirect().back()
    } catch (error) {
      session.flash('failed', {
        message: `Gagal menambahkan kategori baru. Periksa kembali input Anda.`,
      })

      return response.redirect().back()
    }
  }

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

      session.flash('success', { message: `Berhasil menambahkan kategori baru.` })
      return response.redirect().back()
    } catch (error) {
      session.flash('failed', {
        message: `Gagal menambahkan kategori baru. Periksa kembali input Anda.`,
      })

      return response.redirect().back()
    }
  }

  public async destroyCategory({ params, session, response }: HttpContext) {
    try {
      const category = await Category.findOrFail(params.id)
      await category.delete()

      session.flash('success', { message: 'Berhasil menghapus data kategori produk' })

      return response.redirect().back()
    } catch (error) {
      session.flash('failed', { message: 'Gagal menghapus data kategori produk' })
      return response.redirect().back()
    }
  }
}
