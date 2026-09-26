import { filterStudios, studios, toCard, type GenreId } from '../../data/studios'

// GET /api/studios?area=tokyo&genre=hiphop,jazz&q=daikanyama
export default defineEventHandler((event) => {
  const { area, genre, q } = getQuery(event)
  const genres = typeof genre === 'string' && genre ? genre.split(',') as GenreId[] : undefined
  return filterStudios(studios, {
    area: typeof area === 'string' ? area : undefined,
    genres,
    q: typeof q === 'string' ? q : undefined,
  }).map(toCard)
})
