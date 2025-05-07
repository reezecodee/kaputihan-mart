import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('nama').nullable()
      table.string('email', 255).notNullable().unique()
      table.string('telepon').notNullable().unique()
      table.string('password').notNullable()
      table.text('alamat').nullable()
      table.string('foto').nullable()
      table.enum('role', ['Super Admin', 'Admin', 'User']).notNullable().index()
      table.enum('admin_chat', ['Ya', 'Bukan']).notNullable().index()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
