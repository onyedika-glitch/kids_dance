import { randomUUID } from 'node:crypto'
import { inquiryTypes, validateInquiry, type InquiryForm } from '../../data/contact'
import { sponsorPackages } from '../../data/support'

type Body = Partial<InquiryForm> & { website?: string }
const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

// POST /api/contact — messages from parents, schools and brands. Saved to the `inquiries`
// table and emailed to the page owner; fails loudly if neither is possible.
export default defineEventHandler(async (event) => {
  rateLimit(event, 5, 10 * 60_000)
  const body = await readBody<Body>(event).catch(() => null)
  if (!body || typeof body !== 'object') throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  const errors = validateInquiry(body)
  if (Object.keys(errors).length) throw createError({ statusCode: 422, statusMessage: 'Validation failed', data: { errors } })

  const id = `TE-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 6).toUpperCase()}`
  if (clean(body.website)) return { ok: true, id } // honeypot: bot, store nothing

  const pkg = sponsorPackages.find(p => p.id === clean(body.package))
  const row = {
    id,
    type: clean(body.type),
    name: clean(body.name),
    email: clean(body.email),
    organization: clean(body.organization) || null,
    package: pkg?.id ?? null,
    message: clean(body.message),
  }

  const sql = useDb()
  let saved = false
  if (sql) {
    try {
      await sql`insert into inquiries ${sql(row)}`
      saved = true
    }
    catch (e) {
      console.error('[contact] insert failed', id, e)
    }
  }

  const { notifyEmail } = useRuntimeConfig()
  const typeLabel = inquiryTypes.find(t => t.id === row.type)?.label ?? row.type
  const lines: [string, string][] = [
    ['Reference', id], ['About', typeLabel], ['Name', row.name], ['Email', row.email],
    ['Organization', row.organization ?? '—'], ...(pkg ? [['Package', `${pkg.name} (${pkg.price})`] as [string, string]] : []), ['Message', row.message],
  ]
  const mailed = notifyEmail
    ? await sendMail({
        to: notifyEmail,
        replyTo: row.email,
        subject: `[Tiny Explorers Hub] ${typeLabel}: ${row.name}`,
        html: `<p>New message from the website.</p><table cellpadding="8" style="border-collapse:collapse;font-size:14px">${lines.map(([k, v]) => `<tr><th align="left" style="border:1px solid #ddd;background:#f6f6f6">${escapeHtml(k)}</th><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join('')}</table>`,
        text: lines.map(([k, v]) => `${k}: ${v}`).join('\n'),
      })
    : false

  if (!saved && !mailed) {
    if (import.meta.dev) {
      console.info('[contact] (dev) not delivered — configure the database or Resend', row)
      return { ok: true, id }
    }
    throw createError({ statusCode: 503, statusMessage: 'Message service unavailable' })
  }
  if (saved && mailed) await sql!`update inquiries set email_sent = true where id = ${id}`.catch(() => {})
  return { ok: true, id }
})
