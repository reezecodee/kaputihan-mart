import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { v4 as uuidv4 } from 'uuid'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(setting: Setting) {
    setting.id = uuidv4()
  }

  @column()
  declare favicon: string

  @column()
  declare logo: string

  @column()
  declare nama_aplikasi: string

  @column()
  declare singkatan: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
