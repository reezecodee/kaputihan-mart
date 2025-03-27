import type { HttpContext } from '@adonisjs/core/http'

export default class StoreProfilesController {
  public storeProfile({ view }: HttpContext) {
    view.share({
      title: 'Profile Toko UMKM',
    })

    return view.render('pages/user/store-profile')
  }
}
