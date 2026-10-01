<script setup lang="ts">
import { videoThumb, type Category, type VideoItem } from '~/data/videos'

const props = defineProps<{ categories: Category[], videos: VideoItem[] }>()
const counts = computed(() => {
  const m: Record<string, number> = {}
  for (const v of props.videos) m[v.category] = (m[v.category] ?? 0) + 1
  return m
})
// A poster for each category: its newest video
const cover = (id: string) => props.videos.find(v => v.category === id && v.mediaFile)
</script>

<template>
  <section class="section bg-paper-light" aria-labelledby="cats-title">
    <div class="container-wide">
      <SectionHeading en="Explore" tag="p">
        <h2 id="cats-title" class="mt-4 text-xl font-semibold text-ink sm:text-2xl">Pick a topic, start exploring</h2>
      </SectionHeading>
      <ul class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <li v-for="c in categories" :key="c.id">
          <NuxtLink v-if="counts[c.id]" :to="`/videos?category=${c.id}`" class="group flex h-full items-center gap-4 rounded-3xl border-2 bg-white p-3 pr-5 transition hover:-translate-y-1 hover:shadow-lift" :style="{ borderColor: `${c.color}40` }">
            <span class="relative h-20 w-24 shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-28" :style="{ backgroundColor: c.color }">
              <img v-if="cover(c.id)" :src="videoThumb(cover(c.id)!, 'sm')" alt="" width="480" height="270" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-110">
            </span>
            <span class="min-w-0 flex-1">
              <span class="block font-display text-lg font-bold leading-tight" :style="{ color: c.color }">{{ c.label }}</span>
              <span class="mt-1 line-clamp-2 block text-sm leading-snug text-ink-soft">{{ c.blurb }}</span>
              <span class="mt-2 inline-flex items-center gap-1 text-xs font-bold text-ink">{{ counts[c.id] }} {{ counts[c.id] === 1 ? 'video' : 'videos' }}<Icon name="chevron" class="h-3 w-3" /></span>
            </span>
          </NuxtLink>
          <div v-else class="flex h-full items-center gap-4 rounded-3xl border-2 border-dashed border-ink/15 bg-white/60 p-3 pr-5">
            <span class="grid h-20 w-24 shrink-0 place-items-center rounded-2xl font-display text-2xl font-bold text-white sm:h-24 sm:w-28" :style="{ backgroundColor: c.color }" aria-hidden="true">{{ c.id === 'numbers' ? '123' : 'Soon' }}</span>
            <span class="min-w-0 flex-1">
              <span class="block font-display text-lg font-bold leading-tight" :style="{ color: c.color }">{{ c.label }}</span>
              <span class="mt-1 block text-sm leading-snug text-ink-soft">{{ c.blurb.replace(/\s*Coming soon!?/i, '') }}</span>
              <span class="mt-2 inline-block rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs font-bold text-ink">Coming soon</span>
            </span>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
