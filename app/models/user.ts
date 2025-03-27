import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import Store from '#models/store'
import Help from '#models/help'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: string

  @hasOne(() => Store, {
    localKey: 'uuid',
    foreignKey: 'penjual_id',
  })
  declare store: HasOne<typeof Store>

  @hasMany(() => Help, {
    localKey: 'uuid',
    foreignKey: 'pengguna_id',
  })
  declare help: HasMany<typeof Help>

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
  declare role: 'Admin' | 'User' | 'Seller'

  @column({ serializeAs: null })
  declare password: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null
}
