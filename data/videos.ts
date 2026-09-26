export type VideoPlacement = 'home' | 'workshop' | 'activity'

export interface VideoItem {
  id: string
  /** 11-char YouTube id; the card plays the video when set */
  youtubeId: string | null
  title: string
  /** school / studio line */
  subtitle: string
  /** region / genre line */
  meta: string
  instructor?: string | null
  image?: string | null
}

export const isYoutubeId = (v: unknown): v is string => typeof v === 'string' && /^[A-Za-z0-9_-]{11}$/.test(v)

export const videoThumb = (v: VideoItem) =>
  v.image || (v.youtubeId ? `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg` : null)

// Used only when Supabase isn't configured (local dev). Production cards come from the `videos` table.
// AQXESSmW5Gw is the official Yubi Fest 2020 (live-streamed recital) video on the EYS channel.
export const fallbackVideos: Record<VideoPlacement, VideoItem[]> = {
  home: [
    { id: 'hiphop-kids', youtubeId: null, title: 'First Kids Hip-Hop | Finding the Beat, the Fun Way', subtitle: 'EYS-Kids Daikanyama Studio', meta: 'Kanto / Hip-Hop', instructor: 'MIKU', image: '/images/home/class-1.webp' },
    { id: 'jazz-basic', youtubeId: null, title: 'Beginner Jazz | Turns and Graceful Expression', subtitle: 'EYS-Kids Ginza Studio', meta: 'Kanto / Jazz', instructor: 'AYA', image: '/images/home/class-2.webp' },
    { id: 'kpop', youtubeId: null, title: 'K-Pop Covers | Master the Hit Choreography', subtitle: 'EYS-Kids Shibuya Studio', meta: 'Kanto / K-Pop', instructor: 'YUNA', image: '/images/home/class-3.webp' },
    { id: 'cheer', youtubeId: null, title: 'Intro to Cheer | Smiles and Teamwork', subtitle: 'EYS-Kids Shinjuku Studio', meta: 'Kanto / Cheer', instructor: 'SAKI', image: '/images/home/class-4.webp' },
    { id: 'breakin', youtubeId: null, title: 'Breakin’ | Floor-Move Basics, Safely', subtitle: 'EYS-Kids Ikebukuro Studio', meta: 'Kanto / Breakin’', instructor: 'RYO', image: '/images/home/class-5.webp' },
    { id: 'contemporary', youtubeId: null, title: 'Contemporary | Growing Free Expression', subtitle: 'EYS-Kids Yokohama Studio', meta: 'Kanto / Contemporary', instructor: 'NANA', image: '/images/home/class-6.webp' },
  ],
  workshop: [
    { id: 'yubifes-2020', youtubeId: 'AQXESSmW5Gw', title: 'Yubi Fest 2020: Live-Streamed Recital (Dec 12, 2020)', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Recital', image: '/images/events/friends.webp' },
    { id: 'v1', youtubeId: null, title: 'Hip-Hop Workshop with Pro Dancers: Highlights', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Hip-Hop', image: '/images/events/lesson.webp' },
    { id: 'v2', youtubeId: null, title: 'Rock & Pop Band Taster: First Time on Drums', subtitle: 'EYS-Kids Music School', meta: 'Kanto / Drums' },
    { id: 'v3', youtubeId: null, title: 'Parade Dance Workshop: Mini Parade Day', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Theme Park', image: '/images/events/stage-class.webp' },
    { id: 'v4', youtubeId: null, title: 'Mural Workshop: One Big Picture, Painted Together', subtitle: 'EYS-Kids Art & Design', meta: 'Kansai / Art' },
    { id: 'v7', youtubeId: null, title: 'Kids Dance Battle: Final Highlights', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Battle', image: '/images/events/duo.webp' },
  ],
  activity: [
    { id: 'yubifes-2020', youtubeId: 'AQXESSmW5Gw', title: 'Yubi Fest 2020: Live-Streamed Recital (Dec 12, 2020)', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Recital', image: '/images/events/friends.webp' },
    { id: 'v1', youtubeId: null, title: 'Hip-Hop Workshop with Pro Dancers: Highlights', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Hip-Hop', image: '/images/events/lesson.webp' },
    { id: 'v3', youtubeId: null, title: 'Parade Dance Workshop: Mini Parade Day', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Theme Park', image: '/images/events/stage-class.webp' },
    { id: 'v7', youtubeId: null, title: 'Kids Dance Battle: Final Highlights', subtitle: 'EYS-Kids Dance Academy', meta: 'Kanto / Battle', image: '/images/events/duo.webp' },
  ],
}
