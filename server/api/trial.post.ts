import { randomUUID } from 'node:crypto'
import { trialClass, trialPlan, validateTrial, type TrialForm } from '../../data/trial'

type Body = Partial<TrialForm> & { website?: string }

const clean = (v: unknown) => (typeof v === 'string' ? v.trim() : '')

// POST /api/trial — free trial booking. Validated with the same rules as the form,
// saved to the database (trial_bookings) and emailed to the school.
export default defineEventHandler(async (event) => {
  rateLimit(event, 5, 10 * 60_000)

  const body = await readBody<Body>(event).catch(() => null)
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid request body' })
  }
  const errors = validateTrial(body)
  if (Object.keys(errors).length) {
    throw createError({ statusCode: 422, statusMessage: 'Validation failed', data: { errors } })
  }

  const id = `TR-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${randomUUID().slice(0, 6).toUpperCase()}`

  // Honeypot filled in → almost certainly a bot. Pretend success, store nothing.
  if (clean(body.website)) return { ok: true, id }

  const booking = {
    id,
    child_name: clean(body.childName),
    child_kana: clean(body.childKana),
    grade: clean(body.grade),
    parent_name: clean(body.parentName),
    phone: clean(body.phone),
    email: clean(body.email),
    studio: clean(body.studio),
    genre: clean(body.genre) || null,
    date1: clean(body.date1),
    time1: clean(body.time1),
    date2: clean(body.date2),
    time2: clean(body.time2),
    notes: clean(body.notes) || null,
    class_id: clean(body.classId) || null,
    plan_id: clean(body.planId) || null,
  }

  const sql = useDb()
  let saved = false
  if (sql) {
    try {
      await sql`insert into trial_bookings ${sql(booking)}`
      saved = true
    }
    catch (e) {
      console.error('[trial] insert failed', id, e)
    }
  }

  const { notifyEmail } = useRuntimeConfig()
  const mailed = notifyEmail ? await sendMail(notification(booking)) : false

  if (!saved && !mailed) {
    if (import.meta.dev) {
      console.info('[trial] (dev) booking not persisted — configure the database / Resend', booking)
      return { ok: true, id }
    }
    // Nowhere to put it: fail loudly so the parent falls back to the phone number
    throw createError({ statusCode: 503, statusMessage: 'Booking service unavailable' })
  }
  if (saved && mailed) {
    await sql!`update trial_bookings set email_sent = true where id = ${id}`.catch(e => console.error('[trial] flag update failed', id, e))
  }

  // Confirmation to the parent; best effort (needs a verified sending domain in Resend)
  await sendMail(confirmation(booking))

  return { ok: true, id }
})

type Booking = Record<string, string | null>

function rows(b: Booking) {
  const cls = b.class_id ? trialClass(b.class_id) : null
  const plan = b.plan_id ? trialPlan(b.plan_id) : null
  return [
    ['Booking number', b.id],
    ['Child', `${b.child_name} ("${b.child_kana}")`],
    ['Age / grade', b.grade],
    ['Parent / guardian', b.parent_name],
    ['Phone', b.phone],
    ['Email', b.email],
    ['Preferred studio', b.studio],
    ['Preferred genre', b.genre ?? 'No preference'],
    ['1st choice', `${b.date1} ${b.time1}`],
    ['2nd choice', `${b.date2} ${b.time2}`],
    ...(cls ? [['Selected class', cls.title]] : []),
    ...(plan ? [['Selected plan', plan.name]] : []),
    ['Notes', b.notes ?? '—'],
  ] as [string, string][]
}

function table(r: [string, string][]) {
  return `<table cellpadding="8" style="border-collapse:collapse;font-size:14px">${r.map(([k, v]) =>
    `<tr><th align="left" style="border:1px solid #ddd;background:#f6f6f6;white-space:nowrap">${escapeHtml(k)}</th><td style="border:1px solid #ddd;white-space:pre-wrap">${escapeHtml(v)}</td></tr>`).join('')}</table>`
}

function notification(b: Booking) {
  const r = rows(b)
  return {
    to: useRuntimeConfig().notifyEmail,
    replyTo: b.email!,
    subject: `[Free trial booking] ${b.studio} / ${b.child_name} (${b.id})`,
    html: `<p>A new free trial lesson booking has come in.</p>${table(r)}`,
    text: `A new free trial lesson booking has come in.\n\n${r.map(([k, v]) => `${k}: ${v}`).join('\n')}`,
  }
}

function confirmation(b: Booking) {
  const r = rows(b)
  const intro = `Dear ${b.parent_name},\n\nThank you for booking a free trial lesson at EYS-Kids Dance Academy.\nOur team will contact you within 2 business days to confirm the date.`
  const phone = 'Questions? Call us at 0120-978-900 (8:00 a.m.–1:00 a.m.).'
  return {
    to: b.email!,
    subject: '[EYS-Kids Dance Academy] We\'ve received your free trial booking',
    html: `<p style="white-space:pre-line">${escapeHtml(intro)}</p>${table(r)}<p>${phone}</p>`,
    text: `${intro}\n\n${r.map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${phone}`,
  }
}
