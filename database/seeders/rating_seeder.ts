import Rating from '#models/rating'
import Transaction from '#models/transaction'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const transactions = await Transaction.query().select(['id'])

    await Rating.createMany([
      {
        transaksi_id: transactions[0].id,
        komentar: 'Pisangnya sangat enak dan cocok untuk cemilan',
        rating: 5,
      },
      {
        transaksi_id: transactions[1].id,
        komentar: 'Pisangnya sangat enak dan cocok untuk cemilan',
        rating: 4,
      },
    ])
  }
}
