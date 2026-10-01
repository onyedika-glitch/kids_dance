import { createHash, randomBytes } from 'node:crypto'
import type { H3Event } from 'h3'

const COOKIE = 'te_vid'

// Anonymous per-browser id for likes: a random cookie, stored only as a salted hash.
// No account, no personal data.
export function visitorHash(event: H3Event, create = false): string | null {
  let id = getCookie(event, COOKIE)
  if (!id || !/^[a-f0-9]{32}$/.test(id)) {
    if (!create) return null
    id = randomBytes(16).toString('hex')
    setCookie(event, COOKIE, id, { httpOnly: true, sameSite: 'lax', secure: !import.meta.dev, maxAge: 60 * 60 * 24 * 365, path: '/' })
  }
  return createHash('sha256').update(`${useRuntimeConfig().visitorSalt}:${id}`).digest('hex')
}
