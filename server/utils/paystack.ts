// Minimal Paystack client (https://paystack.com/docs/api). Amounts are in kobo.
interface PaystackResponse<T> { status: boolean, message: string, data: T }

export function paystackEnabled() {
  return !!useRuntimeConfig().paystackSecretKey
}

export async function paystack<T>(path: string, init: { method?: 'GET' | 'POST', body?: Record<string, unknown> } = {}): Promise<T> {
  const key = useRuntimeConfig().paystackSecretKey
  if (!key) throw createError({ statusCode: 503, statusMessage: 'Online payments are not set up yet' })
  const res = await $fetch<PaystackResponse<T>>(`https://api.paystack.co${path}`, {
    method: init.method ?? 'GET',
    body: init.body,
    headers: { Authorization: `Bearer ${key}` },
    timeout: 15_000,
  }).catch((e: any) => {
    console.error('[paystack]', path, e?.data?.message ?? e?.message)
    throw createError({ statusCode: 502, statusMessage: 'Payment provider error' })
  })
  if (!res.status) throw createError({ statusCode: 502, statusMessage: res.message || 'Payment provider error' })
  return res.data
}

// Record whatever Paystack reports for a reference. Status only ever comes from Paystack.
export async function recordPaystackTransaction(reference: string) {
  const tx = await paystack<{ status: string, amount: number, currency: string, paid_at: string | null, customer: { email: string } }>(`/transaction/verify/${encodeURIComponent(reference)}`)
  const status = tx.status === 'success' ? 'success' : tx.status === 'abandoned' ? 'abandoned' : tx.status === 'failed' ? 'failed' : 'pending'
  const sql = useDb()
  if (sql) {
    await sql`update donations set status = ${status}, paid_at = ${tx.paid_at}, amount_kobo = ${tx.amount}, currency = ${tx.currency}
      where reference = ${reference}`.catch(e => console.error('[paystack] update failed', reference, e))
  }
  return { status, amount: tx.amount / 100, currency: tx.currency }
}
