import { categories, fallbackVideos, type CategoryId, type VideoItem } from '../../data/videos'

// GET /api/videos?category=abc&limit=6 — published videos (with like counts), newest first
export default defineEventHandler(async (event): Promise<{ videos: VideoItem[], categories: typeof categories, total: number }> => {
  const q = getQuery(event)
  const cat = categories.find(c => c.id === q.category)?.id as CategoryId | undefined
  const limit = Math.min(200, Math.max(1, Number(q.limit) || 200))
  const sql = useDb()
  let all: VideoItem[] = fallbackVideos
  if (sql) {
    try {
      all = (await selectVideos(sql)).map(toVideo)
    }
    catch (e) {
      console.error('[videos]', e)
    }
  }
  const list = all.filter(v => !cat || v.category === cat).slice(0, limit)
  return { videos: list, categories, total: all.length }
})
