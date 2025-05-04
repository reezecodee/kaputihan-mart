import Product from '#models/product'
import Transaction from '#models/transaction'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    const users = await User.query().select(['id'])
    const products = await Product.query().select(['id'])

    const userIds = users.map((user) => user.id)
    const productIds = products.map((product) => product.id)

    await Transaction.createMany([
      {
        pengguna_id: userIds[2],
        produk_id: productIds[0],
        jumlah_beli: 2,
        status: 'Dalam proses',
      },
      {
        pengguna_id: userIds[2],
        produk_id: productIds[1],
        jumlah_beli: 2,
        status: 'Dalam pengiriman',
      },
      {
        pengguna_id: userIds[2],
        produk_id: productIds[2],
        jumlah_beli: 2,
        status: 'Dibatalkan',
      },
      {
        pengguna_id: users[2]?.id,
        produk_id: productIds[3],
        jumlah_beli: 2,
        status: 'Selesai',
      },
    ])
  }
}
