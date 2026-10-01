import { createHmac, timingSafeEqual } from 'node:crypto'

// POST /api/paystack/webhook — Paystack event callback. Signature-checked, then the
// transaction is re-verified with Paystack before anything is recorded.
export default defineEventHandler(async (event) => {
  const key = useRuntimeConfig().paystackSecretKey
  if (!key) throw createError({ statusCode: 503 })
  const raw = (await readRawBody(event)) ?? ''
  const sig = getRequestHeader(event, 'x-paystack-signature') ?? ''
  const expected = createHmac('sha512', key).update(raw).digest('hex')
  if (sig.length !== expected.length || !timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) {
    throw createError({ statusCode: 401, statusMessage: 'Bad signature' })
  }
  let payload: { event?: string, data?: { reference?: string } }
  try {
    payload = JSON.parse(raw)
  }
  catch {
    throw createError({ statusCode: 400 })
  }
  const ref = payload.data?.reference
  if (payload.event === 'charge.success' && ref) await recordPaystackTransaction(ref)
  return { ok: true }
})
