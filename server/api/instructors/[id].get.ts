import { instructorReviews, instructors } from '../../../data/instructors'

export default defineEventHandler((event) => {
  const id = getRouterParam(event, 'id')
  const instructor = instructors.find(i => i.id === id)
  if (!instructor) throw createError({ statusCode: 404, statusMessage: 'Instructor not found' })
  return {
    instructor,
    reviews: instructorReviews.filter(r => r.instructorId === instructor.id),
    others: instructors.filter(i => i.id !== instructor.id),
  }
})
