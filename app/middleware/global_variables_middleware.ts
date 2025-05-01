import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GlobalVariablesMiddleware {
  public async handle({ view }: HttpContext, next: NextFn) {
    view.share({
      year: new Date().getFullYear(),
    })

    await next()
  }
}
