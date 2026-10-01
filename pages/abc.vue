<script setup lang="ts">
import type { VideoItem } from '~/data/videos'
import { sponsorPackages } from '~/data/support'

useSeoMeta({
  title: 'ABC Adventure',
  description: 'Learn the alphabet one letter at a time: a short video for each letter from A to Z, with its sound, words that start with it and a fun activity to try together.',
})

const { data } = await useFetch<{ videos: VideoItem[] }>('/api/videos', { query: { category: 'abc' }, key: 'videos-abc' })
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const byLetter = computed(() => {
  const m: Record<string, VideoItem[]> = {}
  // Oldest first within a letter, so the original lesson leads
  for (const v of [...(data.value?.videos ?? [])].reverse()) if (v.letter) (m[v.letter] ??= []).push(v)
  return m
})
const extras = computed(() => (data.value?.videos ?? []).filter(v => !v.letter))
const ready = computed(() => letters.filter(l => byLetter.value[l]?.length))
const sponsor = sponsorPackages.find(p => p.id === 'sponsored-letter')
const tileColors = ['#1E88E5', '#FFB800', '#3DAA3C', '#E53935', '#EE6D0C', '#8E5CD9', '#13A89E']
const colorOf = (l: string) => tileColors[letters.indexOf(l) % tileColors.length]
// Navy on yellow/orange for contrast, white on the rest
const textOn = (l: string) => ['#FFB800'].includes(colorOf(l)) ? '#0B1F4F' : '#fff'

const selected = ref<string | null>(ready.value[0] ?? null)
const selectedVideos = computed(() => selected.value ? byLetter.value[selected.value] ?? [] : [])

