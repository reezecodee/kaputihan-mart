import { DateTime } from 'luxon'
import {
  BaseModel,
  beforeCreate,
  beforeSave,
  belongsTo,
  column,
  hasMany,
} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Store from '#models/store'
import Category from '#models/category'
import { v4 as uuidv4 } from 'uuid'
import slugifyImport from 'slugify'
import Transaction from '#models/transaction'
export default class Product extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @hasMany(() => Transaction, {
    foreignKey: 'produk_id',
  })
  declare transaction: HasMany<typeof Transaction>

  @beforeCreate()
  public static assignUuid(product: Product) {
    product.id = uuidv4()
  }

  @column()
  declare toko_id: string

  @column()
  declare kategori_id: string

  @belongsTo(() => Store, {
    foreignKey: 'toko_id',
  })
  declare store: BelongsTo<typeof Store>

  @belongsTo(() => Category, {
    foreignKey: 'kategori_id',
  })
  declare category: BelongsTo<typeof Category>

  @column()
  declare nama_produk: string

  @column()
  declare slug: string

  @column()
  declare deskripsi: string

  @column()
  declare foto_produk: string

  @column()
  declare harga: number

  @column()
  declare status: 'Tersedia' | 'Tidak tersedia'

  @column()
  declare stok: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @beforeSave()
  public static async generateSlug(product: Product) {
    const slugify = slugifyImport.default

    if (product.$dirty.nama_produk) {
      const uniqueSlug = slugify(product.nama_produk, { lower: true, strict: true })
      const timestamp = Date.now()
      product.slug = `${uniqueSlug}-${timestamp}`
    }
  }
}
