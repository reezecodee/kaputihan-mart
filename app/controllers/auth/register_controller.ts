import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  async show({ view }: HttpContext) {
    view.share({
      title: 'Register Akun',
    })

    return view.render('pages/auth/register')
  }

  async store({}: HttpContext) {}
}
