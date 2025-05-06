import User from '#models/user'
import { registerValidator } from '#validators/auth_validators/register'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  /**
   * Fungsi untuk menampilkan halaman register
   */
  public async show({ view }: HttpContext) {
    view.share({
      title: 'Register Akun',
    })

    return view.render('pages/auth/register')
  }

  /**
   * Fungsi untuk menyimpan data register
   */
  public async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    type UserType = {
      email: string
      telepon: string
      password: string
      role: 'User'
    }

    try {
      const userData: UserType = {
        ...payload,
        role: 'User',
      }

      await User.create(userData)

      session.flash('success', { message: `Register berhasil, silahkan login ke aplikasi.` })
      return response.redirect().toRoute('login.show')
    } catch (error) {
      session.flash('failed', {
        message: `Gagal melakukan register, periksa kembali input Anda.`,
      })

      return response.redirect().back()
    }
  }
}
