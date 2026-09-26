import { fallbackVideos, isYoutubeId, type VideoItem, type VideoPlacement } from '../../data/videos'

const placements: VideoPlacement[] = ['home', 'workshop', 'activity']

// GET /api/videos?placement=home|workshop|activity — published cards in `sort` order
export default defineCachedEventHandler(async (event): Promise<VideoItem[]> => {
  const q = getQuery(event).placement
  const placement = placements.find(p => p === q)
  if (!placement) throw createError({ statusCode: 400, statusMessage: 'Unknown placement' })

  const sql = useDb()
  if (!sql) return fallbackVideos[placement]
  try {
    const rows = await sql<{ id: string, youtube_id: string | null, title: string, subtitle: string | null, meta: string | null, instructor: string | null, image: string | null }[]>`
      select id, youtube_id, title, subtitle, meta, instructor, image from videos
      where placement = ${placement} and published
      order by sort, created_at`
    return rows.map(v => ({
      id: v.id,
      youtubeId: isYoutubeId(v.youtube_id) ? v.youtube_id : null,
      title: v.title,
      subtitle: v.subtitle ?? '',
      meta: v.meta ?? '',
      instructor: v.instructor,
      image: v.image,
    }))
  }
  catch (e) {
    console.error('[videos]', e)
    return fallbackVideos[placement]
  }
}, { name: 'videos', maxAge: 60, swr: true, getKey: event => String(getQuery(event).placement ?? '') })
