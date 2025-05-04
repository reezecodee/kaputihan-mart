import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Fungsi untuk menampilkan halaman daftar produk
   */
  public async productList({ view }: HttpContext) {
    view.share({
      title: 'Daftar Produk',
      latestProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Disetujui')
        .preload('category')
        .orderBy('created_at', 'asc')
        .limit(10),
    })

    return view.render('pages/user/product-list')
  }

  /**
   * Fungsi untuk menampilkan halaman detail produk
   */
  public async productDetail({ view, params }: HttpContext) {
    view.share({
      title: 'Detail Produk',
      product: await Product.query()
        .select([
          'nama_produk',
          'deskripsi',
          'foto_produk',
          'harga',
          'stok',
          'toko_id',
          'kategori_id',
        ])
        .where('slug', params.slug)
        .preload('store')
        .firstOrFail(),
      latestProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Disetujui')
        .preload('category')
        .orderBy('created_at', 'asc')
        .limit(10),
    })

    return view.render('pages/user/product-detail')
  }
}
