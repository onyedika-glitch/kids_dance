const hits = new Map<string, number[]>()

// Small in-memory sliding window per client IP. Good enough for a single Node
// instance; put a shared limiter (e.g. at the proxy) in front if you scale out.
export function rateLimit(event: Parameters<typeof getRequestIP>[0], limit: number, windowMs: number) {
  const ip = getRequestIP(event, { xForwardedFor: true }) ?? 'unknown'
  const now = Date.now()
  const recent = (hits.get(ip) ?? []).filter(t => now - t < windowMs)
  if (recent.length >= limit) {
    throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
  }
  recent.push(now)
  hits.set(ip, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some(t => now - t < windowMs)) hits.delete(k)
  }
}
