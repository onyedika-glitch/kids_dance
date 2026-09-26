import { areas, studios } from '../../data/studios'

// GET /api/areas — prefectures and cities with studio counts
export default defineEventHandler(() =>
  areas.map(a => ({
    ...a,
    count: studios.filter(s => s.prefecture === a.slug || s.city === a.slug).length,
  })),
)
