import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, beforeCreate, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Store from '#models/store'
import Help from '#models/help'
import Transaction from '#models/transaction'
import Cart from '#models/cart'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import { v4 as uuidv4 } from 'uuid'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @beforeCreate()
  public static assignUuid(user: User) {
    user.id = uuidv4()
  }

  @hasMany(() => Help, {
    foreignKey: 'pengguna_id',
  })
  declare help: HasMany<typeof Help>

  @hasMany(() => Transaction, {
    foreignKey: 'pengguna_id',
  })
  declare transaction: HasMany<typeof Transaction>

  @hasMany(() => Cart, {
    foreignKey: 'pengguna_id',
  })
  declare cart: HasMany<typeof Cart>

  @column()
  declare nama: string | null

  @column()
  declare email: string

  @column()
  declare telepon: string

  @column()
  declare alamat: string | null

  @column()
  declare foto: string | null

  @column()
  declare role: 'Super Admin' | 'Admin' | 'User'

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
