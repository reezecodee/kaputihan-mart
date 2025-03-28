import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'nama.string': 'Nama harus berupa teks.',
  'nama.maxLength': 'Nama tidak boleh melebihi 255 karakter.',
  'nama.regex': 'Nama hanya boleh berisi huruf.',
  'email.string': 'Email harus berupa teks.',
  'email.email': 'Harap masukkan data berupa email yang valid.',
  'email.minLength': 'Email terlalu pendek.',
  'email.maxLength': 'Email terlalu panjang.',
  'email.unique': 'Email sudah digunakan.',
  'telepon.regex': 'Nomor telepon harus berupa angka.',
  'telepon.minLength': 'Nomor telepon minimal 12 angka.',
  'telepon.maxLength': 'Nomor telepon maksimal 15 angka.',
  'telepon.unique': 'Nomor telepon sudah digunakan.',
  'alamat.string': 'Alamat harus berupa teks.',
  'alamat.maxLength': 'Alamat tidak boleh lebih dari 255 karakter.',
  'password.string': 'Password harus berupa teks.',
  'password.minLength': 'Password minimal berisi 8 karakter.',
  'password.confirmed': 'Konfirmasi password tidak sama.',
  'foto.file.size': 'Ukuran foto harus 1MB.',
  'foto.file.extnames': 'Foto harus berformat JPG atau PNG.',
})

export const createUserValidator = vine.compile(
  vine.object({
    nama: vine
      .string()
      .maxLength(255)
      .regex(/^[A-Za-z\s]+$/)
      .trim()
      .nullable(),
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
    alamat: vine.string().maxLength(255).trim(),
    password: vine.string().minLength(8).confirmed(),
    foto: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
  })
)
