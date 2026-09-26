import { news, summarize } from '../../../data/news'

// GET /api/news/:id → article with previous/next and related articles
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const list = [...news].sort((a, b) => b.date.localeCompare(a.date))
  const i = list.findIndex(n => n.id === id)
  if (i === -1) throw createError({ statusCode: 404, statusMessage: 'Not Found' })

  const item = list[i]
  const related = list.filter(n => n.id !== item.id && n.category === item.category).slice(0, 3)
  const fill = list.filter(n => n.id !== item.id && !related.includes(n)).slice(0, 3 - related.length)

  return {
    item,
    newer: i > 0 ? summarize(list[i - 1]) : null,
    older: i < list.length - 1 ? summarize(list[i + 1]) : null,
    related: [...related, ...fill].map(summarize),
  }
})
