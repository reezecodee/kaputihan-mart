import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { formatRupiah } from '#helpers/rupiah_helper'

export default class GlobalVariablesMiddleware {
  public async handle({ view }: HttpContext, next: NextFn) {
    view.share({
      year: new Date().getFullYear(),
      navCategories: await Category.query()
        .select(['id', 'nama_kategori'])
        .orderBy('created_at', 'asc')
        .limit(10),
      formatRupiah,
    })

    await next()
  }
}
