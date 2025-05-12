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

  public async transactionDetail({ view, params, response, session }: HttpContext) {
    const transaction = await Transaction.query()
      .select(['id', 'produk_id', 'jumlah_beli', 'status', 'created_at'])
      .preload('product', (query) => {
        query.select(['id', 'nama_produk', 'slug', 'harga'])
      })
      .where('id', params.id)
      .first()

    if (!transaction || !transaction.product) {
      session.flash('failed', {
        type: 'alert-danger',
        message: 'Gagal menemukan produk atau transaksi',
      })
      return response.redirect().toRoute('user.transaction')
    }

    const totalPrice = transaction?.product.harga * transaction?.jumlah_beli + 5000

    view.share({
      title: 'Detail Riwayat Transaksi',
      transaction,
      totalPrice,
    })

    return view.render('pages/user/transaction-detail')
  }
}
