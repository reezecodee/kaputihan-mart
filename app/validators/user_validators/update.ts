import { uniqueRule } from '#validators/rules/unique_rule'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  nama: 'Nama',
  email: 'Email',
  telepon: 'Telepon',
  password: 'Password',
  alamat: 'Alamat',
  role: 'Role',
  foto: 'Foto',
}

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'nama.required': '{{ field }} wajib diisi.',
    'nama.minLength': '{{ field }} minimal berisi 2 karakter.',
    'nama.maxLength': '{{ field }} maksimal berisi 100 karakter.',

    'email.required': '{{ field }} wajib diisi.',
    'email.email': '{{ field }} harus berisi email yang valid.',
    'email.minLength': '{{ field }} minimal berisi 5 karakter.',
    'email.maxLength': '{{ field }} maksimal berisi 255 karakter.',
    'email.unique': '{{ field }} sudah digunakan.',

    'telepon.required': '{{ field }} wajib diisi.',
    'telepon.minLength': '{{ field }} minimal berisi 12 digit angka.',
    'telepon.maxLength': '{{ field }} maksimal berisi 15 digit angka.',
    'telepon.regex': '{{ field }} tidak valid, harus diawali dengan 08 dan hanya berisi angka.',
    'telepon.regex.0': '{{ field }} harus diawali dengan 08.',
    'telepon.regex.1': '{{ field }} hanya boleh berisi angka.',
    'telpon.unique': '{{ field }} sudah digunakan.',

    'password.required': '{{ field }} wajib diisi.',
    'password.minLength': '{{ field }} minimal berisi 12 digit angka.',
    'password.maxLength': '{{ field }} maksimal berisi 20 digit angka.',

    'alamat.required': '{{ field }} wajib diisi.',
    'alamat.minLength': '{{ field }} minimal berisi 20 karakter.',
    'alamat.maxLength': '{{ field }} maksimal berisi 255 karakter.',

    'status.required': '{{ field }} wajib diisi.',
    'status.in': '{{ field }} harus salah satu dari Tersedia atau Tidak tersedia.',

    'foto.file.size': '{{ field }} maksimal berukuran 1MB.',
    'foto.file.extnames': '{{ field }} hanya boleh berupa file JPG atau PNG.',
  },
  fields
)

export function updateUserValidator(userId: string) {
  return vine.compile(
    vine.object({
      nama: vine.string().trim().minLength(2).maxLength(100),
      email: vine
        .string()
        .trim()
        .toLowerCase()
        .email()
        .minLength(5)
        .maxLength(255)
        .use(uniqueRule({ table: 'users', column: 'email', userId: userId })),
      telepon: vine
        .string()
        .trim()
        .minLength(12)
        .maxLength(15)
        .regex(/^(08)\d+/)
        .regex(/^\d+$/)
        .use(uniqueRule({ table: 'users', column: 'telepon', userId: userId })),
      password: vine.string().trim().minLength(8).maxLength(20),
      alamat: vine.string().trim().minLength(20).maxLength(255),
      role: vine.string().in(['User', 'Admin']).trim(),
      foto: vine
        .file({ size: '1mb', extnames: ['jpg', 'png'] })
        .optional()
        .nullable(),
    })
  )
}
