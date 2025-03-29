import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoryDatatablesController {
  public async categoryDatatable({ request, response }: HttpContext) {
    const page = request.input('start', 0) / request.input('length', 10) + 1
    const length = request.input('length', 10)
    const searchValue = request.input('search[value]', '')
    const orderColumn = request.input('order[0][column]', 'id')
    const orderDirection = request.input('order[0][dir]', 'asc')

    const columns: string[] = ['id', 'nama_kategori', 'created_at']

    const query = Category.query()

    if (searchValue) {
      query.where((builder) => {
        columns.forEach((column) => {
          builder.orWhere(column, 'LIKE', `%${searchValue}%`)
        })
      })
    }

    query.orderBy(columns[orderColumn], orderDirection)

    const categories = await query.paginate(page, length)

    return response.json({
      draw: request.input('draw'),
      recordsTotal: categories.total,
      recordsFiltered: categories.total,
      data: categories.all().map((category) => ({
        id: category.id,
        nama_kategori: category.nama_kategori,
        created_at: category.createdAt,
      })),
    })
  }
}
