import Rating from '#models/rating'
import Transaction from '#models/transaction'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  public static environment = ['development', 'testing']

  async run() {
    const transactions = await Transaction.query().select(['id'])

    const transactionIds = transactions.map((transaction) => transaction.id)

    await Rating.createMany([
      {
        transaksi_id: transactionIds[0],
        komentar: 'Pisangnya sangat enak dan cocok untuk cemilan',
        rating: 5,
      },
      {
        transaksi_id: transactionIds[1],
        komentar: 'Pisangnya sangat enak dan cocok untuk cemilan',
        rating: 4,
      },
    ])
  }
}
