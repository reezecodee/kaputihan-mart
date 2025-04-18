import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilesController {
  public profile({ view, session }: HttpContext) {
    view.share({
      title: 'Profile Saya',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/profile/index')
  }

  public async updateProfile() {}
  public async updatePassword() {}
}
