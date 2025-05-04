import { uniqueRule } from '#validators/rules/unique_rule'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  nama_toko: 'Nama toko',
  deskripsi: 'Deskripsi',
  alamat: 'Alamat',
  no_telepon: 'Telepon',
  email: 'Email',
  status: 'Status',
  foto_toko: 'Foto toko',
}

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'nama_toko.required': '{{ field }} wajib diisi.',
    'nama_toko.minLength': '{{ field }} minimal berisi 2 karakter.',
    'nama_toko.maxLength': '{{ field }} maksimal berisi 20 karakter.',

    'deskripsi.required': '{{ field }} wajib diisi.',
    'deskripsi.minLength': '{{ field }} minimal berisi 5 karakter.',
    'deskripsi.maxLength': '{{ field }} maksimal berisi 30 karakter.',

    'alamat.required': '{{ field }} wajib diisi.',
    'alamat.minLength': '{{ field }} minimal berisi 20 karakter.',
    'alamat.maxLength': '{{ field }} maksimal berisi 255 karakter.',

    'no_telepon.required': '{{ field }} wajib diisi.',
    'no_telepon.minLength': '{{ field }} minimal berisi 12 digit.',
    'no_telepon.maxLength': '{{ field }} maksimal berisi 15 digit.',
    'no_telepon.regex': '{{ field }} tidak valid, harus diawali dengan 08 dan hanya berisi angka.',
    'no_telepon.regex.0': '{{ field }} harus diawali dengan 08.',
    'no_telepon.regex.1': '{{ field }} hanya boleh berisi angka.',
    'no_telepon.unique': '{{ field }} sudah terdaftar.',

    'email.required': '{{ field }} wajib diisi.',
    'email.email': '{{ field }} harus berisi email yang valid.',
    'email.minLength': '{{ field }} minimal berisi 12 karakter.',
    'email.maxLength': '{{ field }} maksimal berisi 15 karakter.',
    'email.unique': '{{ field }} sudah terdaftar.',

    'status.required': '{{ field }} wajib diisi.',
    'status.in': '{{ field }} harus salah satu dari Aktif atau Nonaktif.',

    'foto_toko.file.size': '{{ field }} maksimal berukuran 1MB.',
    'foto_toko.file.extnames': '{{ field }} hanya boleh berupa file JPG atau PNG.',
  },
  fields
)

export const storeValidator = vine.compile(
  vine.object({
    nama_toko: vine.string().trim().minLength(2).maxLength(20),
    deskripsi: vine.string().trim().minLength(5).maxLength(30),
    alamat: vine.string().trim().minLength(20).maxLength(255),
    no_telepon: vine
      .string()
      .trim()
      .minLength(12)
      .maxLength(15)
      .regex(/^(08)\d+/)
      .regex(/^\d+$/)
      .use(uniqueRule({ table: 'stores', column: 'no_telepon' })),
    email: vine
      .string()
      .trim()
      .email()
      .minLength(12)
      .maxLength(15)
      .use(uniqueRule({ table: 'stores', column: 'email' })),
    status: vine.string().in(['Aktif', 'Nonaktif']).trim(),
    foto_toko: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
  })
)
