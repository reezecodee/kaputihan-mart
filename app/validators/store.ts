import vine from '@vinejs/vine'

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
