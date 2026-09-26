<script setup lang="ts">
import { formatDate } from '~/data/news'
import type { NewsSummary } from '~/data/news'

// Topic card with category tab, media and staff comment (News.png)
defineProps<{ item: NewsSummary }>()
</script>

<template>
  <article class="group relative flex h-full flex-col rounded-lg bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_6px_18px_rgba(0,0,0,0.16)]">
    <div class="flex items-start justify-between pr-3 pt-2">
      <NewsTag :category="item.category" class="-ml-1.5" />
      <time :datetime="item.date" class="font-display text-[10px] text-ink-mute">UPDATED {{ formatDate(item.date) }}</time>
    </div>
    <div class="px-4 pt-3">
      <h3 class="text-[15px] font-medium leading-snug text-ink">
        <NuxtLink :to="`/news/${item.id}`" class="after:absolute after:inset-0 after:rounded-lg">{{ item.title }}</NuxtLink>
      </h3>
      <p class="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-soft">{{ item.excerpt }}</p>
    </div>
    <div class="relative mt-3 aspect-[16/11] overflow-hidden bg-paper">
      <img :src="item.image" :alt="item.alt" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <span v-if="item.video" class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span class="flex h-11 w-11 items-center justify-center rounded-full border-2 border-white bg-white/60 text-white"><Icon name="play" class="ml-0.5 h-5 w-5 text-[#999]" /></span>
      </span>
    </div>
    <div class="flex items-center gap-3 px-4 pt-3">
      <span class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-white bg-lilac text-sm font-medium text-brand-purple shadow" aria-hidden="true">{{ item.author.name.slice(0, 1) }}</span>
      <p class="text-[11px] leading-tight text-ink-mute">{{ formatDate(item.date) }}<span class="mt-1 block text-[13px] text-ink">{{ item.author.name }}</span></p>
    </div>
    <div class="m-3 mt-2 flex-1 rounded bg-paper-light p-3"><p class="line-clamp-3 text-[11px] leading-relaxed text-ink-soft">{{ item.comment }}</p></div>
  </article>
</template>
