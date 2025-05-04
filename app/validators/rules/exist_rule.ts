import { FieldContext } from '@vinejs/vine/types'
import db from '@adonisjs/lucid/services/db'
import vine from '@vinejs/vine'

type Options = {
  table: string
  column: string
}

async function exist(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string') {
    return
  }

  const row = await db
    .from(options.table)
    .select(options.column)
    .where(options.column, value)
    .first()

  if (!row) {
    field.report('{{ field }} tidak ditemukan.', 'exist', field)
  }
}

export const existRule = vine.createRule(exist)
