import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  public login({ view }: HttpContext) {
    view.share({
      title: 'Login ke Aplikasi',
    })

    return view.render('pages/auth/login')
  }

  public register({ view }: HttpContext) {
    view.share({
      title: 'Register Akun',
    })

    return view.render('pages/auth/register')
  }
}
