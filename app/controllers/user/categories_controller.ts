import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'

export default class CategoriesController {
  /**
   * Fungsi untuk menampilkan produk dengan kategori yang dipilih
   */
  public async categoryList({ view }: HttpContext) {
    view.share({
      title: 'Produk dengan Kategori',
      categories: await Category.query().select(['id', 'nama_kategori', 'foto_kategori']),
    })

    return view.render('pages/user/category-list')
  }
}
