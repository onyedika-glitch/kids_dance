import type { VideoItem } from '~/data/videos'

// Shared state for the site-wide video pop-up (components/VideoModal.vue)
export function useVideoPlayer() {
  const current = useState<VideoItem | null>('video-player', () => null)
  const open = (v: VideoItem) => { if (v.mediaFile || v.youtubeId) current.value = v }
  const close = () => { current.value = null }
  return { current, open, close }
}
