import vine, { SimpleMessagesProvider } from '@vinejs/vine'

vine.messagesProvider = new SimpleMessagesProvider({
  'old_password.string': 'Harap masukkan password berupa teks.',
  'new_password.string': 'Harap masukkan password baru berupa teks.',
  'new_password.minLength': 'Password harus minimal berisi 8 karakter.',
  'new_password.confirmed': 'Konfirmasi password tidak valid.',
})

export const createPasswordValidator = vine.compile(
  vine.object({
    old_password: vine.string(),
    new_password: vine.string().minLength(8).confirmed(),
  })
)
