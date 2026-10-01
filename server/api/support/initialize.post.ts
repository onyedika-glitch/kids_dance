import { randomUUID } from 'node:crypto'
import { MAX_GIFT, MIN_GIFT } from '../../../data/support'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

// POST /api/support/initialize { amount (naira), email, name?, message? }
// Creates a pending donation and returns Paystack's checkout URL.
export default defineEventHandler(async (event) => {
  rateLimit(event, 10, 10 * 60_000)
  const body = await readBody<Record<string, unknown>>(event).catch(() => null)
  const amount = Math.round(Number(body?.amount))
  const email = clean(body?.email)
  const name = clean(body?.name).slice(0, 80) || null
  const message = clean(body?.message).slice(0, 500) || null
  const errors: Record<string, string> = {}
  if (!Number.isFinite(amount) || amount < MIN_GIFT || amount > MAX_GIFT) errors.amount = `Please choose an amount between ₦${MIN_GIFT.toLocaleString('en-US')} and ₦${MAX_GIFT.toLocaleString('en-US')}`
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid email for your receipt'
  if (body?.adult !== true) errors.adult = 'Please confirm you are 18 or older'
  if (Object.keys(errors).length) throw createError({ statusCode: 422, statusMessage: 'Validation failed', data: { errors } })

  const reference = `TEH-${Date.now().toString(36)}-${randomUUID().slice(0, 8)}`.toUpperCase()
  const sql = useDb()
  if (sql) {
    await sql`insert into donations ${sql({ reference, email, name, message, amount_kobo: amount * 100 })}`.catch((e) => {
      console.error('[support] insert failed', reference, e)
    })
  }
  const { public: { siteUrl } } = useRuntimeConfig()
  const tx = await paystack<{ authorization_url: string, reference: string }>('/transaction/initialize', {
    method: 'POST',
    body: {
      email,
      amount: amount * 100,
      currency: 'NGN',
      reference,
      callback_url: `${siteUrl}/support/thanks`,
      metadata: { purpose: 'Tiny Explorers Hub support', name, message },
    },
  })
  return { url: tx.authorization_url, reference: tx.reference }
})
