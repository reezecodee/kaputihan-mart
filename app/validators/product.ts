import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'toko_id.string': 'Toko tidak valid atau tidak ditemukan.',
  'kategori_id.string': 'Kategori tidak valid atau tidak ditemukan.',
  'toko_id.exists': 'Toko tidak valid atau tidak ditemukan.',
  'kategori_id.exists': 'Kategori tidak valid atau tidak ditemukan.',
  'nama_produk.string': 'Nama produk harus berupa teks.',
  'nama_produk.minLength': 'Nama produk harus terdiri dari minimal 5 karakter.',
  'nama_produk.maxLength': 'Nama produk tidak boleh lebih dari 255 karakter.',
  'nama_produk.trim': 'Nama produk tidak boleh mengandung spasi di awal atau akhir.',
  'deskripsi.string': 'Deskripsi produk harus berupa teks.',
  'deskripsi.minLength': 'Deskripsi produk harus terdiri dari minimal 10 karakter.',
  'deskripsi.maxLength': 'Deskripsi produk tidak boleh lebih dari 255 karakter.',
  'deskripsi.trim': 'Deskripsi produk tidak boleh mengandung spasi di awal atau akhir.',
  'harga.string': 'Harga produk harus berupa teks.',
  'harga.trim': 'Harga produk tidak boleh mengandung spasi di awal atau akhir.',
  'stok.enum': 'Pilih status stok produk dengan benar (Tersedia/Tidak tersedia).',
  'foto_produk.file':
    'Foto produk harus berupa file dengan ekstensi jpg atau png dan ukuran maksimal 1MB.',
  'foto_produk.optional':
    'Foto produk tidak wajib, namun jika diunggah, harap sesuai dengan ketentuan.',
})

export const createProductValidator = vine.compile(
  vine.object({
    toko_id: vine.string().exists(async (db, value) => {
      const exists = await db.from('stores').where('id', value).first()
      return !!exists
    }),
    kategori_id: vine.string().exists(async (db, value) => {
      const exists = await db.from('categories').where('id', value).first()
      return !!exists
    }),
    nama_produk: vine.string().minLength(5).maxLength(255).trim(),
    deskripsi: vine.string().minLength(10).maxLength(255).trim(),
    harga: vine.string().trim(),
    stok: vine.enum(['Tersedia', 'Tidak tersedia']),
    foto_produk: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
  })
)
