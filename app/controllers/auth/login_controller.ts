import User from '#models/user'
import { createLoginValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  public async show({ view }: HttpContext) {
    view.share({
      title: 'Login ke Aplikasi',
    })

    return view.render('pages/auth/login')
  }

  public async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(createLoginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      if (auth.user?.role === 'Super Admin' || auth.user?.role === 'Admin') {
        return response.redirect().toRoute('admin.dashboard')
      } else {
        return response.redirect().toRoute('user.home')
      }
    } catch (error) {
      session.flash('errors', { login: 'Email atau password salah' })
      return response.redirect().back()
    }
  }
}
