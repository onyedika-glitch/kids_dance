import { events, type EventType } from '../../data/events'

// GET /api/events?type=recital|workshop|event
export default defineEventHandler((event) => {
  const { type } = getQuery(event)
  const list = [...events].sort((a, b) => a.start.localeCompare(b.start))
  return type ? list.filter(e => e.type === (type as EventType)) : list
})
