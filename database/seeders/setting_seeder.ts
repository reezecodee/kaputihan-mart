import Setting from '#models/setting'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Setting.create({
      favicon: '/images/favicon.ico',
      logo: '/images/logo.jpg',
      nama_aplikasi: 'E-Commerce UMKM Desa Kaputihan',
      singkatan: 'ECUDK',
    })
  }
}
