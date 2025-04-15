import User from '#models/user'
import { createRegisterValidator } from '#validators/auth'
import type { HttpContext } from '@adonisjs/core/http'

export default class RegisterController {
  public async show({ view, session }: HttpContext) {
    view.share({
      title: 'Register Akun',
      errors: session.flashMessages.get('errors') || {},
    })

    return view.render('pages/auth/register')
  }

  public async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createRegisterValidator)

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
