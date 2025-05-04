import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ratings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table
        .uuid('transaksi_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('transactions')
        .onDelete('CASCADE')
      table.text('komentar').nullable()
      table.enum('rating', [1, 2, 3, 4, 5]).notNullable()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
