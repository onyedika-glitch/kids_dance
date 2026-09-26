<script setup lang="ts">
import type { Genre } from '~/data/courses'

// "EYS-Kids Dance Academy Courses" thumbnail grid (Cont.png)
withDefaults(defineProps<{
  genres: Genre[]
  title?: string
  current?: string
}>(), { title: 'EYS-Kids Dance Academy Courses' })

const breaks: Record<string, string> = {
  'Kids Rhythm Dance': 'Kids\nRhythm Dance',
  'Theme Park Dance': 'Theme\nPark Dance',
  'Breakin\' / Acrobatics': 'Breakin\' /\nAcrobatics',
}
</script>

<template>
  <div>
    <h2 class="skew-box flex min-h-[52px] items-center justify-center bg-brand-sky px-8 py-2 text-center text-[15px] font-medium text-white sm:min-h-[60px] sm:text-base">
      {{ title }}
    </h2>
    <ul class="mx-auto mt-6 grid max-w-[940px] grid-cols-2 gap-x-3 gap-y-3 sm:gap-x-6 sm:gap-y-4 md:grid-cols-4 md:gap-y-8">
      <li v-for="g in genres" :key="g.id">
        <NuxtLink
          :to="`/courses/${g.id}`"
          class="group flex h-16 items-center sm:h-[84px] bg-white shadow-[0_3px_8px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_6px_14px_rgba(0,0,0,0.16)]"
          :aria-current="current === g.id ? 'page' : undefined"
          :class="current === g.id && 'ring-2 ring-brand-sky'"
        >
          <img :src="g.square" :alt="`Kids in a ${g.nameJa} class`" width="84" height="84" loading="lazy" decoding="async" class="h-16 w-16 shrink-0 object-cover sm:h-[84px] sm:w-[84px]">
          <span class="flex-1 whitespace-pre-line px-1 text-center text-[13px] leading-5 text-ink-soft sm:px-2 sm:text-sm sm:leading-6 group-hover:text-brand-sky">{{ breaks[g.name] ?? g.name }}</span>
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
