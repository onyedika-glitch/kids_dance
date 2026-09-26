<script setup lang="ts">
import { videoThumb } from '~/data/videos'

// "Popular Classes!" video card carousel (jah.png / vid.png). Cards come from the `videos` table;
// a card plays its video when it has a YouTube id and links to the courses page otherwise.
const { data: classes } = await useFetch('/api/videos', { query: { placement: 'home' }, key: 'videos-home', default: () => [] })
const { open } = useVideoPlayer()
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <section v-if="classes.length" class="relative overflow-hidden pb-16 pt-12 md:pb-24" aria-labelledby="classes-title">
    <div class="absolute inset-0 bg-[#E6E4FA] [clip-path:polygon(0_0,100%_0,100%_62%,0_92%)]" aria-hidden="true" />
    <div class="container-x relative">
      <h2 id="classes-title" class="text-center text-xl tracking-[0.2em] text-brand-purple sm:text-2xl">Popular Classes!</h2>
      <HomeCarousel label="Popular classes" tone="grey" class="mx-auto mt-6 max-w-[740px]">
        <component
          :is="c.youtubeId ? 'button' : NuxtLink"
          v-for="c in classes"
          :key="c.id"
          v-bind="c.youtubeId ? { type: 'button', onClick: () => open(c) } : { to: '/courses' }"
          class="group relative block aspect-[93/165] w-[42%] shrink-0 snap-start overflow-hidden rounded-2xl bg-ink text-left shadow-[0_3px_8px_rgba(0,0,0,0.25)] sm:w-[calc((100%-3.75rem)/4)] md:w-[calc((100%-6.25rem)/6)]"
        >
          <img v-if="videoThumb(c)" :src="videoThumb(c)!" :alt="`${c.subtitle} lesson in action`" width="139" height="115" loading="lazy" decoding="async" class="absolute inset-x-0 top-0 h-[56%] w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <span class="absolute inset-x-0 bottom-0 h-[50%] bg-ink/85" aria-hidden="true" />
          <span v-if="c.youtubeId" class="absolute left-1/2 top-[28%] flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ink/50 text-white transition group-hover:bg-brand-coral" aria-hidden="true"><Icon name="play" class="ml-0.5 h-4 w-4" /></span>
          <span class="absolute inset-x-0 bottom-0 p-2.5 text-white">
            <span class="line-clamp-3 text-[12px] font-medium leading-snug">{{ c.title }}<span v-if="c.youtubeId" class="sr-only"> (play video)</span></span>
            <span class="mt-2 flex items-center gap-1.5">
              <span v-if="c.instructor" class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white font-display text-[10px] font-semibold text-ink" aria-hidden="true">{{ c.instructor.slice(0, 1) }}</span>
              <span class="min-w-0 text-[9px] leading-tight"><span class="block truncate">{{ c.subtitle }}</span><span class="block truncate opacity-80">{{ c.meta }}</span></span>
            </span>
          </span>
        </component>
      </HomeCarousel>
    </div>
  </section>
</template>
