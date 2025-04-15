import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'penjual_id.string': 'Penjual tidak valid.',
  'penjual_id.unique': 'Penjual tersebut sudah terdaftar.',
  'nama_toko.string': 'Nama toko harus berupa teks.',
  'nama_toko.minLength': 'Nama toko harus terdiri dari minimal 5 karakter.',
  'nama_toko.maxLength': 'Nama toko tidak boleh lebih dari 255 karakter.',
  'nama_toko.trim': 'Nama toko tidak boleh mengandung spasi di awal atau akhir.',
  'deskripsi.string': 'Deskripsi toko harus berupa teks.',
  'deskripsi.minLength': 'Deskripsi toko harus terdiri dari minimal 10 karakter.',
  'deskripsi.maxLength': 'Deskripsi toko tidak boleh lebih dari 255 karakter.',
  'deskripsi.trim': 'Deskripsi toko tidak boleh mengandung spasi di awal atau akhir.',
  'status.enum': 'Status toko harus salah satu dari "Aktif" atau "Nonaktif".',
  'foto_toko.file':
    'Foto toko harus berupa file dengan ekstensi jpg atau png dan ukuran maksimal 1MB.',
  'foto_toko.optional':
    'Foto toko tidak wajib, tetapi jika diunggah harus sesuai dengan ketentuan.',
})

export const createStoreValidator = vine.compile(
  vine.object({
    penjual_id: vine.string().unique(async (db, value) => {
      const exists = await db.from('users').where('id', value).first()
      return !exists
    }),
    nama_toko: vine.string().minLength(5).maxLength(255).trim(),
    deskripsi: vine.string().minLength(10).maxLength(255).trim(),
    status: vine.enum(['Aktif', 'Nonaktif']),
    foto_toko: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
  })
)
