import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('pengguna_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
      table
        .uuid('produk_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
      table.integer('jumlah').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
