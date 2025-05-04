import vine, { SimpleMessagesProvider } from '@vinejs/vine'

const fields = {
  email: 'Email',
  password: 'Password',
}

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().toLowerCase().email(),
    password: vine.string().trim().minLength(8),
  })
)

vine.messagesProvider = new SimpleMessagesProvider(
  {
    'email.required': '{{ field }} wajib diisi.',
    'email.email': 'Format {{ field }} tidak valid.',
    'password.required': '{{ field }} wajib diisi.',
    'password.minLength': '{{ field }} minimal harus 8 karakter.',
  },
  fields
)
