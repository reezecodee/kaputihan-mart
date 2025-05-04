import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  nama_kategori: 'Nama kategori',
  foto_kategori: 'Foto kategori',
}

export const categoryValidator = vine.compile(
  vine.object({
    nama_kategori: vine.string().trim().minLength(2).maxLength(20),
    foto_kategori: vine
      .file({ size: '1mb', extnames: ['jpg', 'png'] })
      .optional()
      .nullable(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'nama_kategori.required': '{{ field }} wajib diisi.',
    'nama_kategori.minLength': '{{ field }} minimal berisi 2 karakter.',
    'nama_kategori.maxLength': '{{ field }} maksimal berisi 20 karakter.',
    'foto_kategori.file.size': '{{ field }} harus berukuran maksimal 1MB.',
    'foto_kategori.file.extnames': '{{ field }} hanya boleh berformat JPG atau PNG.',
  },
  fields
)
