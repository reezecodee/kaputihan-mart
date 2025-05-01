import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
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

  public async productDetail({ view }: HttpContext) {
    view.share({
      title: 'Detail Produk',
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
