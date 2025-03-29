import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'nama_kategori.string': 'Nama kategori harus berupa teks',
  'nama_kategoru.maxLength': 'Nama kategori terlalu panjang',
})

export const createCategoryValidator = vine.compile(
  vine.object({
    nama_kategori: vine.string().maxLength(255),
  })
)
