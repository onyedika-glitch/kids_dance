<script setup lang="ts">
import { videoThumb, type VideoItem } from '~/data/videos'

// Portrait video cards with prev/next and scroll-snap (Video.png)
const props = withDefaults(defineProps<{ title: string, videos: VideoItem[], headingTag?: string, band?: boolean }>(), { headingTag: 'h3', band: true })
const track = ref<HTMLElement | null>(null)

function scroll(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const card = el.querySelector('li') as HTMLElement | null
  el.scrollBy({ left: dir * ((card?.offsetWidth ?? 120) + 16) * 2, behavior: 'smooth' })
}
const count = computed(() => props.videos.length)
const { open } = useVideoPlayer()
</script>

<template>
  <div :class="band ? 'band py-8 md:py-10' : 'py-8'">
    <component :is="headingTag" class="text-center text-base font-medium text-white">{{ title }}</component>
    <div class="container-x relative mt-5 md:px-16">
      <button type="button" class="absolute left-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center bg-[#5B8DB8]/80 text-white shadow-md transition hover:bg-[#5B8DB8] md:grid" aria-label="Previous videos" @click="scroll(-1)">
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M4 17h16M4 17l8-9" /></svg>
      </button>
      <ul ref="track" class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" :aria-label="`${title} (${count} ${count === 1 ? 'video' : 'videos'})`" tabindex="0">
        <li v-for="v in videos" :key="v.id" class="w-[42%] shrink-0 snap-start sm:w-[30%] md:w-[calc((100%-64px)/5)]">
          <component :is="v.youtubeId ? 'button' : 'div'" :type="v.youtubeId ? 'button' : undefined" @click="open(v)" class="group relative block aspect-[93/150] w-full overflow-hidden rounded-2xl bg-black text-left text-white shadow-[0_6px_12px_rgba(0,0,0,.25)]">
            <img v-if="videoThumb(v)" :src="videoThumb(v)!" alt="" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover opacity-80 transition group-hover:opacity-100">
            <span class="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-black via-black/70 to-transparent" aria-hidden="true" />
            <span v-if="v.youtubeId" class="absolute left-1/2 top-[42%] grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-black/30 transition group-hover:bg-brand-coral" aria-hidden="true">
              <Icon name="play" class="h-5 w-5" />
            </span>
            <span class="absolute inset-x-3 bottom-3">
              <span class="line-clamp-3 text-[12px] leading-snug">{{ v.title }}</span>
              <span class="mt-2 block text-center text-[10px] leading-snug text-white/80">{{ v.subtitle }}<br>{{ v.meta }}</span>
            </span>
            <span v-if="v.youtubeId" class="sr-only"> (play video)</span>
          </component>
        </li>
      </ul>
      <button type="button" class="absolute right-0 top-1/2 z-10 hidden h-10 w-10 -translate-y-1/2 place-items-center bg-[#5B8DB8]/80 text-white shadow-md transition hover:bg-[#5B8DB8] md:grid" aria-label="Next videos" @click="scroll(1)">
        <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M4 17h16M20 17l-8-9" /></svg>
      </button>
      <div class="mt-3 flex justify-center gap-3 md:hidden">
        <button type="button" class="grid h-10 w-10 place-items-center bg-[#5B8DB8]/80 text-white" aria-label="Previous videos" @click="scroll(-1)"><Icon name="chevron-left" class="h-4 w-4" /></button>
        <button type="button" class="grid h-10 w-10 place-items-center bg-[#5B8DB8]/80 text-white" aria-label="Next videos" @click="scroll(1)"><Icon name="chevron" class="h-4 w-4" /></button>
      </div>
    </div>
  </div>
</template>
