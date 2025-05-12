import Help from '#models/help'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class HelpsController {
  /**
   * Fungsi untuk menampilkan halaman pusat bantuan
   */
  public async help({ view, auth }: HttpContext) {
    const profile = await User.findOrFail(auth.user?.id)

    view.share({
      title: 'Pusat Bantuan',
      helps: await Help.query()
        .select(['id', 'judul', 'status', 'created_at'])
        .where('pengguna_id', profile.id)
        .limit(10),
    })

    return view.render('pages/user/help')
  }

  /**
   * Fungsi untuk menampilkan halaman detail laporan bantuan
   */
  public async helpDetail({ view, params }: HttpContext) {
    view.share({
      title: 'Detail Bantuan',
      help: await Help.query()
        .select(['judul', 'penjelasan', 'lampiran', 'status', 'created_at'])
        .where('id', params.id)
        .first(),
    })

    return view.render('pages/user/help-detail')
  }
}
