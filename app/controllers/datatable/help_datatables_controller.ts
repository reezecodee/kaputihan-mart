import Help from '#models/help'
import type { HttpContext } from '@adonisjs/core/http'

export default class HelpDatatablesController {
  public async helpDatatable({ request, response }: HttpContext) {
    const page = request.input('start', 0) / request.input('length', 10) + 1
    const length = request.input('length', 10)
    const searchValue = request.input('search[value]', '')
    const orderColumn = request.input('order[0][column]', 'id')
    const orderDirection = request.input('order[0][dir]', 'asc')

    const columns: string[] = ['id', 'nama_pengguna', 'judul', 'status', 'created_at']

    const query = Help.query().preload('user')

    if (searchValue) {
      query.where((builder) => {
        columns.forEach((column) => {
          builder.orWhere(column, 'LIKE', `%${searchValue}%`)
        })
      })
    }

    query.orderBy(columns[orderColumn], orderDirection)

    const helps = await query.paginate(page, length)

    return response.json({
      draw: request.input('draw'),
      recordsTotal: helps.total,
      recordsFiltered: helps.total,
      data: helps.all().map((help) => ({
        id: help.id,
        nama_pengguna: help.user?.nama,
        judul: help.judul,
        status: help.status,
      })),
    })
  }
}
