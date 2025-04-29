import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  public productList({ view }: HttpContext) {
    view.share({
      title: 'Daftar Produk',
    })

    return view.render('pages/user/product-list')
  }

  public productDetail({ view }: HttpContext) {
    view.share({
      title: 'Detail Produk',
    })

    return view.render('pages/user/product-detail')
  }
}
