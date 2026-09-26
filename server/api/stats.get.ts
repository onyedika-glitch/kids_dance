// GET /api/stats — member figures for the home page. Figures are only ever real
// rows from the database; when there's no data the fields are null and the UI omits them.
export interface MemberStats {
  total: number | null
  asOf: string | null
  history: { year: number, count: number }[]
}

export default defineCachedEventHandler(async (): Promise<{ members: MemberStats }> => {
  const members: MemberStats = { total: null, asOf: null, history: [] }
  const sql = useDb()
  if (!sql) return { members }
  try {
    const [stat] = await sql<{ value: string, as_of: string | null }[]>`
      select value::text, to_char(as_of, 'YYYY') as as_of from site_stats where key = 'members_total'`
    const history = await sql<{ year: number, members: number }[]>`
      select year, members from member_history order by year`
    if (stat) {
      members.total = Number(stat.value)
      members.asOf = stat.as_of ? `As of ${stat.as_of}` : null
    }
    members.history = history.map(h => ({ year: h.year, count: h.members }))
  }
  catch (e) {
    console.error('[stats]', e)
  }
  return { members }
}, { name: 'stats', maxAge: 60, swr: true })
