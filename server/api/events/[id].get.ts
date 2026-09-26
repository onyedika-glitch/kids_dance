import { events } from '../../../data/events'

// GET /api/events/:id
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const item = events.find(e => e.id === id)
  if (!item) throw createError({ statusCode: 404, statusMessage: 'Event not found' })
  const related = events
    .filter(e => e.id !== item.id && e.type === item.type)
    .sort((a, b) => a.start.localeCompare(b.start))
    .slice(0, 3)
  return { event: item, related }
})
