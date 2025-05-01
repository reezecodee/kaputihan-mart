import { formatRupiah } from '#helpers/rupiah_helper'
import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserGlobalVariableMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    ctx.view.share({
      navCategories: await Category.query()
        .select(['id', 'nama_kategori'])
        .orderBy('created_at', 'asc')
        .limit(10),
      formatRupiah,
    })

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
