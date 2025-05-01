import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreProfilesController {
  public async storeProfile({ view }: HttpContext) {
    view.share({
      title: 'Profile Toko UMKM',
      latestProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Disetujui')
        .preload('category')
        .orderBy('created_at', 'asc')
        .limit(10),
    })

    return view.render('pages/user/store-profile')
  }
}
