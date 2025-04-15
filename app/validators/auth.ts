import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'email.string': 'Email harus berupa teks.',
  'email.email': 'Harap masukkan data berupa email yang valid.',
  'email.minLength': 'Email terlalu pendek.',
  'email.maxLength': 'Email terlalu panjang.',
  'email.unique': 'Email sudah digunakan.',
  'telepon.regex': 'Nomor telepon harus berupa angka.',
  'telepon.minLength': 'Nomor telepon minimal 12 angka.',
  'telepon.maxLength': 'Nomor telepon maksimal 15 angka.',
  'telepon.unique': 'Nomor telepon sudah digunakan.',
  'password.string': 'Password harus berupa teks.',
  'password.minLength': 'Password minimal berisi 8 karakter.',
  'password.confirmed': 'Konfirmasi password tidak sama.',
})

export const createRegisterValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .minLength(5)
      .maxLength(100)
      .trim()
      .unique(async (db, value) => {
        const exists = await db.from('users').where('email', value).first()
        return !exists
      }),
    telepon: vine
      .string()
      .regex(/^[0-9]+$/)
      .minLength(12)
      .maxLength(15)
      .trim()
      .unique(async (db, value) => {
        const exists = await db.from('users').where('telepon', value).first()
        return !exists
      }),
    password: vine.string().minLength(8).confirmed(),
  })
)

export const createLoginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string().minLength(8),
  })
)
