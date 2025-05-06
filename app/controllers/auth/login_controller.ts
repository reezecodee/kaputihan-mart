import User from '#models/user'
import { loginValidator } from '#validators/auth_validators/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  /**
   * Fungsi untuk menampilkan halaman login
   */
  public async show({ view }: HttpContext) {
    view.share({
      title: 'Login ke Aplikasi',
    })

    return view.render('pages/auth/login')
  }

  /**
   * Fungsi untuk memproses data login yang disubmit
   */
  public async store({ request, response, auth, session }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)

      if (auth.user?.role === 'Super Admin' || auth.user?.role === 'Admin') {
        session.flash('info', {
          type: 'alert-success',
          message: `Selamat datang ${auth.user?.nama} di E-Commerce Desa Kaputihan.`,
        })

        return response.redirect().toRoute('admin.dashboard')
      } else {
        return response.redirect().toRoute('user.home')
      }
    } catch (error) {
      session.flash('info', { type: 'alert-danger', message: 'Email atau password Anda salah.' })
      return response.redirect().back()
    }
  }
}
