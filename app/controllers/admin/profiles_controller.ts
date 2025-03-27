import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  public profile({ view }: HttpContext) {
    view.share({
      title: 'Profile Saya',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/profile/index')
  }
}
