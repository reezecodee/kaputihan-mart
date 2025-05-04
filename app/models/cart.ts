import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import User from '#models/user'
import Product from '#models/product'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Cart extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(cart: Cart) {
    cart.id = uuidv4()
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
  declare jumlah: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