function select(l: string, scroll = true) {
  if (!byLetter.value[l]?.length) return
  selected.value = l
  if (!import.meta.client) return
  history.replaceState(history.state, '', `#letter-${l}`)
  if (scroll) {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    nextTick(() => document.getElementById('letter-panel')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }))
  }
}
function fromHash() {
  const m = /^#letter-([A-Za-z])$/.exec(location.hash)
  if (m) select(m[1].toUpperCase())
}
onMounted(() => {
  fromHash()
  window.addEventListener('hashchange', fromHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', fromHash))
</script>

<template>
  <div>
    <PageHero en="ABC ADVENTURE" title="One letter at a time, from A to Z" image="/images/posters/letter-k.webp" alt="A child flying a kite for the letter K" :crumbs="[{ label: 'ABC Adventure' }]" />

    <section class="section pt-10 md:pt-14" aria-labelledby="abc-title">
      <div class="container-wide">
        <div class="mx-auto max-w-2xl text-center">
          <h2 id="abc-title" class="text-2xl font-bold text-ink md:text-3xl">Pick a letter to play</h2>
          <p class="mt-3 text-base leading-relaxed text-ink-soft">Each letter gets its own short video: hear the sound, meet words that start with it, then try a little activity together.</p>
        </div>

        <!-- Progress -->
        <div class="mx-auto mt-8 max-w-md">
          <p class="flex items-baseline justify-between text-sm font-bold text-ink">
            <span><span class="font-display text-2xl text-brand-green">{{ ready.length }}</span> of 26 letters ready</span>
            <span class="text-ink-mute">New letters every week</span>
          </p>
          <div class="mt-2 h-3 overflow-hidden rounded-full bg-white" role="progressbar" :aria-valuenow="ready.length" aria-valuemin="0" aria-valuemax="26" aria-label="Letters ready">
            <div class="h-full rounded-full bg-brand-green" :style="{ width: `${(ready.length / 26) * 100}%` }" />
          </div>
        </div>

        <!-- A–Z grid -->
        <ul class="mx-auto mt-8 grid max-w-5xl grid-cols-5 gap-2 sm:grid-cols-7 sm:gap-3 lg:grid-cols-13" aria-label="Alphabet">
          <li v-for="l in letters" :id="`letter-${l}`" :key="l" class="scroll-mt-24">
            <button
              v-if="byLetter[l]" type="button"
              class="relative grid aspect-square w-full place-items-center rounded-2xl font-display text-3xl font-bold shadow-pop transition hover:-translate-y-0.5 sm:text-4xl"
              :class="selected === l ? 'ring-4 ring-ink ring-offset-2 ring-offset-paper-light' : ''"
              :style="{ backgroundColor: colorOf(l), color: textOn(l) }"
              :aria-pressed="selected === l" :aria-label="`Letter ${l}`"
              @click="select(l)"
            >
              {{ l }}
              <span v-if="byLetter[l].length > 1" class="absolute right-1.5 top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-white px-1 font-sans text-[10px] font-extrabold text-ink" aria-hidden="true">{{ byLetter[l].length }}</span>
            </button>
            <span v-else class="grid aspect-square w-full place-items-center rounded-2xl border-2 border-dashed border-ink/20 bg-white/60 text-center font-display text-3xl font-bold text-ink/25 sm:text-4xl">
              <span aria-hidden="true">{{ l }}</span>
              <span class="sr-only">Letter {{ l }}: coming soon</span>
            </span>
          </li>
        </ul>
        <p class="mx-auto mt-4 flex max-w-5xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-semibold text-ink-mute">
          <span class="flex items-center gap-2"><span class="h-4 w-4 rounded-md bg-brand-sky" aria-hidden="true" />Ready to watch</span>
          <span class="flex items-center gap-2"><span class="h-4 w-4 rounded-md border-2 border-dashed border-ink/25" aria-hidden="true" />Coming soon</span>
        </p>

        <!-- Selected letter -->
        <div id="letter-panel" class="mt-12 scroll-mt-28" aria-live="polite">
          <article v-for="v in selectedVideos" :key="v.id" class="mt-6 grid gap-6 rounded-[28px] bg-white p-4 shadow-pop sm:p-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:p-8" :aria-labelledby="`abc-${v.slug}`">
            <VideoPlayer :video="v" />
            <div class="flex min-w-0 flex-col">
              <div class="flex items-center gap-3">
                <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl font-display text-3xl font-bold" :style="{ backgroundColor: colorOf(selected!), color: textOn(selected!) }" aria-hidden="true">{{ selected }}</span>
                <h3 :id="`abc-${v.slug}`" class="text-2xl font-bold leading-tight text-ink">{{ v.title }}</h3>
              </div>
              <p class="mt-4 text-base leading-relaxed text-ink-soft">{{ v.description }}</p>
              <div v-if="v.tryThis" class="mt-5 rounded-2xl border-2 border-brand-yellow bg-paper-light p-4">
                <p class="flex items-center gap-2 font-display font-semibold text-ink"><Icon name="bulb" class="h-5 w-5 text-brand-orange" />Try this together</p>
                <p class="mt-1.5 text-sm leading-relaxed text-ink">{{ v.tryThis }}</p>
              </div>
              <div class="mt-auto flex flex-wrap items-center gap-3 pt-5">
                <VideoLikeLoader :key="v.slug" :slug="v.slug" :likes="v.likes" />
                <NuxtLink :to="`/videos/${v.slug}`" class="inline-flex h-11 items-center gap-1 text-sm font-bold text-brand-sky hover:underline">Open video page<Icon name="chevron" class="h-4 w-4" /></NuxtLink>
              </div>
            </div>
          </article>
          <p v-if="!selectedVideos.length" class="text-center text-ink-soft">Our first letters are on the way. Check back soon!</p>
        </div>
      </div>
    </section>

    <!-- Sponsor a letter -->
    <section class="bg-band-lavender py-12 md:py-16" aria-labelledby="sponsor-title">
      <div class="container-x">
        <ChamferCard size="lg" body-class="grid items-center gap-6 px-6 py-8 sm:px-10 md:grid-cols-[auto_1fr_auto]">
          <div class="flex -space-x-3" aria-hidden="true">
            <span v-for="(l, i) in ['M', 'N', 'O']" :key="l" class="grid h-16 w-16 place-items-center rounded-2xl border-2 border-dashed bg-white font-display text-3xl font-bold" :style="{ borderColor: tileColors[i + 3], color: tileColors[i + 3], transform: `rotate(${(i - 1) * 8}deg)` }">{{ l }}</span>
          </div>
          <div>
            <h2 id="sponsor-title" class="text-2xl font-bold text-ink">Sponsor a letter</h2>
            <p class="mt-2 text-sm leading-relaxed text-ink-soft">Help us finish the alphabet. {{ sponsor?.blurb }}</p>
            <p v-if="sponsor" class="mt-2 text-xs font-bold text-brand-purple">{{ sponsor.price }}</p>
          </div>
          <SkewButton to="/work-with-us?package=sponsored-letter" color="purple" class="whitespace-nowrap">Sponsor a letter</SkewButton>
        </ChamferCard>
      </div>
    </section>

    <section v-if="extras.length" class="section" aria-labelledby="abc-more-title">
      <div class="container-wide">
        <h2 id="abc-more-title" class="text-2xl font-bold text-ink md:text-3xl">More alphabet fun</h2>
        <ul class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="v in extras" :key="v.id"><VideoCard :video="v" /></li>
        </ul>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
