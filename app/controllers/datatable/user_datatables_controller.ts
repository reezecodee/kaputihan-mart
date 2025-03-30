import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UserDatatablesController {
  public async userDatatable({ params, request, response }: HttpContext) {
    const page = request.input('start', 0) / request.input('length', 10) + 1
    const length = request.input('length', 10)
    const searchValue = request.input('search[value]', '')
    const orderColumn = request.input('order[0][column]', 'id')
    const orderDirection = request.input('order[0][dir]', 'asc')

    const columns: string[] = ['id', 'nama', 'email', 'telepon', 'alamat']

    const query = User.query().where('role', params.role)

    if (searchValue) {
      query.where((builder) => {
        columns.forEach((column) => {
          builder.orWhere(column, 'LIKE', `%${searchValue}%`)
        })
      })
    }

    query.orderBy(columns[orderColumn], orderDirection)

    const users = await query.paginate(page, length)

    return response.json({
      draw: request.input('draw'),
      recordsTotal: users.total,
      recordsFiltered: users.total,
      data: users.all().map((user) => ({
        id: user.id,
        nama: user.nama,
        email: user.email,
        telepon: user.telepon,
        alamat: user.alamat,
      })),
    })
  }
}
