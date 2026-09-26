import { areas, studios, toCard } from '../../../data/studios'

// GET /api/studios/:id — full studio + its areas + nearby studios
export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const studio = studios.find(s => s.id === id)
  if (!studio) throw createError({ statusCode: 404, statusMessage: 'Studio not found' })
  const nearby = studios
    .filter(s => s.id !== studio.id && s.prefecture === studio.prefecture)
    .slice(0, 4)
    .map(toCard)
  return {
    studio,
    prefecture: areas.find(a => a.slug === studio.prefecture)!,
    city: areas.find(a => a.slug === studio.city)!,
    nearby,
  }
})
