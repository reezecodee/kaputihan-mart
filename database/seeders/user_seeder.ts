import { BaseSeeder } from '@adonisjs/lucid/seeders'
import User from '#models/user'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    await User.createMany([
      {
        nama: 'Budi Budiman',
        email: 'budi@gmail.com',
        telepon: '081298897306',
        password: '12345678',
        alamat: 'Jl. Raya Banjar - Sidaharja, Tambakreja, Lakbok, Ciamis, Jawa Barat',
        role: 'Super Admin',
        admin_chat: 'Bukan',
      },
      {
        nama: 'Azfa Al Harits',
        email: 'azfa@gmail.com',
        telepon: '081298897307',
        password: '12345678',
        alamat: 'Jl. Raya Banjar - Sidaharja, Tambakreja, Lakbok, Ciamis, Jawa Barat',
        role: 'Admin',
        admin_chat: 'Ya',
      },
      {
        nama: 'Amja Semdiri',
        email: 'amja@gmail.com',
        telepon: '081298897308',
        password: '12345678',
        alamat: 'Jl. Raya Banjar - Sidaharja, Tambakreja, Lakbok, Ciamis, Jawa Barat',
        role: 'User',
        admin_chat: 'Bukan',
      },
    ])
  }
}
