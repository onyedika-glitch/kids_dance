import { areas, studios, toCard } from '../../../data/studios'

// GET /api/areas/:slug — area header data, its sub-areas and studios
export default defineEventHandler((event) => {
  const slug = getRouterParam(event, 'slug')
  const area = areas.find(a => a.slug === slug)
  if (!area) throw createError({ statusCode: 404, statusMessage: 'Area not found' })
  const list = studios.filter(s => s.prefecture === area.slug || s.city === area.slug)
  const parent = area.parent ? areas.find(a => a.slug === area.parent) : undefined
  const children = areas
    .filter(a => a.parent === area.slug)
    .map(a => ({ ...a, count: studios.filter(s => s.city === a.slug).length }))
  return { area, parent, children, studios: list.map(toCard) }
})
