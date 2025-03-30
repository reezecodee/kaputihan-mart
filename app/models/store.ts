import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Product from '#models/product'
import { v4 as uuidv4 } from 'uuid'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(store: Store) {
    store.id = uuidv4()
  }

  @column()
  declare penjual_id: string

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'penjual_id',
  })
  declare user: BelongsTo<typeof User>

  @hasMany(() => Product, {
    localKey: 'id',
    foreignKey: 'toko_id',
  })
  declare product: HasMany<typeof Product>

  @column()
  declare nama_toko: string

  @column()
  declare deskripsi: string

  @column()
  declare foto_toko: string

  @column()
  declare status: 'Aktif' | 'Nonaktif'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
