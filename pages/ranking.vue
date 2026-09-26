<script setup lang="ts">
import type { RankingReason } from '~/data/ranking'

useSeoMeta({
  title: 'Why Families Choose Us',
  description: 'The top reasons families chose EYS-Kids Dance Academy, ranked from our student and parent survey and voices on social media.',
})

const { data } = await useFetch<{ intro: { title: string, lead: string }, reasons: RankingReason[] }>('/api/ranking')
const top = computed(() => data.value?.reasons.slice(0, 3) ?? [])
const rest = computed(() => data.value?.reasons.slice(3) ?? [])

const hexColors: Record<number, string> = { 1: '#FFCB1F', 2: '#BDBDBD', 3: '#FF9A2F' }
const titleColors: Record<number, string> = { 1: '#F5B800', 2: '#AAAAAA', 3: '#FF8A1F' }
const hexStyle = (rank: number) => hexColors[rank]
  ? { backgroundColor: hexColors[rank] }
  : { backgroundColor: '#6F8DE6' }
const titleColor = (rank: number) => titleColors[rank] ?? '#23AADD'

const expanded = ref<string | null>(null)
const expandedReason = computed(() => rest.value.find(r => r.id === expanded.value))
function toggle(id: string) {
  expanded.value = expanded.value === id ? null : id
  if (expanded.value && window.matchMedia('(max-width: 767px)').matches) {
    nextTick(() => document.getElementById('ranking-more')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
}
const platformLabel = { facebook: 'Facebook', instagram: 'Instagram', twitter: 'X' }
const votes = (n: number) => `${n.toLocaleString('en-US')} ${n === 1 ? 'vote' : 'votes'}`
// 1st, 2nd, 3rd, 4th … 11th, 12th, 13th … 21st
function ordinal(n: number) {
  const t = n % 100
  if (t >= 11 && t <= 13) return 'th'
  return ({ 1: 'st', 2: 'nd', 3: 'rd' } as Record<number, string>)[n % 10] ?? 'th'
}
</script>

<template>
  <div>
    <PageHero en="RANKING" title="Why Families Choose Us" image="/images/community/friends-4.webp" alt="Kids taking a lesson in the studio" :crumbs="[{ label: 'Why Families Choose Us' }]" />

    <section class="bg-paper pb-20 pt-12 md:pb-28 md:pt-16" aria-labelledby="ranking-title">
      <div class="container-x">
        <div class="text-center">
          <h2 id="ranking-title" class="whitespace-pre-line text-xl font-medium leading-relaxed text-ink sm:text-2xl">{{ data?.intro.title }}</h2>
          <p v-if="data?.intro.lead" class="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">{{ data.intro.lead }}</p>
        </div>

        <ChamferCard v-if="!top.length" class="mx-auto mt-14 max-w-xl" body-class="px-6 py-12 text-center">
          <p class="text-lg text-ink">The ranking is being compiled</p>
          <p class="mt-3 text-sm text-ink-soft">We'll post it here as soon as the latest survey results are in.</p>
        </ChamferCard>

        <!-- 1st – 3rd -->
        <ol class="mt-20 grid gap-x-5 gap-y-20 md:grid-cols-3 md:items-start">
          <li v-for="(r, i) in top" :key="r.id" :style="{ '--o': `${i * 48}px` }" class="md:mt-[var(--o)]">
            <article class="relative" :aria-labelledby="`rank-${r.id}`">
              <div class="chamfer bg-[#DDDDDD] p-3 [--c:30px]">
              <div class="chamfer relative bg-white px-4 pb-6 pt-16 text-center [--c:26px]">
                <h3 :id="`rank-${r.id}`" class="whitespace-pre-line text-xl leading-snug" :style="{ color: titleColor(r.rank) }">
                  <span class="sr-only">Rank {{ r.rank }}: </span>{{ r.title }}
                </h3>
                <p class="mt-5 text-sm text-ink">({{ votes(r.count) }})</p>
              </div>
              <ul v-if="r.voices.length" class="mt-3 max-h-[440px] space-y-3 overflow-y-auto pr-1 [scrollbar-color:#bbb_transparent] [scrollbar-width:thin]" :aria-label="`What families who chose “${r.title}” said`" tabindex="0">
                <li v-for="v in r.voices" :key="v.id" class="relative pl-1 pt-3">
                  <PeopleSocialBadge :platform="v.platform" class="absolute left-0 top-0 z-10" />
                  <div class="chamfer bg-white px-4 pb-4 pt-5 [--c:16px]">
                    <div class="flex gap-3">
                      <span class="h-[58px] w-[58px] shrink-0 border border-[#DDD] bg-white" aria-hidden="true" />
                      <div class="min-w-0 flex-1">
                        <p class="flex flex-wrap items-baseline justify-between gap-x-2 text-ink">
                          <span class="text-sm">{{ v.name }}</span>
                          <span class="text-[11px] text-ink-soft">{{ v.profile }}</span>
                        </p>
                        <p class="mt-3 text-[11px] text-ink-mute">{{ v.time }}<span class="sr-only">, {{ platformLabel[v.platform] }}</span></p>
                      </div>
                    </div>
                    <p class="mt-3 text-xs leading-[1.8] text-ink">{{ v.text }}</p>
                  </div>
                </li>
              </ul>
              </div>
              <span class="hex-clip absolute left-1/2 top-0 grid h-[104px] w-[120px] -translate-x-1/2 -translate-y-[62%] place-items-center text-white" :style="hexStyle(r.rank)" aria-hidden="true">
                <span class="font-display text-5xl font-medium italic leading-none">{{ r.rank }}<small class="ml-0.5 font-sans text-lg not-italic">{{ ordinal(r.rank) }}</small></span>
              </span>
            </article>
          </li>
        </ol>

        <!-- 4th – 7th -->
        <ol class="mt-24 grid grid-cols-1 gap-x-5 gap-y-16 sm:grid-cols-2 md:mt-28 md:grid-cols-4 md:items-start">
          <li v-for="(r, i) in rest" :key="r.id" :style="{ '--o': `${i * 46}px` }" class="md:mt-[var(--o)]">
            <div class="relative">
              <div class="chamfer bg-[#DDDDDD] p-2.5 [--c:26px]">
              <button
                type="button"
                class="chamfer group block w-full bg-white px-3 pb-6 pt-14 text-center transition-colors [--c:22px] hover:bg-[#FAFAFA]"
                :aria-expanded="expanded === r.id" aria-controls="ranking-more" :disabled="!r.voices.length" @click="toggle(r.id)"
              >
                <span class="sr-only">Rank {{ r.rank }}: </span>
                <span class="block min-h-[2.8em] whitespace-pre-line text-lg leading-snug" :style="{ color: titleColor(r.rank) }">{{ r.title }}</span>
                <span class="mt-3 block text-sm text-ink">({{ votes(r.count) }})</span>
                <span v-if="r.voices.length" class="mt-3 inline-flex items-center gap-1 text-[11px] text-ink-mute group-hover:text-brand-sky">
                  {{ expanded === r.id ? 'Close' : 'Read Comments' }}<Icon name="chevron-down" class="h-3 w-3 transition-transform" :class="{ 'rotate-180': expanded === r.id }" />
                </span>
              </button>
              </div>
              <span class="hex-clip absolute left-1/2 top-0 grid h-[90px] w-[104px] -translate-x-1/2 -translate-y-[55%] place-items-center text-white" :style="hexStyle(r.rank)" aria-hidden="true">
                <span class="font-display text-[40px] font-medium italic leading-none">{{ r.rank }}<small class="ml-0.5 font-sans text-base not-italic">{{ ordinal(r.rank) }}</small></span>
              </span>
            </div>
          </li>
        </ol>

        <div id="ranking-more" aria-live="polite">
          <div v-if="expandedReason" class="chamfer mt-12 bg-[#DDDDDD] p-3 [--c:30px]">
            <div class="chamfer bg-white px-5 py-6 sm:px-8 [--c:24px]">
              <h3 class="text-center text-lg" :style="{ color: titleColor(expandedReason.rank) }">What families said: #{{ expandedReason.rank }} {{ expandedReason.title.replace('\n', ' ') }} ({{ votes(expandedReason.count) }})</h3>
              <ul class="mt-6 grid gap-4 md:grid-cols-2">
                <li v-for="v in expandedReason.voices" :key="v.id" class="relative rounded border border-[#E5E5E5] px-4 py-4 pl-12">
                  <PeopleSocialBadge :platform="v.platform" class="absolute left-3 top-4" />
                  <p class="flex flex-wrap items-baseline justify-between gap-x-3 text-ink"><span class="text-sm">{{ v.name }}</span><span class="text-[11px] text-ink-soft">{{ v.profile ? `${v.profile}, ${v.time}` : v.time }}</span></p>
                  <p class="mt-2 text-xs leading-[1.8] text-ink">{{ v.text }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
