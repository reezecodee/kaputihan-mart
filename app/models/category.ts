import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import Product from '#models/product'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'

export default class Category extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(category: Category) {
    category.id = uuidv4()
  }

  @hasMany(() => Product, {
    localKey: 'id',
    foreignKey: 'kategori_id',
  })
  declare product: HasMany<typeof Product>

  @column()
  declare nama_kategori: string

  @column()
  declare foto_kategori: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
