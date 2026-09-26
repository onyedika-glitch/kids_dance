<script setup lang="ts">
import { genreLabel, type StudioCardData } from '~/data/studios'

// Search result card (jer.png): photo, building name, address, access, "Learn more"
withDefaults(defineProps<{ studio: StudioCardData, layout?: 'grid' | 'list' }>(), { layout: 'grid' })
</script>

<template>
  <article class="flex h-full gap-4 bg-white p-3 shadow-[0_3px_8px_rgba(0,0,0,0.12)] sm:p-4" :class="layout === 'list' ? 'sm:gap-6' : ''">
    <NuxtLink :to="`/studios/${studio.id}`" class="block shrink-0 self-start" tabindex="-1" aria-hidden="true">
      <img :src="studio.cardImage" :alt="`${studio.name} exterior`" width="200" height="200" loading="lazy" decoding="async"
        class="aspect-square w-[104px] object-cover sm:w-[140px] md:w-[150px]" :class="layout === 'list' ? 'md:w-[180px]' : ''">
    </NuxtLink>
    <div class="flex min-w-0 flex-1 flex-col">
      <h3 class="text-center font-display text-[15px] tracking-wide text-ink sm:text-base">
        <NuxtLink :to="`/studios/${studio.id}`" class="hover:text-brand-purple">{{ studio.building }}</NuxtLink>
      </h3>
      <p class="mt-0.5 text-center text-[11px] text-ink-mute">{{ studio.name }}</p>
      <dl class="mt-3 space-y-2 text-[12px] leading-snug text-ink-soft">
        <div class="flex gap-1.5">
          <dt class="shrink-0"><Icon name="pin" class="h-4 w-4 text-ink" /><span class="sr-only">Address</span></dt>
          <dd>{{ studio.address }}<template v-if="studio.addressNote"><br>{{ studio.addressNote }}</template></dd>
        </div>
        <div class="flex gap-1.5">
          <dt class="shrink-0"><Icon name="train" class="h-4 w-4 text-ink" /><span class="sr-only">Access</span></dt>
          <dd>{{ studio.access }}</dd>
        </div>
      </dl>
      <ul v-if="layout === 'list'" class="mt-3 flex flex-wrap gap-1.5" aria-label="Genres offered">
        <li v-for="g in studio.genres" :key="g" class="border border-brand-purple/40 px-2 py-0.5 text-[11px] text-brand-purple">{{ genreLabel(g) }}</li>
      </ul>
      <div class="mt-auto flex justify-end pt-3">
        <SkewButton :to="`/studios/${studio.id}`" color="purple" size="sm" :aria-label="`Learn more about ${studio.name}`">Learn more</SkewButton>
      </div>
    </div>
  </article>
</template>
