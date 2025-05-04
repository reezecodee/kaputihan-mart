import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'
import hash from '@adonisjs/core/services/hash'

type Options = {
  userId: string
}

async function oldPasswordCheck(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const row = await db.from('users').select('password').where('id', options.userId).first()

  if (!row) {
    field.report('{{ field }} tidak ditemukan.', 'exist', field)
  } else {
    const isOldPasswordCorrect = await hash.verify(row.password, value)

    if (!isOldPasswordCorrect) {
      field.report('Password lama yang dimasukkan tidak cocok.', 'oldPassword', field)
    }
  }
}

export const oldPasswordRule = vine.createRule(oldPasswordCheck)
