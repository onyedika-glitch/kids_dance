import { courseOptions, instructors, staff, studioOptions } from '../../data/instructors'

export default defineEventHandler(() => ({ instructors, staff, courses: courseOptions, studios: studioOptions }))
