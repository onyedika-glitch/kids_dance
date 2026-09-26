interface Mail {
  to: string | string[]
  subject: string
  html: string
  text: string
  replyTo?: string
}

// Sends through the Resend HTTP API. Returns false (and logs) instead of throwing,
// so a mail outage never loses a booking that was already saved.
export async function sendMail(mail: Mail): Promise<boolean> {
  const { resendApiKey, mailFrom } = useRuntimeConfig()
  if (!resendApiKey) {
    console.warn('[mail] NUXT_RESEND_API_KEY not set — email not sent:', mail.subject)
    return false
  }
  try {
    await $fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendApiKey}` },
      body: { from: mailFrom, to: mail.to, subject: mail.subject, html: mail.html, text: mail.text, reply_to: mail.replyTo },
      timeout: 10_000,
    })
    return true
  }
  catch (e: any) {
    console.error('[mail] send failed:', e?.data ?? e?.message ?? e)
    return false
  }
}

export const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', '\'': '&#39;' })[c]!)
