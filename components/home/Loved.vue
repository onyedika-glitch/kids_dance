<script setup lang="ts">
import { videoThumb, type VideoItem } from '~/data/videos'

// Top 3 by likes, or an invitation to like videos when nobody has yet
defineProps<{ videos: (VideoItem & { rank: number })[] }>()
const medal = ['#FFB800', '#8FA3BF', '#EE6D0C']
</script>

<template>
  <section class="section bg-white" aria-labelledby="loved-title">
    <div class="container-wide">
      <SectionHeading en="Most loved" tag="p">
        <h2 id="loved-title" class="mt-4 text-xl font-semibold text-ink sm:text-2xl">
          {{ videos.length ? 'The videos families like the most' : 'Help us find the most-loved video' }}
        </h2>
      </SectionHeading>

      <template v-if="videos.length">
        <ol class="mx-auto mt-10 grid max-w-[1080px] gap-5 md:grid-cols-3 md:gap-6">
          <li v-for="v in videos" :key="v.id">
            <NuxtLink :to="`/videos/${v.slug}`" class="group relative flex h-full items-center gap-4 rounded-3xl bg-paper-light p-3 pr-5 transition hover:-translate-y-1 hover:shadow-lift md:flex-col md:items-stretch md:p-4">
              <span class="absolute -left-2 -top-2 z-10 grid h-11 w-11 place-items-center rounded-full border-4 border-white font-display text-lg font-bold text-white" :style="{ backgroundColor: medal[v.rank - 1] ?? '#1E88E5' }">
                <span class="sr-only">Number </span>{{ v.rank }}
              </span>
              <span class="block aspect-video w-32 shrink-0 overflow-hidden rounded-2xl bg-paper md:w-full">
                <img :src="videoThumb(v, 'sm')" alt="" width="480" height="270" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
              </span>
              <span class="min-w-0">
                <span class="line-clamp-2 block font-display text-base font-semibold leading-snug text-ink md:text-lg">{{ v.title }}</span>
                <span class="mt-1 inline-flex items-center gap-1 text-sm font-bold text-brand-coral"><Icon name="heart" class="h-4 w-4" />{{ v.likes }} {{ v.likes === 1 ? 'like' : 'likes' }}</span>
              </span>
            </NuxtLink>
          </li>
        </ol>
        <div class="mt-10 text-center">
          <SkewButton to="/ranking" color="coral" size="lg" class="w-full sm:w-auto">See the full chart</SkewButton>
        </div>
      </template>

      <div v-else class="mx-auto mt-10 flex max-w-[760px] flex-col items-center gap-5 rounded-3xl border-2 border-dashed border-brand-coral/40 bg-paper-light px-6 py-8 text-center sm:flex-row sm:text-left">
        <span class="grid h-16 w-16 shrink-0 place-items-center rounded-full bg-brand-coral text-white" aria-hidden="true"><Icon name="heart" class="h-8 w-8" /></span>
        <p class="flex-1 text-base leading-relaxed text-ink-soft">
          Tap the heart on any video your little one enjoys. The favourites climb our Most Loved chart, and it helps us know what to make next.
        </p>
        <SkewButton to="/ranking" color="coral" class="w-full shrink-0 sm:w-auto">Most Loved</SkewButton>
      </div>
    </div>
  </section>
</template>
