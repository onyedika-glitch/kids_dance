// GET /api/stats — channel figures for the home page. Only real rows from the database;
// anything missing comes back null and the UI leaves it out.
export interface ChannelStats {
  videos: number | null
  letters: number | null
  plays: number | null
  recommendPct: number | null
  reviews: number | null
  asOf: string | null
}

export default defineCachedEventHandler(async (): Promise<ChannelStats> => {
  const stats: ChannelStats = { videos: null, letters: null, plays: null, recommendPct: null, reviews: null, asOf: null }
  const sql = useDb()
  if (!sql) return stats
  try {
    const rows = await sql<{ key: string, value: string, as_of: string | null }[]>`
      select key, value::text, to_char(as_of, 'Mon YYYY') as as_of from site_stats where key in ('video_plays', 'recommend_pct', 'reviews')`
    const get = (k: string) => rows.find(r => r.key === k)
    stats.plays = get('video_plays') ? Number(get('video_plays')!.value) : null
    stats.recommendPct = get('recommend_pct') ? Number(get('recommend_pct')!.value) : null
    stats.reviews = get('reviews') ? Number(get('reviews')!.value) : null
    stats.asOf = get('video_plays')?.as_of ?? null
    const [c] = await sql<{ videos: number, letters: number }[]>`
      select count(*)::int as videos, count(distinct letter)::int as letters from videos where published`
    stats.videos = c.videos
    stats.letters = c.letters
  }
  catch (e) {
    console.error('[stats]', e)
  }
  return stats
}, { name: 'stats', maxAge: 60, swr: true })
