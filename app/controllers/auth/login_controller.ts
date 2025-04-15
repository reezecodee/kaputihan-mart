import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class LoginController {
  async show({ view }: HttpContext) {
    view.share({
      title: 'Login ke Aplikasi',
    })

    return view.render('pages/auth/login')
  }

  async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      return response.redirect().toRoute('admin.dashboard')
    } catch (error) {
      session.flash('errors', { login: 'Email atau password salah' })
      return response.redirect().back()
    }
  }
}
