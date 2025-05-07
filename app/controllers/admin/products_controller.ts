import Category from '#models/category'
import Product from '#models/product'
import Store from '#models/store'
import { productValidator } from '#validators/product_validators/index'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class ProductsController {
  /**
   * Fungsi untuk menampilkan halaman daftar produk UMKM
   */
  public async product({ view, session }: HttpContext) {
    view.share({
      title: 'Daftar Produk UMKM',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Produk',
      },
      stores: await Store.query().select(['id', 'nama_toko']),
      categories: await Category.query().select(['id', 'nama_kategori']),
    })

    return view.render('pages/admin/manage-umkm/list/product')
  }

  /**
   * Fungsi untuk menampilkan halaman edit produk UMKM
   */
  public async editProduct({ view, params }: HttpContext) {
    view.share({
      title: 'Edit Produk UMKM',
      pageHeader: true,
      btnBack: true,
      headerData: {
        btnTitle: 'Kembali',
      },
      url: '/admin/kelola-umkm/produk',
      product: await Product.query().where('slug', params.slug).firstOrFail(),
      categories: await Category.query().select(['id', 'nama_kategori']),
    })

    return view.render('pages/admin/manage-umkm/edit/edit-product')
  }

  /**
   * Fungsi untuk menyimpan data produk
   */
  public async storeProduct({ request, response, session }: HttpContext) {
    try {
      const payload = await request.validateUsing(productValidator)
      let productPhoto: string | null = null

      if (payload.foto_produk) {
        productPhoto = `${cuid()}.${payload.foto_produk.extname}`
        await payload.foto_produk.move('public/uploads/foto_produk', { name: productPhoto })
      }

      const product = await Product.create({
        toko_id: payload.toko_id,
        kategori_id: payload.kategori_id,
        nama_produk: payload.nama_produk,
        slug: payload.slug,
        deskripsi: payload.deskripsi,
        foto_produk: productPhoto,
        harga: payload.harga,
        status: payload.status as 'Tersedia' | 'Tidak tersedia',
        stok: payload.stok,
      })

      session.flash('info', {
        type: 'alert-success',
        message: `Berhasil menambahkan produk baru ${product.nama_produk}.`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('info', { type: 'alert-danger', message: 'Gagal menambahkan produk baru.' })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk memperbarui data produk
   */
  public async updateProduct({ session, response, params, request }: HttpContext) {
    const product = await Product.findOrFail(params.id)

    try {
      const payload = await request.validateUsing(productValidator)
      let productPhoto: string | null = null

      if (payload.foto_produk) {
        if (payload.foto_produk) {
          const oldPhotoPath = app.publicPath(`uploads/foto_produk/${payload.foto_produk}`)
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath)
          }
        }

        productPhoto = `${cuid()}.${payload.foto_produk.extname}`
        await payload.foto_produk.move('public/uploads/foto_produk', { name: productPhoto })

        product.foto_produk = productPhoto
      }

      product.toko_id = payload.toko_id
      product.kategori_id = payload.kategori_id
      product.nama_produk = payload.nama_produk
      product.slug = payload.slug
      product.deskripsi = payload.deskripsi
      product.foto_produk = productPhoto
      product.harga = payload.harga
      product.status = payload.status as 'Tersedia' | 'Tidak tersedia'
      product.stok = payload.stok

      await product.save()

      session.flash('info', {
        type: 'alert-success',
        message: `Berhasil memperbarui produk ${product.nama_produk}.`,
      })
      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('info', {
        type: 'alert-danger',
        message: `Gagal memperbarui produk ${product.nama_produk}.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk menghapus data produk
   */
  public async deleteProduct({ session, params, response }: HttpContext) {
    const product = await Product.findOrFail(params.id)
    const productName = product.nama_produk

    try {
      if (product.foto_produk) {
        const oldPhotoPath = app.publicPath(`uploads/foto_produk/${product.foto_produk}`)
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath)
        }
      }

      await product.delete()

      session.flash('info', {
        type: 'alert-success',
        message: `Berhasil menghapus produk ${productName}.`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flash('info', {
        type: 'alert-danger',
        message: `Gagal menghapus produk ${product.nama_produk}.`,
      })

      return response.redirect().back()
    }
  }
}
