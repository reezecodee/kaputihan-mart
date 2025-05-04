import { oldPasswordRule } from '#validators/rules/old_password_rule'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  old_password: 'Password lama',
  new_password: 'Password baru',
}

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'old_password.required': '{{ field }} wajib diisi.',
    'old_password.oldPassword': '{{ field }} tidak cocok dengan data sebelumnya.',

    'new_password.required': '{{ field }} wajib diisi.',
    'new_password.minLength': '{{ field }} minimal berisi 8 karakter.',
    'new_password.maxLength': '{{ field }} maksimal berisi 20 karakter.',
    'new_password.confirmed': '{{ field }} dan konfirmasi password tidak cocok.',
  },
  fields
)

export function passwordValidator(userId: string) {
  vine.compile(
    vine.object({
      old_password: vine.string().use(oldPasswordRule({ userId: userId })),
      new_password: vine.string().minLength(8).maxLength(20).confirmed(),
    })
  )
}
