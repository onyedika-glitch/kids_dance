import { news, newsCategories, summarize } from '../../data/news'
import type { NewsCategory } from '../../data/news'

// GET /api/news?category=Column&exclude=Column&limit=9&offset=0
export default defineEventHandler((event) => {
  const q = getQuery(event)
  const category = typeof q.category === 'string' ? q.category : ''
  const exclude = typeof q.exclude === 'string' ? q.exclude : ''
  const limit = Math.min(Math.max(Number(q.limit) || 50, 1), 50)
  const offset = Math.max(Number(q.offset) || 0, 0)

  const valid = (c: string): c is NewsCategory => newsCategories.some(x => x.id === c)
  let list = [...news].sort((a, b) => b.date.localeCompare(a.date))
  if (category && valid(category)) list = list.filter(n => n.category === category)
  if (exclude && valid(exclude)) list = list.filter(n => n.category !== exclude)

  return {
    total: list.length,
    items: list.slice(offset, offset + limit).map(summarize),
  }
})
