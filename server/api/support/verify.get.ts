// GET /api/support/verify?reference=... — confirm a payment with Paystack after checkout
export default defineEventHandler(async (event) => {
  const reference = String(getQuery(event).reference ?? '')
  if (!/^[A-Z0-9-]{8,60}$/i.test(reference)) throw createError({ statusCode: 400, statusMessage: 'Invalid reference' })
  return recordPaystackTransaction(reference)
})
