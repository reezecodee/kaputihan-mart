import Category from '#models/category'
import { createCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class ManageUmkmsController {
  public store({ view }: HttpContext) {
    view.share({
      title: 'Daftar Toko UMKM',
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Toko',
      },
    })

    return view.render('pages/admin/manage-umkm/list/store')
  }

  public product({ view }: HttpContext) {
    view.share({
      title: 'Daftar Produk UMKM',
      pageHeader: true,
      headerData: {},
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
