<script setup lang="ts">
import { videoSrc, videoThumb, type VideoItem } from '~/data/videos'

// Inline player: <video> for our own MP4s, click-to-load YouTube (privacy-enhanced) for YouTube-only rows
const props = defineProps<{ video: VideoItem }>()
const ytOn = ref(false)
watch(() => props.video.slug, () => { ytOn.value = false })
const src = computed(() => videoSrc(props.video))
</script>

<template>
  <div class="relative aspect-video w-full overflow-hidden rounded-3xl bg-ink shadow-lift">
    <video v-if="src" :key="src" :src="src" :poster="videoThumb(video)" controls playsinline preload="metadata" class="absolute inset-0 h-full w-full bg-ink" :aria-label="video.title" />
    <template v-else-if="video.youtubeId">
      <iframe v-if="ytOn" :src="`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0&playsinline=1`" :title="video.title" class="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />
      <button v-else type="button" class="group absolute inset-0 h-full w-full" :aria-label="`Play ${video.title}`" @click="ytOn = true">
        <img :src="videoThumb(video)" alt="" width="480" height="360" class="h-full w-full object-cover" decoding="async">
        <span class="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span class="grid h-20 w-20 place-items-center rounded-full bg-brand-coral text-white shadow-lg transition group-hover:scale-110">
            <Icon name="play" class="ml-1 h-10 w-10" />
          </span>
        </span>
        <span class="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-bold text-ink"><Icon name="youtube" class="h-4 w-4 text-brand-coral" />Plays from YouTube</span>
      </button>
    </template>
  </div>
</template>
