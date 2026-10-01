<script setup lang="ts">
import { formatDate } from '~/data/news'
import type { NewsSummary } from '~/data/news'

// Update card: poster image, category tag, date, title, excerpt
withDefaults(defineProps<{ item: NewsSummary, showTag?: boolean }>(), { showTag: false })
</script>

<template>
  <article class="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_2px_10px_rgba(11,31,79,0.10)] transition hover:-translate-y-1 hover:shadow-[0_8px_22px_rgba(11,31,79,0.14)]">
    <div class="relative aspect-video overflow-hidden bg-paper">
      <img :src="item.image.replace(/\.webp$/, '-sm.webp')" :alt="item.alt" width="480" height="270" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
      <NewsTag v-if="showTag" :category="item.category" class="absolute left-3 top-3" />
      <span v-if="item.video" class="absolute bottom-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-brand-coral shadow" aria-hidden="true"><Icon name="play" class="ml-0.5 h-4 w-4" /></span>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <time :datetime="item.date" class="text-xs font-bold text-ink-mute">{{ formatDate(item.date) }}</time>
      <h3 class="mt-1.5 line-clamp-2 text-lg font-semibold leading-snug text-ink">
        <NuxtLink :to="`/news/${item.id}`" class="after:absolute after:inset-0 after:z-10 focus-visible:outline-none after:focus-visible:rounded-3xl after:focus-visible:ring-2 after:focus-visible:ring-brand-sky">{{ item.title }}</NuxtLink>
      </h3>
      <p class="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{{ item.excerpt }}</p>
      <span class="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-bold text-brand-sky" aria-hidden="true">Read more<Icon name="chevron" class="h-3.5 w-3.5 transition group-hover:translate-x-1" /></span>
    </div>
  </article>
</template>
