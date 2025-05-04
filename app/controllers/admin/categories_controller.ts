import Category from '#models/category'
import { createCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Fungsi untuk menampilkan halaman daftar kategori.
   */
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

  /**
   * Fungsi untuk menampilkan halaman edit kategori
   */
  public async editCategory({ view, session, params }: HttpContext) {
    view.share({
      title: 'Edit Kategori Produk',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnBack: true,
      headerData: {
        btnTitle: 'Kembali',
      },
      url: '/admin/kelola-umkm/kategori',
      category: await Category.findOrFail(params.id),
    })

    return view.render('pages/admin/manage-umkm/edit/edit-category')
  }

  /**
   * Fungsi untuk menyimpan kategori baru
   */
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

  /**
   * Fungsi untuk memperbarui kategori
   */
  public async updateCategory() {}

  /**
   * Fungsi untuk menghapus kategori
   */
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
