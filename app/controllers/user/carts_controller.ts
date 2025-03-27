import type { HttpContext } from '@adonisjs/core/http'

export default class CartsController {
  public cart({ view }: HttpContext) {
    view.share({
      title: 'Keranjang Saya',
    })

    return view.render('pages/user/cart')
  }
}
