import { formatRupiah } from '#helpers/rupiah_helper'
import Cart from '#models/cart'
import Category from '#models/category'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class UserGlobalVariableMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */
    await ctx.auth.check()

    ctx.view.share({
      navCategories: await Category.query()
        .select(['id', 'nama_kategori'])
        .orderBy('created_at', 'asc')
        .limit(10),
      formatRupiah,
    })

    if (ctx.auth.isAuthenticated) {
      const user = await ctx.auth.authenticate()

      const carts = await Cart.query()
        .select(['id', 'jumlah', 'produk_id'])
        .where('pengguna_id', user.id)
        .preload('product', (query) => {
          query.select(['id', 'harga', 'nama_produk'])
        })
        .limit(10)
      const cartCount = carts.length
      const cartPriceTotal = carts.reduce((total, cart) => {
        const productPrice = Number(cart.product?.harga ?? 0)
        const quantity = Number(cart.jumlah ?? 0)
        return total + productPrice * quantity
      }, 0)

      ctx.view.share({
        carts,
        cartCount,
        cartPriceTotal,
      })
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
