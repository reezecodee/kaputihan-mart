import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'
import Transaction from '#models/transaction'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Rating extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(rating: Rating) {
    rating.id = uuidv4()
  }

  @column()
  declare transaksi_id: string

  @belongsTo(() => Transaction, {
    foreignKey: 'transaksi_id',
  })
  declare transaction: BelongsTo<typeof Transaction>

  @column()
  declare komentar: string

  @column()
  declare rating: 1 | 2 | 3 | 4 | 5

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
