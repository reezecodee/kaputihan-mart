import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  favicon: 'Favicon',
  logo: 'Logo',
  nama_aplikasi: 'Nama aplikasi',
  singkatan: 'Singkatan',
}

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'favicon.file.size': '{{ field }} tidak boleh lebih dari 1MB.',
    'favicon.file.extnames': 'Ekstensi {{ field }} harus .ico.',

    'logo.file.size': '{{ field }} tidak boleh lebih dari 1MB.',
    'logo.file.extnames': 'Ekstensi {{ field }} harus .jpg atau .png.',

    'nama_aplikasi.maxLength': '{{ field }} tidak boleh lebih dari 30 karakter.',

    'singkatan.minLength': '{{ field }} tidak boleh kurang dari 2 karakter.',
    'singkatan.maxLength': '{{ field }} tidak boleh lebih dari 10 karakter.',
  },
  fields
)

export const settingValidator = vine.compile(
  vine.object({
    favicon: vine
      .file({ size: '1mb', extnames: ['ico'] })
      .optional()
      .nullable(),
    logo: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
    nama_aplikasi: vine.string().maxLength(30).trim().nullable(),
    singkatan: vine.string().minLength(2).maxLength(10).trim().nullable(),
  })
)
