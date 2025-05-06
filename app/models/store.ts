import { DateTime } from 'luxon'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Product from '#models/product'
import { v4 as uuidv4 } from 'uuid'

export default class Store extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(store: Store) {
    store.id = uuidv4()
  }

  @hasMany(() => Product, {
    foreignKey: 'toko_id',
  })
  declare product: HasMany<typeof Product>

  @column()
  declare nama_toko: string

  @column()
  declare deskripsi: string

  @column()
  declare alamat: string

  @column()
  declare no_telepon: string

  @column()
  declare email: string

  @column()
  declare foto_toko: string | null

  @column()
  declare status: 'Aktif' | 'Nonaktif'

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
