import type { VideoItem } from '~/data/videos'

// Shared state for the site-wide YouTube modal (components/VideoModal.vue)
export function useVideoPlayer() {
  const current = useState<VideoItem | null>('video-player', () => null)
  const open = (v: VideoItem) => { if (v.youtubeId) current.value = v }
  const close = () => { current.value = null }
  return { current, open, close }
}
