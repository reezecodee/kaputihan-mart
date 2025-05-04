import Category from '#models/category'
import Product from '#models/product'
import Store from '#models/store'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    const stores = await Store.query().select(['id']).where('status', 'Aktif')
    const categories = await Category.query().select(['id'])

    const storeIds = stores.map((store) => store.id)
    const categoryIds = categories.map((category) => category.id)

    await Product.createMany([
      {
        toko_id: storeIds[0],
        kategori_id: categoryIds[1],
        nama_produk: 'Pisang Asem Tanpa Biji',
        slug: 'pisang-asem-tanpa-biji',
        deskripsi:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        foto_produk: '/foto_produk/contoh.jpg',
        harga: 200000,
        status: 'Tersedia',
        stok: 200,
      },
      {
        toko_id: storeIds[0],
        kategori_id: categoryIds[1],
        nama_produk: 'Pisang Ambon Budidaya Desa Kaputihan',
        slug: 'pisang-ambon-budidaya-desa-kaputihan',
        deskripsi:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        foto_produk: '/foto_produk/contoh.jpg',
        harga: 200000,
        status: 'Tersedia',
        stok: 200,
      },
      {
        toko_id: storeIds[1],
        kategori_id: categoryIds[0],
        nama_produk: 'Sayur Kangkung Budidaya Desa Kaputihan',
        slug: 'sayur-kangkung-budidaya-desa-kaputihan',
        deskripsi:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        foto_produk: '/foto_produk/contoh.jpg',
        harga: 20000,
        status: 'Tersedia',
        stok: 200,
      },
      {
        toko_id: storeIds[1],
        kategori_id: categoryIds[0],
        nama_produk: 'Wortel Budidaya Desa Kaputihan',
        slug: 'wortel-budidaya-desa-kaputihan',
        deskripsi:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        foto_produk: '/foto_produk/contoh.jpg',
        harga: 15000,
        status: 'Tersedia',
        stok: 200,
      },
    ])
  }
}
