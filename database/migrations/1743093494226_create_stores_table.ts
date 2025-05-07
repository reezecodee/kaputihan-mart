import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'stores'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nama_pemilik').notNullable()
      table.string('nama_toko').notNullable()
      table.string('deskripsi').notNullable()
      table.string('alamat').notNullable()
      table.string('no_telepon').notNullable()
      table.string('email').notNullable()
      table.enum('status', ['Aktif', 'Nonaktif']).notNullable().index()
      table.string('foto_toko').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
