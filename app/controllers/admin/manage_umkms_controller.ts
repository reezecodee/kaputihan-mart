import type { HttpContext } from '@adonisjs/core/http'

export default class ManageUmkmsController {
  public store({ view }: HttpContext) {
    view.share({
      title: 'Daftar Toko UMKM',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-umkm/list/store')
  }

  public product({ view }: HttpContext) {
    view.share({
      title: 'Daftar Produk UMKM',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-umkm/list/product')
  }

  public category({ view }: HttpContext) {
    view.share({
      title: 'Daftar Kategori Produk',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/manage-umkm/list/category')
  }
}
