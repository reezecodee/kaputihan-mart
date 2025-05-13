import Product from '#models/product'
import Store from '#models/store'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreProfilesController {
  /**
   * Fungsi untuk menampilkan halaman profile toko
   */
  public async storeProfile({ view, params }: HttpContext) {
    view.share({
      title: 'Profile Toko UMKM',
      store: await Store.query()
        .select(['nama_toko', 'deskripsi', 'alamat'])
        .where('id', params.id)
        .firstOrFail(),
      storeProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Tersedia')
        .where('stok', '>', 0)
        .where('toko_id', params.id)
        .preload('category')
        .orderBy('created_at', 'asc'),
    })

    return view.render('pages/user/store-profile')
  }
}
