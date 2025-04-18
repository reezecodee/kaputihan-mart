import Product from '#models/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductDatatablesController {
  public async productDatatable({ request, response }: HttpContext) {
    const page = request.input('start', 0) / request.input('length', 10) + 1
    const length = request.input('length', 10)
    const searchValue = request.input('search[value]', '')
    const orderColumn = request.input('order[0][column]', 'id')
    const orderDirection = request.input('order[0][dir]', 'asc')

    const columns: string[] = [
      'id',
      'slug',
      'nama_produk',
      'kategori',
      'nama_toko',
      'stok',
      'harga',
    ]

    const query = Product.query().preload('category').preload('store')

    if (searchValue) {
      query.where((builder) => {
        columns.forEach((column) => {
          builder.orWhere(column, 'LIKE', `%${searchValue}%`)
        })
      })
    }

    query.orderBy(columns[orderColumn], orderDirection)

    const products = await query.paginate(page, length)

    return response.json({
      draw: request.input('draw'),
      recordsTotal: products.total,
      recordsFiltered: products.total,
      data: products.all().map((product) => ({
        id: product.id,
        slug: product.slug,
        nama_produk: product.nama_produk,
        kategori: product.category?.nama_kategori,
        nama_toko: product.store?.nama_toko,
        stok: product.stok,
        harga: product.harga,
      })),
    })
  }
}
