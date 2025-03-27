import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Help extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @belongsTo(() => User, {
    localKey: 'uuid',
    foreignKey: 'penggunaId',
  })
  declare user: BelongsTo<typeof User>

  @column()
  declare judul: string

  @column()
  declare penjelasan: string

  @column()
  declare lampiran: string

  @column()
  declare status: 'Diproses' | 'Selesai' | 'Ditutup'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
