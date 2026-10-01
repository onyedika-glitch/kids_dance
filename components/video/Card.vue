<script setup lang="ts">
import { categoryOf, formatDuration, videoThumb, type VideoItem } from '~/data/videos'

// Video tile: thumbnail, play badge, letter chip, category and like count. Links to /videos/<slug>.
defineProps<{ video: VideoItem }>()
</script>

<template>
  <NuxtLink :to="`/videos/${video.slug}`" class="group block h-full drop-shadow-card transition hover:-translate-y-1">
    <article class="chamfer chamfer-sm flex h-full flex-col bg-white">
      <div class="relative aspect-video overflow-hidden bg-paper">
        <img :src="videoThumb(video, 'sm')" alt="" width="480" height="270" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
        <span class="absolute inset-0 grid place-items-center" aria-hidden="true">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-white/90 text-brand-coral shadow-lg transition group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-ink">
            <Icon name="play" class="ml-1 h-7 w-7" />
          </span>
        </span>
        <span v-if="video.letter" class="absolute left-3 top-3 grid h-11 w-11 place-items-center rounded-2xl bg-white font-display text-2xl font-bold text-brand-sky shadow-pop" aria-hidden="true">{{ video.letter }}</span>
        <span v-if="video.youtubeId && !video.mediaFile" class="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-brand-coral px-2 py-0.5 text-[11px] font-bold text-white"><Icon name="youtube" class="h-3.5 w-3.5" />YouTube</span>
        <span v-if="video.duration" class="absolute bottom-3 right-3 rounded-full bg-ink/75 px-2 py-0.5 text-xs font-bold text-white">{{ formatDuration(video.duration) }}</span>
      </div>
      <div class="flex flex-1 flex-col p-4">
        <span class="self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" :style="{ backgroundColor: categoryOf(video.category).color }">{{ categoryOf(video.category).label }}</span>
        <h3 class="mt-2 text-lg font-semibold leading-snug text-ink">{{ video.title }}</h3>
        <p v-if="video.likes" class="mt-auto flex items-center gap-1 pt-3 text-xs font-bold text-brand-coral"><Icon name="heart" class="h-3.5 w-3.5" />{{ video.likes }} {{ video.likes === 1 ? 'like' : 'likes' }}</p>
      </div>
    </article>
  </NuxtLink>
</template>
