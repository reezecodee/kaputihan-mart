import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { existRule } from '#validators/rules/exist_rule'

const fields = {
  toko_id: 'Toko',
  kategori_id: 'Kategori',
  nama_produk: 'Nama produk',
  deskripsi: 'Deskripsi',
  harga: 'Harga',
  status: 'Status',
  stok: 'Stok',
  foto_produk: 'Foto produk',
  slug: 'Slug',
}

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'toko_id.required': '{{ field }} wajib diisi.',
    'toko_id.exist': '{{ field }} tidak ditemukan di database.',

    'kategori_id.required': '{{ field }} wajib diisi.',
    'kategori_id.exist': '{{ field }} tidak ditemukan di database.',

    'nama_produk.required': '{{ field }} wajib diisi.',
    'nama_produk.minLength': '{{ field }} minimal berisi 5 karakter.',
    'nama_produk.maxLength': '{{ field }} maksimal berisi 255 karakter.',

    'deskripsi.required': '{{ field }} wajib diisi.',
    'deskripsi.minLength': '{{ field }} minimal berisi 20 karakter.',
    'deskripsi.maxLength': '{{ field }} maksimal berisi 425 karakter.',

    'harga.required': '{{ field }} wajib diisi.',
    'harga.min': '{{ field }} tidak boleh negatif.',

    'status.required': '{{ field }} wajib diisi.',
    'status.in': '{{ field }} harus salah satu dari Tersedia atau Tidak tersedia.',

    'stok.required': '{{ field }} wajib diisi.',
    'stok.min': '{{ field }} minimal berisi 10.',
    'stok.max': '{{ field }} maksimal berisi 5000.',

    'foto_produk.file.size': '{{ field }} maksimal berukuran 1MB.',
    'foto_produk.file.extnames': '{{ field }} hanya boleh berupa file JPG atau PNG.',
  },
  fields
)

export const productValidator = vine.compile(
  vine.object({
    toko_id: vine
      .string()
      .trim()
      .use(existRule({ table: 'stores', column: 'id' })),
    kategori_id: vine
      .string()
      .trim()
      .use(existRule({ table: 'stores', column: 'id' })),
    nama_produk: vine.string().trim().minLength(5).maxLength(255),
    deskripsi: vine.string().trim().minLength(20).maxLength(425),
    harga: vine.number().min(0),
    status: vine.string().in(['Tersedia', 'Tidak tersedia']).trim(),
    stok: vine.number().min(10).max(5000),
    foto_produk: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
    slug: vine.string().trim(),
  })
)
