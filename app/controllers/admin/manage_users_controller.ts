import User from '#models/user'
import { createUserValidator } from '#validators/user_validators/create'
import { updateUserValidator } from '#validators/user_validators/update'
import { cuid } from '@adonisjs/core/helpers'
import { type HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import fs from 'node:fs'

export default class ManageUsersController {
  /**
   * Fungsi untuk menampilkan halaman daftar admin
   */
  public admin({ view, session }: HttpContext) {
    view.share({
      title: 'Daftar Admin',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: true,
      headerData: {
        btnTitle: 'Tambah Admin',
      },
    })

    return view.render('pages/admin/manage-user/list/admin')
  }

  /**
   * Fungsi untuk menampilkan halaman daftar pengguna
   */
  public user({ session, view }: HttpContext) {
    view.share({
      title: 'Daftar Pengguna',
      errors: session.flashMessages.get('errors') || {},
      pageHeader: true,
      btnModal: false,
      headerData: {},
    })

    return view.render('pages/admin/manage-user/list/user')
  }

  /**
   * Fungsi untuk menyimpan data pengguna
   */
  public async store({ request, params, session, response }: HttpContext) {
    try {
      const payload = await request.validateUsing(createUserValidator)
      let profilePhoto: string | null = null

      if (payload.foto) {
        profilePhoto = `${cuid()}.${payload.foto.extname}`
        await payload.foto.move('public/uploads/foto_profile', { name: profilePhoto })
      }

      const user = await User.create({
        nama: payload.nama,
        email: payload.email,
        telepon: payload.telepon,
        password: payload.password,
        alamat: payload.alamat,
        role: params.role,
        foto: profilePhoto,
      })

      session.flash('success', {
        type: 'alert-success',
        message: `Berhasil menambahkan ${user.role} baru ${user.nama}.`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('failed', {
        type: 'alert-danger',
        message: `Gagal menambahkan ${params.role} baru.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk memperbarui data pengguna
   */
  public async update({ request, params, session, response }: HttpContext) {
    const user = await User.findOrFail(params.id)

    try {
      const payload = await request.validateUsing(updateUserValidator(user.id))
      let profilePhoto: string | null = null

      if (payload.foto) {
        if (user.foto) {
          const oldPhotoPath = app.publicPath(`uploads/foto_profile/${user.foto}`)
          if (fs.existsSync(oldPhotoPath)) {
            fs.unlinkSync(oldPhotoPath)
          }
        }

        profilePhoto = `${cuid()}.${payload.foto.extname}`
        await payload.foto.move('public/uploads/foto_profile', { name: profilePhoto })

        user.foto = profilePhoto
      }

      user.nama = payload.nama
      user.email = payload.email
      user.telepon = payload.telepon
      user.password = payload.password
      user.alamat = payload.alamat
      user.role = params.role

      await user.save()

      session.flash('success', {
        type: 'alert-success',
        message: `Berhasil memperbarui ${user.role} ${user.nama}.`,
      })
      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flashAll()
      session.flash('failed', {
        type: 'alert-danger',
        message: `Gagal memperbarui ${user.role} ${user.nama}.`,
      })

      return response.redirect().back()
    }
  }

  /**
   * Fungsi untuk menghapus data pengguna
   */
  public async destroy({ params, session, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const name = user.nama

    try {
      if (user.foto) {
        const oldPhotoPath = app.publicPath(`uploads/foto_profile/${user.foto}`)
        if (fs.existsSync(oldPhotoPath)) {
          fs.unlinkSync(oldPhotoPath)
        }
      }

      await user.delete()

      session.flash('success', {
        type: 'alert-success',
        message: `Berhasil menghapus data ${name}`,
      })

      return response.redirect().back()
    } catch (error: unknown) {
      console.log(error)

      session.flash('failed', {
        type: 'alert-danger',
        message: `Gagal menghapus data ${user.nama}`,
      })

      return response.redirect().back()
    }
  }
}
