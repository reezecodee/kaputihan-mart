import Product from '#models/product'
import Transaction from '#models/transaction'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const users = await User.query().select(['id'])
    const products = await Product.query().select(['id'])

    await Transaction.createMany([
      {
        pengguna_id: users[2].id,
        produk_id: products[0].id,
        jumlah_beli: 2,
        status: 'Dalam proses',
      },
      {
        pengguna_id: users[2].id,
        produk_id: products[1].id,
        jumlah_beli: 2,
        status: 'Dalam pengiriman',
      },
      {
        pengguna_id: users[2].id,
        produk_id: products[2].id,
        jumlah_beli: 2,
        status: 'Dibatalkan',
      },
      {
        pengguna_id: users[2].id,
        produk_id: products[3].id,
        jumlah_beli: 2,
        status: 'Selesai',
      },
    ])
  }
}
