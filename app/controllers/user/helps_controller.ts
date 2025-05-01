import Help from '#models/help'
import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class HelpsController {
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

  public helpDetail({ view }: HttpContext) {
    view.share({
      title: 'Detail Bantuan',
    })

    return view.render('pages/user/help-detail')
  }
}
