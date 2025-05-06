import Category from '#models/category'
import { categoryValidator } from '#validators/category_validators/index'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class CategoriesController {
  /**
   * Fungsi untuk menampilkan halaman daftar kategori.
   */
  public category({ view }: HttpContext) {
    view.share({
      title: 'Daftar Kategori Produk',
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
  public async editCategory({ view, params }: HttpContext) {
    view.share({
      title: 'Edit Kategori Produk',
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
    try {
      const payload = await request.validateUsing(categoryValidator)
      let catgoryPhoto: string | null = null

      if (payload.foto_kategori) {
        catgoryPhoto = `${cuid()}.${payload.foto_kategori.extname}`
        await payload.foto_kategori.move('public/uploads/foto_kategori', { name: catgoryPhoto })
      }

      const category = await Category.create({
        nama_kategori: payload.nama_kategori,
        foto_kategori: catgoryPhoto,
      })

      session.flash('info', {
        type: 'alert-success',
        message: `Berhasil menambahkan kategori baru ${category.nama_kategori}.`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('info', {
        type: 'alert-danger',
        message: `Gagal menambahkan kategori baru.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk memperbarui kategori
   */
  public async updateCategory({ session, request, response, params }: HttpContext) {
    const category = await Category.findOrFail(params.id)

    try {
      const payload = await request.validateUsing(categoryValidator)
      let categoryPhoto: string | null = null

      if (payload.foto_kategori) {
        if (category.foto_kategori) {
          const oldPhotoPath = app.publicPath(`uploads/foto_kategori/${category.foto_kategori}`)
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath)
          }
        }

        categoryPhoto = `${cuid()}.${payload.foto_kategori.extname}`
        await payload.foto_kategori.move('public/uploads/foto_kategori', { name: categoryPhoto })

        category.foto_kategori = categoryPhoto
      }

      category.nama_kategori = payload.nama_kategori

      await category.save()

      session.flash('info', {
        type: 'alert-success',
        message: `Berhasil memperbarui kategori ${category.nama_kategori}.`,
      })
      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('info', {
        type: 'alert-danger',
        message: `Gagal memperbarui kategori ${category.nama_kategori}.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk menghapus kategori
   */
  public async destroyCategory({ params, session, response }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    const categoryName = category.nama_kategori

    try {
      if (category.foto_kategori) {
        const oldPhotoPath = app.publicPath(`uploads/foto_kategori/${category.foto_kategori}`)
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath)
        }
      }

      await category.delete()

      session.flash('info', {
        type: 'alert-success',
        message: `Berhasil menghapus kategori ${categoryName}.`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flash('info', {
        type: 'alert-danger',
        message: `Gagal menghapus kategori ${category.nama_kategori}`,
      })

      return response.redirect().back()
    }
  }
}
