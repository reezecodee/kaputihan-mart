import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  public category({ view }: HttpContext) {
    view.share({
      title: 'Produk dengan Kategori',
    })

    return view.render('pages/user/category')
  }
}
