import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Store from '#models/store'
import Category from '#models/category'

export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @belongsTo(() => Store, {
    localKey: 'uuid',
    foreignKey: 'tokoId',
  })
  declare store: BelongsTo<typeof Store>

  @belongsTo(() => Category, {
    localKey: 'uuid',
    foreignKey: 'kategoriId',
  })
  declare category: BelongsTo<typeof Category>

  @column()
  declare namaProduk: string

  @column()
  declare slug: string

  @column()
  declare deskripsi: string

  @column()
  declare fotoProduk: string

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
