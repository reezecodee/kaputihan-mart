import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Product from '#models/product'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare penjualId: string

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'penjualId',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Product, {
    localKey: 'id',
    foreignKey: 'toko_id',
  })
  declare product: HasMany<typeof Product>

  @column()
  declare namaToko: string

  @column()
  declare deskripsi: string

  @column()
  declare fotoToko: string

  @column()
  declare status: 'Aktif' | 'Nonaktif'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
