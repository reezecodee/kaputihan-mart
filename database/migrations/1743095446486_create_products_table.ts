import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.uuid('toko_id').notNullable().references('id').inTable('stores').onDelete('CASCADE')
      table
        .uuid('kategori_id')
        .notNullable()
        .index()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')
      table.string('nama_produk').notNullable()
      table.string('slug').notNullable().index()
      table.text('deskripsi').notNullable()
      table.string('foto_produk').notNullable()
      table.integer('harga').notNullable()
      table.enum('status', ['Tersedia', 'Tidak tersedia']).notNullable().index()
      table.integer('stok').notNullable().index()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
