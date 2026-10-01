<script setup lang="ts">
import type { ChannelStats } from '~/server/api/stats.get'

// Channel figures (split-flap counters). Only real numbers from /api/stats; the block hides when all are null.
const props = defineProps<{ stats: ChannelStats | null }>()

const items = computed(() => {
  const s = props.stats
  if (!s) return []
  const out: { value: number, suffix?: string, label: string, note?: string, color: string, icon: 'play' | 'star' | 'book' | 'sparkle' }[] = []
  if (s.plays) out.push({ value: s.plays, suffix: '+', label: 'video plays', note: s.asOf ? `as of ${s.asOf}` : undefined, color: '#E53935', icon: 'play' })
  if (s.recommendPct != null && s.reviews) out.push({ value: s.recommendPct, suffix: '%', label: 'recommend us', note: `from ${s.reviews} ${s.reviews === 1 ? 'review' : 'reviews'}`, color: '#EE6D0C', icon: 'star' })
  if (s.videos) out.push({ value: s.videos, label: s.videos === 1 ? 'learning video' : 'learning videos', note: 'and counting', color: '#1E88E5', icon: 'sparkle' })
  if (s.letters) out.push({ value: s.letters, label: 'letters of the alphabet', note: 'filmed so far', color: '#3DAA3C', icon: 'book' })
  return out
})
</script>

<template>
  <section v-if="items.length" class="relative bg-white py-12 md:py-16" aria-labelledby="stats-title">
    <div class="container-wide">
      <h2 id="stats-title" class="text-center text-2xl font-semibold text-ink sm:text-3xl">Little videos, big smiles</h2>
      <ul class="mx-auto mt-8 grid max-w-[1080px] grid-cols-2 gap-3 sm:gap-4 lg:gap-6" :class="items.length >= 4 ? 'lg:grid-cols-4' : items.length === 3 ? 'lg:grid-cols-3' : ''">
        <li v-for="it in items" :key="it.label" class="rounded-3xl border-2 border-dashed bg-paper-light px-3 py-5 text-center sm:px-5 sm:py-6" :style="{ borderColor: `${it.color}55` }">
          <span class="mx-auto grid h-10 w-10 place-items-center rounded-full text-white" :style="{ backgroundColor: it.color }" aria-hidden="true"><Icon :name="it.icon" class="h-5 w-5" /></span>
          <p class="mt-3 flex items-center justify-center gap-1 text-lg sm:text-2xl">
            <HomeFlapNumber :value="it.value" :color="it.color" />
            <span v-if="it.suffix" class="font-display text-[1.4em] font-bold leading-none" :style="{ color: it.color }">{{ it.suffix }}</span>
          </p>
          <p class="mt-3 font-display text-base font-semibold leading-tight text-ink sm:text-lg">{{ it.label }}</p>
          <p v-if="it.note" class="mt-1 text-xs font-semibold text-ink-mute">{{ it.note }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
