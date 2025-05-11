import Transaction from '#models/transaction'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class TransactionsController {
  public async transaction({ view, auth }: HttpContext) {
    const profile = await User.findOrFail(auth.user?.id)

    view.share({
      title: 'Riwayat Transaksi',
      transactions: await Transaction.query()
        .select(['id', 'produk_id', 'jumlah_beli', 'status', 'created_at'])
        .where('pengguna_id', profile.id)
        .preload('product'),
    })

    return view.render('pages/user/transaction')
  }

  public async transactionDetail({ view, params }: HttpContext) {
    view.share({
      title: 'Detail Riwayat Transaksi',
      transaction: await Transaction.findOrFail(params.id),
    })

    return view.render('pages/user/transaction-detail')
  }
}
