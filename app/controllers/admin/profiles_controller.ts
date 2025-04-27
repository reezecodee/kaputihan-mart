import User from '#models/user'
import { createPasswordValidator } from '#validators/password'
import { createProfileValidator } from '#validators/profile'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class ProfilesController {
  public profile({ view, session }: HttpContext) {
    view.share({
      title: 'Profile Saya',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/profile/index')
  }

  public async updateProfile({ request, response, session, auth }: HttpContext) {
    const profile = await User.findOrFail(auth.user?.id)

    const payload = await request.validateUsing(createProfileValidator, {
      meta: {
        extras: {
          id: profile.id,
        },
      },
    })

    try {
      profile.merge(payload)
      await profile.save()

      session.flash('success', { message: 'Berhasil memperbarui data profile' })
      return response.redirect().back()
    } catch (error) {
      session.flash('failed', { message: 'Gagal memperbarui data profile' })
      return response.redirect().back()
    }
  }

  public async updatePassword({ auth, request, session, response }: HttpContext) {
    const payload = await request.validateUsing(createPasswordValidator)
    const user = auth.user!
    const isOldPasswordCorrect = await hash.verify(user.password, payload.old_password)

    if (!isOldPasswordCorrect) {
      session.flash('failed', { message: 'Password lama yang Anda masukkan salah.' })
      return response.redirect().back()
    }

    user.password = payload.new_password
    await user.save()

    session.flash('success', { message: 'Berhasil memperbarui password.' })
    return response.redirect().back()
  }
}
