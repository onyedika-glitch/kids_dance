import { createReadStream, existsSync, statSync } from 'node:fs'
import { resolve } from 'node:path'

// GET /v/<slug>.mp4 — videos with HTTP Range support. Nitro's static file handler ignores
// Range requests, and iPhone/iPad Safari refuses to play video without them.
const dirs = () => [
  process.env.MEDIA_DIR,
  resolve(process.cwd(), '.output/public/videos'),
  resolve(process.cwd(), 'public/videos'),
].filter(Boolean) as string[]

export default defineEventHandler((event) => {
  const file = getRouterParam(event, 'file') ?? ''
  if (!/^[a-z0-9-]+\.mp4$/.test(file)) throw createError({ statusCode: 404 })
  const path = dirs().map(d => resolve(d, file)).find(p => existsSync(p))
  if (!path) throw createError({ statusCode: 404 })

  const size = statSync(path).size
  setResponseHeaders(event, {
    'Content-Type': 'video/mp4',
    'Accept-Ranges': 'bytes',
    'Cache-Control': 'public, max-age=604800',
  })

  const range = getRequestHeader(event, 'range')
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range)
  if (!m) {
    setResponseHeader(event, 'Content-Length', size)
    return sendStream(event, createReadStream(path))
  }
  let start = m[1] ? Number(m[1]) : size - Number(m[2])
  let end = m[1] && m[2] ? Number(m[2]) : size - 1
  start = Math.max(0, start)
  end = Math.min(end, size - 1)
  if (Number.isNaN(start) || start > end) {
    setResponseStatus(event, 416)
    setResponseHeader(event, 'Content-Range', `bytes */${size}`)
    return ''
  }
  setResponseStatus(event, 206)
  setResponseHeaders(event, { 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 })
  return sendStream(event, createReadStream(path, { start, end }))
})
