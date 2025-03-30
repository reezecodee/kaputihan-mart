import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Store from '#models/store'
import Category from '#models/category'
import { v4 as uuidv4 } from 'uuid'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuidv4()
  }

  @belongsTo(() => Store, {
    localKey: 'id',
    foreignKey: 'toko_id',
  })
  declare store: BelongsTo<typeof Store>

  @belongsTo(() => Category, {
    localKey: 'id',
    foreignKey: 'kategori_id',
  })
  declare category: BelongsTo<typeof Category>

  @column()
  declare nama_produk: string

  @column()
  declare slug: string

  @column()
  declare deskripsi: string

  @column()
  declare foto_produk: string

  @column()
  declare harga: string

  @column()
  declare stok: 'Tersedia' | 'Tidak tersedia'

  @column()
  declare status: 'Disetujui' | 'Ditolak'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
