<script setup lang="ts">
import type { Photo } from '~/data/studios'

// Main photo + thumbnail switcher inside the chamfered card (down.png / explore.png)
const props = defineProps<{ photos: Photo[], label: string }>()
const current = ref(0)
const go = (d: number) => { current.value = (current.value + d + props.photos.length) % props.photos.length }
</script>

<template>
  <div role="region" :aria-label="`Photos of ${label}`" aria-roledescription="carousel" @keydown.left.prevent="go(-1)" @keydown.right.prevent="go(1)">
    <div class="relative aspect-[1000/563] overflow-hidden bg-paper">
      <Transition name="fade" mode="out-in">
        <img :key="current" :src="photos[current].src" :alt="photos[current].alt" width="1000" height="563" decoding="async" class="absolute inset-0 h-full w-full object-cover">
      </Transition>
      <template v-if="photos.length > 1">
        <button type="button" class="absolute left-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/85 text-ink shadow hover:bg-white" aria-label="Previous photo" @click="go(-1)">
          <Icon name="chevron-left" class="h-5 w-5" />
        </button>
        <button type="button" class="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center bg-white/85 text-ink shadow hover:bg-white" aria-label="Next photo" @click="go(1)">
          <Icon name="chevron" class="h-5 w-5" />
        </button>
      </template>
      <p class="sr-only" aria-live="polite">{{ current + 1 }} / {{ photos.length }}: {{ photos[current].alt }}</p>
    </div>
    <ul v-if="photos.length > 1" class="flex flex-wrap justify-center gap-1.5 bg-white p-1.5 sm:gap-2 sm:p-2">
      <li v-for="(p, i) in photos" :key="i" class="w-[calc(25%-5px)] sm:w-[calc(12.5%-7px)]">
        <button type="button" class="relative block aspect-[115/64] w-full overflow-hidden" :aria-label="`Photo ${i + 1}: ${p.alt}`" :aria-current="i === current" @click="current = i">
          <img :src="p.src" alt="" width="115" height="64" loading="lazy" decoding="async" class="h-full w-full object-cover transition-opacity" :class="i === current ? '' : 'opacity-60 hover:opacity-100'">
          <span v-if="i === current" class="absolute inset-0 ring-2 ring-inset ring-brand-sky" aria-hidden="true" />
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
