import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'

export default class Help extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare pengguna_id: string

  @beforeCreate()
  public static assignUuid(help: Help) {
    help.id = uuidv4()
  }

  @belongsTo(() => User, {
    localKey: 'id',
    foreignKey: 'pengguna_id',
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
