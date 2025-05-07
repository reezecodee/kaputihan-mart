import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class ProfilesController {
  /**
   * Fungsi untuk menampilkan halaman profile
   */
  public profile({ view }: HttpContext) {
    view.share({
      title: 'Profile Saya',
      pageHeader: true,
      headerData: {},
    })

    return view.render('pages/admin/profile/index')
  }

  /**
   * Fungsi untuk memperbarui profile
   */
  public async updateProfile() {}
  // public async updateProfile({ request, response, session, auth }: HttpContext) {
  //   const profile = await User.findOrFail(auth.user?.id)

  //   const payload = await request.validateUsing(createProfileValidator, {
  //     meta: {
  //       extras: {
  //         id: profile.id,
  //       },
  //     },
  //   })

  //   try {
  //     profile.merge(payload)
  //     await profile.save()

  //     session.flash('success', { message: 'Berhasil memperbarui data profile' })
  //     return response.redirect().back()
  //   } catch (error) {
  //     session.flash('failed', { message: 'Gagal memperbarui data profile' })
  //     return response.redirect().back()
  //   }
  // }

  /**
   * Fungsi untuk memperbarui password
   */
  public async updatePassword() {}
  // public async updatePassword({ auth, request, session, response }: HttpContext) {
  //   const payload = await request.validateUsing(createPasswordValidator)
  //   const user = auth.user!
  //   const isOldPasswordCorrect = await hash.verify(user.password, payload.old_password)

  //   if (!isOldPasswordCorrect) {
  //     session.flash('failed', { message: 'Password lama yang Anda masukkan salah.' })
  //     return response.redirect().back()
  //   }

  //   user.password = payload.new_password
  //   await user.save()

  //   session.flash('success', { message: 'Berhasil memperbarui password.' })
  //   return response.redirect().back()
  // }
}
