<script setup lang="ts">
import { formatDate } from '~/data/news'
import type { NewsSummary } from '~/data/news'

// Article card with photo and outlined "Read this article" button (New.png)
withDefaults(defineProps<{ item: NewsSummary, showTag?: boolean }>(), { showTag: false })
</script>

<template>
  <article class="group relative flex h-full flex-col bg-white shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow hover:shadow-[0_6px_16px_rgba(0,0,0,0.16)]">
    <div class="relative aspect-[230/179] overflow-hidden bg-paper">
      <img :src="item.image" :alt="item.alt" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
      <NewsTag v-if="showTag" :category="item.category" class="absolute left-0 top-3" />
    </div>
    <div class="flex flex-1 flex-col px-4 pb-4 pt-3">
      <time :datetime="item.date" class="font-display text-[10px] text-ink-mute">{{ formatDate(item.date) }}</time>
      <h3 class="mt-1 line-clamp-2 text-sm font-medium leading-snug text-ink">
        <NuxtLink :to="`/news/${item.id}`" class="after:absolute after:inset-0 after:z-10">{{ item.title }}</NuxtLink>
      </h3>
      <p class="mb-4 mt-3 line-clamp-3 text-xs leading-relaxed text-ink-soft">{{ item.excerpt }}</p>
      <span class="skew-box mx-auto mt-auto block w-[82%] bg-brand-sky p-px" aria-hidden="true">
        <span class="skew-box flex h-[34px] items-center justify-center gap-6 bg-white text-xs text-brand-sky transition-colors group-hover:bg-brand-sky group-hover:text-white">Read Article<Icon name="chevron" class="h-3.5 w-3.5" /></span>
      </span>
    </div>
  </article>
</template>
