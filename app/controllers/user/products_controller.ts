import Product from '#models/product'
import Rating from '#models/rating'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  /**
   * Fungsi untuk menampilkan halaman daftar produk
   */
  public async productList({ view, params }: HttpContext) {
    view.share({
      title: 'Daftar Produk',
      latestProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Tersedia')
        .where('stok', '>', 0)
        .where('kategori_id', params.categoryId)
        .preload('category')
        .orderBy('created_at', 'asc'),
    })

    return view.render('pages/user/product-list')
  }

  /**
   * Fungsi untuk menampilkan halaman detail produk
   */
  public async productDetail({ view, params }: HttpContext) {
    const product = await Product.query()
      .select(['toko_id', 'kategori_id'])
      .where('slug', params.slug)
      .firstOrFail()

    const storeId = product.toko_id
    const categoryId = product.kategori_id

    const reviews = await Rating.query()
      .select(['komentar', 'rating', 'transaksi_id', 'created_at'])
      .preload('transaction', (query) => {
        query.select(['id', 'pengguna_id']).preload('user', (userQuery) => {
          userQuery.select(['id', 'nama', 'foto'])
        })
      })

    const formattedReviews = reviews.map((review) => ({
      komentar: review.komentar,
      rating: review.rating,
      waktu: review.createdAt.setLocale('id').toRelative(),
      user: review.transaction.user,
    }))

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
      storeProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Tersedia')
        .where('stok', '>', 0)
        .where('toko_id', storeId)
        .preload('category')
        .orderBy('created_at', 'asc')
        .limit(10),
      recommendedProducts: await Product.query()
        .select(['slug', 'nama_produk', 'stok', 'harga', 'foto_produk', 'kategori_id'])
        .where('status', 'Tersedia')
        .where('stok', '>', 0)
        .where('kategori_id', categoryId)
        .whereNot('toko_id', storeId)
        .preload('category')
        .orderBy('created_at', 'asc')
        .limit(10),
      reviews: formattedReviews,
    })

    return view.render('pages/user/product-detail')
  }
}
