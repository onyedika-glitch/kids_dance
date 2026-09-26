import type { SocialPlatform } from './voices'

export interface RankingVoice {
  id: string
  platform: SocialPlatform
  name: string
  profile: string
  time: string
  text: string
}

export interface RankingReason {
  id: string
  rank: number
  title: string
  count: number
  voices: RankingVoice[]
}

export const rankingIntro = {
  title: 'Top reasons families chose EYS-Kids,\nas voted by our students and parents',
}

// "Based on our enrollment survey (FY2025, 277 responses), here's why…" — parts without data are dropped
export function surveyLead(s: { title: string, fiscal_year: string | null, respondents: number | null }) {
  const detail = [
    s.fiscal_year,
    s.respondents != null ? `${s.respondents.toLocaleString('en-US')} ${s.respondents === 1 ? 'response' : 'responses'}` : null,
  ].filter(Boolean).join(' \u00B7 ')
  const title = s.title.trim()
  // "Enrollment Survey" → "our enrollment survey"; acronyms like "EYS" stay as is
  const source = title ? `our ${title.replace(/\b([A-Z])([a-z]+)/g, (_, a: string, b: string) => a.toLowerCase() + b)}` : 'our survey'
  return `Based on ${source}${detail ? ` (${detail})` : ''}, here's why families chose EYS-Kids.`
}

// 18 min ago / 3 hours ago / 5 days ago / April 1, 2026
export function relativeTime(iso: string, now = Date.now()) {
  const diff = Math.max(0, now - new Date(iso).getTime())
  const min = Math.floor(diff / 60_000)
  if (min < 60) return `${Math.max(1, min)} min ago`
  const h = Math.floor(min / 60)
  if (h < 24) return `${h} ${h === 1 ? 'hour' : 'hours'} ago`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d} ${d === 1 ? 'day' : 'days'} ago`
  return new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Tokyo', dateStyle: 'long' }).format(new Date(iso))
}
