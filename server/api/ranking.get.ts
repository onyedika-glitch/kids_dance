import type { VideoItem } from '../../data/videos'

// GET /api/ranking — the most-loved videos, by likes (ties: newest first)
export default defineCachedEventHandler(async (): Promise<{ videos: (VideoItem & { rank: number })[], totalLikes: number }> => {
  const sql = useDb()
  if (!sql) return { videos: [], totalLikes: 0 }
  try {
    const all = (await selectVideos(sql)).map(toVideo)
    const sorted = all.filter(v => v.likes > 0).sort((a, b) => b.likes - a.likes || b.publishedAt.localeCompare(a.publishedAt)).slice(0, 10)
    let rank = 0
    let prev = -1
    const videos = sorted.map((v, i) => {
      if (v.likes !== prev) rank = i + 1
      prev = v.likes
      return { ...v, rank }
    })
    return { videos, totalLikes: all.reduce((n, v) => n + v.likes, 0) }
  }
  catch (e) {
    console.error('[ranking]', e)
    return { videos: [], totalLikes: 0 }
  }
}, { name: 'ranking', maxAge: 30, swr: true })
