import { rankingIntro, relativeTime, surveyLead, type RankingReason } from '../../data/ranking'
import type { SocialPlatform } from '../../data/voices'

// GET /api/ranking — latest published survey, ranked by votes.
// Returns an empty list (the page shows its "being compiled" state) until real results are entered.
export default defineCachedEventHandler(async () => {
  const empty = { intro: { title: rankingIntro.title, lead: '' }, reasons: [] as RankingReason[] }
  const sql = useDb()
  if (!sql) return empty
  try {
    const [survey] = await sql<{ id: string, title: string, fiscal_year: string | null, respondents: number | null }[]>`
      select id, title, fiscal_year, respondents from surveys
      where published order by created_at desc limit 1`
    if (!survey) return empty

    const rows = await sql<{ id: string, title: string, votes: number }[]>`
      select id, title, votes from ranking_reasons
      where survey_id = ${survey.id} and published
      order by votes desc, title`
    const voices = rows.length
      ? await sql<{ id: string, reason_id: string, platform: SocialPlatform, name: string, profile: string | null, body: string, posted_at: Date }[]>`
          select id, reason_id, platform, name, profile, body, posted_at from ranking_voices
          where published and reason_id in ${sql(rows.map(r => r.id))}
          order by posted_at desc`
      : []

    const now = Date.now()
    let rank = 0
    let prevVotes = -1
    const reasons: RankingReason[] = rows.map((r, i) => {
      // Ties share a rank (1, 2, 2, 4…)
      if (r.votes !== prevVotes) rank = i + 1
      prevVotes = r.votes
      return {
        id: r.id,
        rank,
        title: r.title,
        count: r.votes,
        voices: voices.filter(v => v.reason_id === r.id).map(v => ({
          id: v.id, platform: v.platform, name: v.name, profile: v.profile ?? '', time: relativeTime(v.posted_at.toISOString(), now), text: v.body,
        })),
      }
    })
    return { intro: { title: rankingIntro.title, lead: surveyLead(survey) }, reasons }
  }
  catch (e) {
    console.error('[ranking]', e)
    return empty
  }
}, { name: 'ranking', maxAge: 60, swr: true })
