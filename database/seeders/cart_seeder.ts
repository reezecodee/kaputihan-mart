import Cart from '#models/cart'
import Product from '#models/product'
import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    const users = await User.query().select(['id']).where('role', 'User')
    const products = await Product.query().select(['id'])

    const userIds = users.map((user) => user.id)
    const productIds = products.map((product) => product.id)

    await Cart.createMany([
      {
        pengguna_id: userIds[0],
        produk_id: productIds[0],
        jumlah: 10,
      },
      {
        pengguna_id: userIds[0],
        produk_id: productIds[1],
        jumlah: 10,
      },
    ])
  }
}
