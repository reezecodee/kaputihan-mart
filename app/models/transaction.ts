import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import Rating from './rating.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Product from '#models/product'

export default class Transaction extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @hasOne(() => Rating, {
    foreignKey: 'transaksi_id',
  })
  declare store: HasOne<typeof Rating>

  @beforeCreate()
  public static assignUuid(transaction: Transaction) {
    transaction.id = uuidv4()
  }

  @column()
  declare pengguna_id: string

  @belongsTo(() => User, {
    foreignKey: 'pengguna_id',
  })
  declare user: BelongsTo<typeof User>

  @column()
  declare produk_id: string

  @belongsTo(() => Product, {
    foreignKey: 'produk_id',
  })
  declare product: BelongsTo<typeof Product>

  @column()
  declare jumlah_beli: number

  @column()
  declare status: 'Dalam proses' | 'Dalam pengiriman' | 'Selesai' | 'Dibatalkan'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
