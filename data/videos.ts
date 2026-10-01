// Video library types, categories and helpers. Rows live in the Supabase `videos` table;
// `fallbackVideos` is only used when no database is configured (local dev).

export type CategoryId = 'abc' | 'numbers' | 'animals' | 'songs' | 'faith' | 'family'

export interface Category {
  id: CategoryId
  label: string
  blurb: string
  color: string
}

export const categories: Category[] = [
  { id: 'abc', label: 'ABCs & Phonics', blurb: 'Meet a new letter, hear its sound and find words that start with it.', color: '#1E88E5' },
  { id: 'numbers', label: '123s & Counting', blurb: 'Count, add and play with numbers. Coming soon!', color: '#8E5CD9' },
  { id: 'animals', label: 'Amazing Animals', blurb: 'Wow-facts and spot-it games about the creatures we share the world with.', color: '#3DAA3C' },
  { id: 'songs', label: 'Songs & Culture', blurb: 'Music, rhythm and dances that celebrate where we come from.', color: '#EE6D0C' },
  { id: 'faith', label: 'Faith & Values', blurb: 'Gentle moments of worship, blessings and kindness.', color: '#13A89E' },
  { id: 'family', label: 'Family Fun', blurb: 'Happy moments, weekend smiles and little adventures to share.', color: '#E53935' },
]

export interface VideoItem {
  id: string
  slug: string
  title: string
  category: CategoryId
  letter: string | null
  description: string
  tryThis: string | null
  /** Self-hosted MP4 file name, served from /v/<file> */
  mediaFile: string | null
  youtubeId: string | null
  facebookId: string | null
  duration: number | null
  publishedAt: string
  featured: boolean
  likes: number
}

export const isYoutubeId = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9_-]{11}$/.test(v)
export const categoryOf = (id: CategoryId) => categories.find(c => c.id === id) ?? categories[0]

export const videoSrc = (v: VideoItem) => v.mediaFile ? `/v/${v.mediaFile}` : null
/** Poster frame: our own thumbnail for MP4s, YouTube's for YouTube videos */
export const videoThumb = (v: VideoItem, size: 'lg' | 'sm' = 'lg') =>
  v.mediaFile
    ? `/images/posters/${v.mediaFile.replace(/\.mp4$/, '')}${size === 'sm' ? '-sm' : ''}.webp`
    : `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`
export const facebookUrl = (v: VideoItem) => v.facebookId ? `https://www.facebook.com/watch/?v=${v.facebookId}` : null
export const youtubeUrl = (v: VideoItem) => v.youtubeId ? `https://www.youtube.com/watch?v=${v.youtubeId}` : null
export const formatDuration = (s: number | null) => s ? `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}` : ''

const fb = (slug: string, title: string, category: CategoryId, facebookId: string, publishedAt: string, description: string, tryThis: string | null = null, letter: string | null = null): VideoItem =>
  ({ id: slug, slug, title, category, letter, description, tryThis, mediaFile: `${slug}.mp4`, youtubeId: null, facebookId, duration: 10, publishedAt, featured: slug === 'letter-a', likes: 0 })

// Local-dev fallback (a subset; the full list is in supabase/seed.sql)
export const fallbackVideos: VideoItem[] = [
  fb('letter-a', 'A is for Apple', 'abc', '2143808982842370', '2026-08-24', 'A is for apple, amazing and awesome! Say the short "a" sound together and spot things around you that start with A.', 'Find three things at home that start with A: an apple, an arm, maybe an ant outside!', 'A'),
  fb('letter-b', 'B is for Ball, Bear and Big Smiles', 'abc', '1217639467210481', '2026-08-25', 'Bounce into the letter B with balls, bears and big smiles.', 'Roll a ball back and forth and say "b-b-ball" each time it reaches your child.', 'B'),
  fb('letter-k', 'K is for Kite', 'abc', '1721253062420004', '2026-09-05', 'Ready to soar into today\'s alphabet adventure? K is for kite, and for kangaroo too!', 'Hop like a kangaroo across the room while saying the "k" sound.', 'K'),
  fb('octopus-three-hearts', 'The Animal With Three Hearts', 'animals', '1267535205509181', '2026-09-28', 'Bet you didn\'t know this animal has THREE hearts! Meet the octopus. Its blood is even blue!', 'If you had eight arms like an octopus, what would you do with them?'),
  fb('hidden-chameleon', 'Spot the Hidden Chameleon', 'animals', '2144776299583302', '2026-09-29', 'Can your child spot the hidden chameleon in under 5 seconds?', 'Pause the video, zoom in and test your family\'s detective skills.'),
  fb('culture-dance', 'Children Dancing to Traditional Songs', 'songs', '1087570360423146', '2026-09-29', 'Seeing children dance to our traditional songs reminds us that our roots run deep.'),
  fb('open-field-magic', 'The Magic of an Open Field', 'family', '1624035675947340', '2026-09-18', 'Nothing beats the pure magic of childhood and an open field to run in.', 'Head outside and race to the nearest tree. Ready, steady, go!'),
]
