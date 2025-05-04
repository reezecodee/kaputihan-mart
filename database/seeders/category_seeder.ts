import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    await Category.createMany([
      {
        nama_kategori: 'Sayur-sayuran',
        foto_kategori: '/foto_kategori/contoh.jpg',
      },
      {
        nama_kategori: 'Buah-buahan',
        foto_kategori: '/foto_kategori/contoh.jpg',
      },
      {
        nama_kategori: 'Makanan olahan',
        foto_kategori: '/foto_kategori/contoh.jpg',
      },
      {
        nama_kategori: 'Kerajinan tangan',
        foto_kategori: '/foto_kategori/contoh.jpg',
      },
      {
        nama_kategori: 'Makanan ringan',
        foto_kategori: '/foto_kategori/contoh.jpg',
      },
    ])
  }
}
