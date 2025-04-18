import Category from '#models/category'
import Product from '#models/product'
import Store from '#models/store'
import { createProductValidator } from '#validators/product'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  public async product({ view, session }: HttpContext) {
    view.share({
      title: 'Daftar Produk UMKM',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Produk',
      },
      stores: await Store.query().exec(),
      categories: await Category.query().exec(),
    })

    return view.render('pages/admin/manage-umkm/list/product')
  }

  public async editProduct({ view, session, params }: HttpContext) {
    view.share({
      title: 'Edit Produk UMKM',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnBack: true,
      headerData: {
        btnTitle: 'Kembali',
      },
      url: '/admin/kelola-umkm/produk',
      product: await Product.query().where('slug', params.slug).firstOrFail(),
      categories: await Category.query().exec(),
    })

    return view.render('pages/admin/manage-umkm/edit/edit-product')
  }

  public async storeProduct({ session, request, response }: HttpContext) {
    const payload = await request.validateUsing(createProductValidator)

    try {
      let fileName: string | null = null

      if (payload.foto_produk) {
        fileName = `${cuid()}.${payload.foto_produk.extname}`
        await payload.foto_produk.move('public/uploads/foto_produk', { name: fileName })
      }

      await Product.create({
        foto_produk: fileName ?? undefined,
        toko_id: payload.toko_id,
        kategori_id: payload.kategori_id,
        nama_produk: payload.nama_produk,
        deskripsi: payload.deskripsi,
        harga: payload.harga,
        stok: payload.stok,
        status: 'Disetujui',
      })

      session.flash('success', { message: `Berhasil menambahkan produk baru.` })
      return response.redirect().back()
    } catch (error) {
      session.flash('failed', {
        message: `Gagal menambahkan produk baru. Periksa kembali input Anda.`,
      })

      return response.redirect().back()
    }
  }

  public async updateProduct() {}
}
