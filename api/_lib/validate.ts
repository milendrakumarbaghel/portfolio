export interface ContactPayload {
  name: string
  email: string
  projectType: string
  message: string
}

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>

export const LIMITS = {
  name: [2, 80],
  message: [20, 4000],
  projectType: [2, 80],
  email: 254,
} as const

/** Minimum time a human needs to fill the form; faster submissions are treated as bots. */
export const MIN_FILL_MS = 3000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateContact(input: unknown): { data?: ContactPayload; errors: ContactErrors } {
  const raw = (input && typeof input === 'object' ? input : {}) as Record<string, unknown>
  const str = (key: string) => (typeof raw[key] === 'string' ? (raw[key] as string).trim() : '')
  const data: ContactPayload = {
    name: str('name'),
    email: str('email'),
    projectType: str('projectType'),
    message: str('message'),
  }
  const errors: ContactErrors = {}

  if (data.name.length < LIMITS.name[0]) errors.name = 'Please tell me your name.'
  else if (data.name.length > LIMITS.name[1]) errors.name = 'That name is a little long — 80 characters max.'

  if (!EMAIL_RE.test(data.email) || data.email.length > LIMITS.email) errors.email = 'Please enter a valid email address.'

  if (data.projectType.length < LIMITS.projectType[0] || data.projectType.length > LIMITS.projectType[1])
    errors.projectType = 'Please choose what this is about.'

  if (data.message.length < LIMITS.message[0]) errors.message = `A few more details, please — at least ${LIMITS.message[0]} characters.`
  else if (data.message.length > LIMITS.message[1]) errors.message = `Please keep it under ${LIMITS.message[1]} characters.`

  return Object.keys(errors).length ? { errors } : { data, errors }
}
