import type postgres from 'postgres'
import type { CategoryId, VideoItem } from '../../data/videos'

interface Row {
  id: string, slug: string, title: string, category: CategoryId, letter: string | null, description: string, try_this: string | null,
  media_file: string | null, youtube_id: string | null, facebook_id: string | null, duration: number | null,
  published_at: string, featured: boolean, likes: number
}

export const toVideo = (r: Row): VideoItem => ({
  id: r.id, slug: r.slug, title: r.title, category: r.category, letter: r.letter?.trim() || null, description: r.description,
  tryThis: r.try_this, mediaFile: r.media_file, youtubeId: r.youtube_id, facebookId: r.facebook_id, duration: r.duration,
  publishedAt: r.published_at, featured: r.featured, likes: Number(r.likes) || 0,
})

// Published videos with their like counts, newest first
export function selectVideos(sql: postgres.Sql, where: postgres.PendingQuery<postgres.Row[]> = sql``) {
  return sql<Row[]>`
    select v.id, v.slug, v.title, v.category, v.letter, v.description, v.try_this, v.media_file, v.youtube_id,
           v.facebook_id, v.duration, to_char(v.published_at, 'YYYY-MM-DD') as published_at, v.featured,
           (select count(*) from video_likes l where l.video_id = v.id)::int as likes
    from videos v
    where v.published ${where}
    order by v.published_at desc, v.created_at desc`
}
