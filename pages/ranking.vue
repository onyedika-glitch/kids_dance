<script setup lang="ts">
import { categoryOf, videoThumb, type VideoItem } from '~/data/videos'

useSeoMeta({
  title: 'Most Loved Videos',
  description: 'The Tiny Explorers Hub videos families love most, ranked by hearts from viewers. Watch the favourites and add your own.',
})

type Ranked = VideoItem & { rank: number }
const { data } = await useFetch<{ videos: Ranked[], totalLikes: number }>('/api/ranking', { key: 'ranking' })
const top = computed(() => data.value?.videos.slice(0, 3) ?? [])
const rest = computed(() => data.value?.videos.slice(3) ?? [])
const total = computed(() => data.value?.totalLikes ?? 0)

const hexColors: Record<number, string> = { 1: '#FFB800', 2: '#A9B2C3', 3: '#EE6D0C' }
const hexColor = (rank: number) => hexColors[rank] ?? '#1E88E5'
const medal: Record<number, string> = { 1: 'Gold', 2: 'Silver', 3: 'Bronze' }
function ordinal(n: number) {
  const t = n % 100
  if (t >= 11 && t <= 13) return 'th'
  return ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[n % 10] ?? 'th'
}
const hearts = (n: number) => `${n.toLocaleString('en-US')} ${n === 1 ? 'heart' : 'hearts'}`
</script>

<template>
  <div>
    <PageHero en="MOST LOVED" title="The videos little explorers love most" image="/images/posters/happy-sunday.webp" alt="Smiling children on a sunny Sunday" :crumbs="[{ label: 'Most Loved' }]" />

    <section class="section pt-10 md:pt-14" aria-labelledby="ranking-title">
      <div class="container-wide">
        <div class="mx-auto max-w-2xl text-center">
          <h2 id="ranking-title" class="text-2xl font-bold text-ink md:text-3xl">Ranked by your hearts</h2>
          <p class="mt-3 text-base leading-relaxed text-ink-soft">Tap the heart on any video you enjoyed. The most-loved ones rise to the top.</p>
          <p v-if="total" class="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 text-sm font-bold text-brand-coral shadow-pop">
            <Icon name="heart" class="h-5 w-5" />{{ hearts(total) }} given so far
          </p>
        </div>

        <!-- Empty -->
        <ChamferCard v-if="!top.length" size="lg" class="mx-auto mt-12 max-w-xl" body-class="px-6 py-12 text-center">
          <span class="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand-coral/10 text-brand-coral"><Icon name="heart" class="h-10 w-10" /></span>
          <p class="mt-5 font-display text-2xl font-bold text-ink">Be the first to love a video</p>
          <p class="mt-2 text-sm leading-relaxed text-ink-soft">No hearts yet! Pick a favourite, tap "Love this video", and it will appear right here.</p>
          <SkewButton to="/videos" color="coral" size="lg" class="mt-7">Find a favourite</SkewButton>
        </ChamferCard>

        <!-- 1st – 3rd -->
        <ol v-else class="mt-20 grid gap-x-6 gap-y-20 md:grid-cols-3 md:items-start">
          <li v-for="(v, i) in top" :key="v.id" :style="{ '--o': `${i * 40}px` }" class="md:mt-[var(--o)]">
            <article class="relative rounded-[28px] bg-white px-4 pb-6 pt-16 text-center shadow-pop" :aria-labelledby="`rank-${v.slug}`">
              <span class="hex-clip absolute left-1/2 top-0 grid h-[96px] w-[110px] -translate-x-1/2 -translate-y-1/2 place-items-center text-white" :style="{ backgroundColor: hexColor(v.rank) }" aria-hidden="true">
                <span class="font-display text-5xl font-bold leading-none">{{ v.rank }}<small class="ml-0.5 font-sans text-base font-extrabold">{{ ordinal(v.rank) }}</small></span>
              </span>
              <NuxtLink :to="`/videos/${v.slug}`" class="group block">
                <span class="relative block aspect-video overflow-hidden rounded-2xl bg-paper">
                  <img :src="videoThumb(v, 'sm')" alt="" width="480" height="270" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                  <span class="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <span class="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-brand-coral shadow-lg transition group-hover:bg-brand-yellow group-hover:text-ink"><Icon name="play" class="ml-0.5 h-6 w-6" /></span>
                  </span>
                </span>
                <span class="mt-3 inline-block rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" :style="{ backgroundColor: categoryOf(v.category).color }">{{ categoryOf(v.category).label }}</span>
                <h3 :id="`rank-${v.slug}`" class="mt-2 text-balance text-xl font-semibold leading-snug text-ink group-hover:text-brand-sky">
                  <span class="sr-only">{{ medal[v.rank] ? `${medal[v.rank]}, ` : '' }}rank {{ v.rank }}: </span>{{ v.title }}
                </h3>
              </NuxtLink>
              <div class="mt-4 flex justify-center">
                <VideoLikeLoader :slug="v.slug" :likes="v.likes" />
              </div>
            </article>
          </li>
        </ol>

        <!-- 4th – 10th -->
        <ol v-if="rest.length" class="mx-auto mt-16 grid max-w-4xl gap-4">
          <li v-for="v in rest" :key="v.id" class="flex flex-wrap items-center gap-4 rounded-3xl bg-white p-3 pr-4 shadow-pop sm:flex-nowrap sm:gap-5">
            <span class="hex-clip grid h-[56px] w-[64px] shrink-0 place-items-center text-white" :style="{ backgroundColor: hexColor(v.rank) }" aria-hidden="true">
              <span class="font-display text-xl font-bold leading-none">{{ v.rank }}<small class="font-sans text-[9px] font-extrabold">{{ ordinal(v.rank) }}</small></span>
            </span>
            <NuxtLink :to="`/videos/${v.slug}`" class="group flex min-w-0 flex-1 items-center gap-4">
              <img :src="videoThumb(v, 'sm')" alt="" width="480" height="270" loading="lazy" decoding="async" class="aspect-video w-24 shrink-0 rounded-xl object-cover sm:w-32">
              <span class="min-w-0">
                <span class="block text-xs font-bold" :style="{ color: categoryOf(v.category).color }">{{ categoryOf(v.category).label }}</span>
                <span class="mt-0.5 block font-display text-lg font-semibold leading-snug text-ink group-hover:text-brand-sky"><span class="sr-only">Rank {{ v.rank }}: </span>{{ v.title }}</span>
              </span>
            </NuxtLink>
            <VideoLikeLoader :slug="v.slug" :likes="v.likes" class="ml-auto" />
          </li>
        </ol>

        <p v-if="top.length" class="mt-12 text-center">
          <SkewButton to="/videos" color="sky">Browse all videos</SkewButton>
        </p>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
