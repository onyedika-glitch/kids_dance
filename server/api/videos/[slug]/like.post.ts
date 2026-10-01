// POST /api/videos/:slug/like  { like: boolean } — like or unlike a video (one per browser)
export default defineEventHandler(async (event) => {
  rateLimit(event, 60, 10 * 60_000)
  const slug = getRouterParam(event, 'slug') ?? ''
  const body = await readBody<{ like?: unknown }>(event).catch(() => null)
  if (typeof body?.like !== 'boolean') throw createError({ statusCode: 400, statusMessage: 'like must be true or false' })
  const sql = useDb()
  if (!sql) throw createError({ statusCode: 503, statusMessage: 'Likes are unavailable right now' })

  const [video] = await sql<{ id: string }[]>`select id from videos where slug = ${slug} and published`
  if (!video) throw createError({ statusCode: 404, statusMessage: 'Video not found' })
  const who = visitorHash(event, true)!
  if (body.like) await sql`insert into video_likes (video_id, visitor) values (${video.id}, ${who}) on conflict do nothing`
  else await sql`delete from video_likes where video_id = ${video.id} and visitor = ${who}`
  const [{ likes }] = await sql<{ likes: number }[]>`select count(*)::int as likes from video_likes where video_id = ${video.id}`
  return { liked: body.like, likes }
})
