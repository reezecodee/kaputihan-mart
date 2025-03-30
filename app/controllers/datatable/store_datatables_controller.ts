import Store from '#models/store'
import type { HttpContext } from '@adonisjs/core/http'

export default class StoreDatatablesController {
  public async storeDatatable({ request, response }: HttpContext) {
    const page = request.input('start', 0) / request.input('length', 10) + 1
    const length = request.input('length', 10)
    const searchValue = request.input('search[value]', '')
    const orderColumn = request.input('order[0][column]', 'id')
    const orderDirection = request.input('order[0][dir]', 'asc')

    const columns: string[] = ['id', 'nama_pemilik', 'nama_toko', 'status', 'created_at']

    const query = Store.query().preload('user')

    if (searchValue) {
      query.where((builder) => {
        columns.forEach((column) => {
          builder.orWhere(column, 'LIKE', `%${searchValue}%`)
        })
      })
    }

    query.orderBy(columns[orderColumn], orderDirection)

    const stores = await query.paginate(page, length)

    return response.json({
      draw: request.input('draw'),
      recordsTotal: stores.total,
      recordsFiltered: stores.total,
      data: stores.all().map((store) => ({
        id: store.id,
        nama_pemilik: store.user?.nama,
        nama_toko: store.nama_toko,
        status: store.status,
        created_at: store.createdAt,
      })),
    })
  }
}
