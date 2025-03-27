import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  public product({ view }: HttpContext) {
    view.share({
      title: 'Detail Produk',
    })

    return view.render('pages/user/product')
  }
}
