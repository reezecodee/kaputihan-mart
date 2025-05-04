import Help from '#models/help'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    const users = await User.query().select(['id']).where('role', 'User')
    const userIds = users.map((user) => user.id)

    await Help.createMany([
      {
        pengguna_id: userIds[0],
        judul: 'Pesanan saya terlalu lama di perjalanan',
        penjelasan: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        lampiran: 'foto_laporan/contoh.jpg',
        status: 'Diproses',
      },
      {
        pengguna_id: userIds[0],
        judul: 'Saya ingin membatalkan pesanan saya',
        penjelasan: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        lampiran: 'foto_laporan/contoh.jpg',
        status: 'Ditutup',
      },
      {
        pengguna_id: userIds[0],
        judul: 'Bagaimana cara me-retur pake yang rusak',
        penjelasan: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
        lampiran: 'foto_laporan/contoh.jpg',
        status: 'Selesai',
      },
    ])
  }
}
