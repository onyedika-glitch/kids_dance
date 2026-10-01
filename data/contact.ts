export const inquiryTypes = [
  { id: 'parent', label: 'I\'m a parent or carer' },
  { id: 'school', label: 'I\'m a teacher or school' },
  { id: 'brand', label: 'Brand or sponsorship' },
  { id: 'other', label: 'Something else' },
] as const

export type InquiryType = typeof inquiryTypes[number]['id']

export interface InquiryForm {
  type: InquiryType | ''
  name: string
  email: string
  organization: string
  /** Sponsorship package id from /support, optional */
  package: string
  message: string
  adult: boolean
}

export type InquiryErrors = Partial<Record<keyof InquiryForm, string>>

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Shared by the form (inline errors) and /api/contact (server validation). */
export function validateInquiry(f: Partial<InquiryForm>): InquiryErrors {
  const e: InquiryErrors = {}
  const s = (v: unknown) => (typeof v === 'string' ? v.trim() : '')
  if (!inquiryTypes.some(t => t.id === f.type)) e.type = 'Please choose what this is about'
  if (!s(f.name)) e.name = 'Please tell us your name'
  else if (s(f.name).length > 80) e.name = 'Please keep your name under 80 characters'
  if (!s(f.email)) e.email = 'Please enter your email'
  else if (!EMAIL.test(s(f.email))) e.email = 'That email doesn\'t look quite right'
  if (s(f.organization).length > 120) e.organization = 'Please keep this under 120 characters'
  if (s(f.package).length > 40) e.package = 'Unknown package'
  if (s(f.message).length < 10) e.message = 'Please write a little more (at least 10 characters)'
  else if (s(f.message).length > 2000) e.message = 'Please keep your message under 2,000 characters'
  // Only adults may contact us; we never collect children's details
  if (f.adult !== true) e.adult = 'Please confirm you are 18 or older'
  return e
}
