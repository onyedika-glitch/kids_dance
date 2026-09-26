<script setup lang="ts">
import type { StudioCardData } from '~/data/studios'

// Result block from jer.png: purple tab label, live map of the results, grid/list toggle, studio cards.
const props = defineProps<{
  studios: StudioCardData[]
  title: string
}>()

const layout = ref<'grid' | 'list'>('grid')
const PAGE = 6
const shown = ref(PAGE)
watch(() => props.studios, () => { shown.value = PAGE })
const visible = computed(() => props.studios.slice(0, shown.value))
</script>

<template>
  <div>
    <div class="flex justify-center">
      <h2 class="skew-box bg-brand-purple px-8 py-2 text-center text-[13px] text-white sm:px-10 sm:text-sm">{{ title }}</h2>
    </div>

    <div v-if="studios.length" class="mt-6 bg-white p-1.5 shadow-[0_3px_8px_rgba(0,0,0,0.12)] sm:p-2">
      <StudioMap :points="studios" :label="`Map: ${title}`" class="aspect-[4/3] w-full sm:aspect-[920/380]" />
    </div>

    <div class="mt-8 flex items-center justify-between gap-4">
      <p class="text-sm text-ink-soft" aria-live="polite"><span class="font-display text-lg text-ink">{{ studios.length }}</span> {{ studios.length === 1 ? 'studio' : 'studios' }}</p>
      <div class="flex" role="group" aria-label="Layout">
        <button type="button" class="grid h-10 w-10 place-items-center border border-paper" :class="layout === 'grid' ? 'bg-brand-purple text-white' : 'bg-white text-ink-mute'" :aria-pressed="layout === 'grid'" aria-label="Grid view" @click="layout = 'grid'">
          <svg viewBox="0 0 20 20" class="h-5 w-5" fill="currentColor" aria-hidden="true"><rect v-for="i in 9" :key="i" :x="2 + ((i - 1) % 3) * 6" :y="2 + Math.floor((i - 1) / 3) * 6" width="4" height="4" /></svg>
        </button>
        <button type="button" class="grid h-10 w-10 place-items-center border border-paper" :class="layout === 'list' ? 'bg-brand-purple text-white' : 'bg-white text-ink-mute'" :aria-pressed="layout === 'list'" aria-label="List view" @click="layout = 'list'">
          <svg viewBox="0 0 20 20" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M3 5h14M3 10h14M3 15h14" /></svg>
        </button>
      </div>
    </div>

    <ul v-if="studios.length" class="mt-4 grid gap-5 sm:gap-6" :class="layout === 'grid' ? 'md:grid-cols-2' : ''">
      <li v-for="s in visible" :key="s.id"><StudioCard :studio="s" :layout="layout" /></li>
    </ul>
    <div v-else class="mt-4 bg-white px-6 py-12 text-center text-sm text-ink-soft shadow-[0_3px_8px_rgba(0,0,0,0.12)]">
      No studios match your search.<br>Try changing your filters and searching again.
      <slot name="empty" />
    </div>
    <div v-if="shown < studios.length" class="mt-8 text-center">
      <SkewButton color="white" class="border border-brand-sky" @click="shown += PAGE">Load more</SkewButton>
    </div>
  </div>
</template>
