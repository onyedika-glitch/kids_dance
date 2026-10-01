import { fallbackVideos, type VideoItem } from '../../../data/videos'

// GET /api/videos/:slug — one video, whether this visitor liked it, and related videos
export default defineEventHandler(async (event): Promise<{ video: VideoItem, liked: boolean, related: VideoItem[] }> => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const sql = useDb()
  let all: VideoItem[] = fallbackVideos
  let liked = false
  if (sql) {
    try {
      all = (await selectVideos(sql)).map(toVideo)
    }
    catch (e) {
      console.error('[video]', e)
    }
  }
  const video = all.find(v => v.slug === slug)
  if (!video) throw createError({ statusCode: 404, statusMessage: 'Video not found' })
  const who = visitorHash(event)
  if (sql && who) {
    const [row] = await sql`select 1 from video_likes where video_id = ${video.id} and visitor = ${who}`.catch(() => [])
    liked = !!row
  }
  const same = all.filter(v => v.category === video.category && v.slug !== video.slug)
  const others = all.filter(v => v.category !== video.category)
  return { video, liked, related: [...same, ...others].slice(0, 4) }
})
