import Category from '#models/category'
import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class HomeController {
  /**
   * Fungsi untuk menampilkan halaman home pada aplikasi
   */
  async home({ view }: HttpContext) {
    view.share({
      title: 'Selamat Datang di Toko UMKM Desa Kaputihan',
      allCategories: await Category.query()
        .select(['id', 'nama_kategori', 'foto_kategori'])
        .limit(10),
      latestProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Tersedia')
        .where('stok', '>', 0)
        .preload('category')
        .orderBy('created_at', 'asc')
        .limit(10),
    })

    return view.render('pages/user/index')
  }
}
