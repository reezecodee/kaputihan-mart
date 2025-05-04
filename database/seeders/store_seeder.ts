import Store from '#models/store'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Store.createMany([
      {
        nama_toko: 'Toko Pisang Pak Slamet',
        deskripsi: 'Menyediakan pisang berkualitas dari kebun terbaik di Tasikmalaya',
        alamat: 'Jl. Tanuwijaya, Empang Sari, Tawang, Kota Tasikmalaya, Jawa Barat',
        no_telepon: '081298897000',
        email: 'pakslamet@gmail.com',
        status: 'Aktif',
      },
      {
        nama_toko: 'Toko Sayuran Pak Budi',
        deskripsi: 'Menyediakan sayuran berkualitas dari kebun terbaik di Tasikmalaya',
        alamat: 'Jl. Tanuwijaya, Empang Sari, Tawang, Kota Tasikmalaya, Jawa Barat',
        no_telepon: '081298897001',
        email: 'pakbudi@gmail.com',
        status: 'Aktif',
      },
      {
        nama_toko: 'Toko Manggis Pak Ambajat',
        deskripsi: 'Menyediakan manggis berkualitas dari kebun terbaik di Tasikmalaya',
        alamat: 'Jl. Tanuwijaya, Empang Sari, Tawang, Kota Tasikmalaya, Jawa Barat',
        no_telepon: '081298897002',
        email: 'pakambajat@gmail.com',
        status: 'Nonaktif',
      },
    ])
  }
}
