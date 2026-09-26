import { ageGroups, classes, genres, radarAxes } from '../../../data/courses'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const genre = genres.find(g => g.id === id)
  if (!genre) throw createError({ statusCode: 404, statusMessage: 'Genre not found' })
  return {
    genre,
    classes: classes.filter(c => c.genreId === genre.id),
    others: genres.filter(g => g.id !== genre.id),
    ageGroups,
    radarAxes,
  }
})
