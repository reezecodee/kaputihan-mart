import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

type Options = {
  table: string
  column: string
  userId?: string
}

async function unique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  let query = db.from(options.table).select(options.column).where(options.column, value)

  if (options.userId) {
    query = query.whereNot('id', options.userId)
  }

  const row = await query.first()

  if (row) {
    field.report('{{ field }} sudah digunakan.', 'unique', field)
  }
}

export const uniqueRule = vine.createRule(unique)
