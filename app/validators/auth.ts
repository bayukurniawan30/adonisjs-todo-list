import vine from '@vinejs/vine'

export const userAuthValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().minLength(5).trim(),
  })
)
