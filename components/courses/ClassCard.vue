<script setup lang="ts">
import type { AgeGroup, DanceClass, Genre } from '~/data/courses'

// Class card from choice.png: photo with genre tag, fee table, course row, instructors, rating chart.
const props = defineProps<{
  item: DanceClass
  genre?: Genre
  ageGroups: AgeGroup[]
  axes: { key: string, label: string }[]
  headingTag?: string
  trial?: boolean
}>()

const age = computed(() => props.ageGroups.find(a => a.id === props.item.ageGroup))
const avatarColors = ['#23AADD', '#FF9300', '#A66BF0', '#8DC21F', '#E86BB0']
const low = computed(() => props.item.remaining <= 2)
</script>

<template>
  <article class="flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)]">
    <div class="relative aspect-[3/2] overflow-hidden bg-paper">
      <img :src="item.image" :alt="`A ${genre?.nameJa ?? ''} class in action`" loading="lazy" decoding="async" class="h-full w-full object-cover">
      <span class="absolute left-0 top-3 py-1 pl-3 pr-5 text-xs font-medium text-white [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]" :style="{ backgroundColor: genre?.color }">{{ genre?.name }}</span>
      <span class="absolute right-2 top-2 rounded-full bg-white px-3 py-0.5 text-[11px] text-ink shadow-sm">{{ item.lessonType }}</span>
      <p class="hex-clip absolute left-1/2 top-1/2 flex h-[104px] w-[132px] -translate-x-1/2 -translate-y-1/2 -rotate-6 items-center justify-center bg-ink/90 px-5 text-center text-[12px] font-bold leading-snug text-white">
        {{ item.catch }}
      </p>
    </div>

    <div class="px-4 pb-4 pt-3">
      <component :is="headingTag ?? 'h3'" class="mb-2 text-base font-bold text-ink">{{ item.title }}</component>
      <dl class="grid grid-cols-[5.5em_1fr] gap-x-2 gap-y-1 text-[13px] leading-6 text-ink">
        <dt>Fee</dt>
        <dd class="-mt-1"><span class="font-display text-2xl font-bold italic text-brand-pink">¥{{ item.price.toLocaleString('en-US') }}</span>/month<span class="ml-1 whitespace-nowrap text-[11px] text-ink-mute">(tax incl.)</span></dd>
        <dt>Ages</dt>
        <dd>{{ age?.label }} ({{ age?.note }})</dd>
        <dt>Schedule</dt>
        <dd>{{ item.schedule }}</dd>
        <dt>Lessons</dt>
        <dd>{{ item.frequency }}</dd>
        <dt>Studio</dt>
        <dd>{{ item.studio }}</dd>
        <dt>Format</dt>
        <dd class="flex flex-wrap gap-1 py-0.5">
          <span v-for="d in item.delivery" :key="d" class="rounded-full px-2.5 text-[11px] leading-5 text-white" :class="d === 'Studio' ? 'bg-brand-sky' : 'bg-[#BBBBBB]'">{{ d }}</span>
        </dd>
        <dt>Capacity</dt>
        <dd>{{ item.capacity }} kids / <span class="text-brand-pink" :class="low && 'font-bold'">{{ item.remaining }} {{ item.remaining === 1 ? 'spot' : 'spots' }} left</span></dd>
      </dl>

      <p class="mt-3 bg-[#B99AF0] py-1 text-center text-sm font-medium tracking-[0.3em] text-white">COURSE</p>
      <div class="flex items-center gap-3 border border-t-0 border-paper px-3 py-2">
        <img v-if="genre" :src="genre.square" alt="" width="44" height="44" loading="lazy" decoding="async" class="h-11 w-11 rounded-full object-cover ring-2 ring-brand-sky ring-offset-2">
        <span class="text-base font-medium text-brand-sky">{{ genre?.nameJa }}</span>
      </div>

      <div class="mt-3 flex items-center gap-2">
        <ul class="flex -space-x-2" aria-label="Instructors">
          <li v-for="(n, i) in item.instructors.slice(0, 5)" :key="n" class="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white font-display text-[10px] font-semibold text-white" :style="{ backgroundColor: avatarColors[i % avatarColors.length] }" :title="n">
            {{ n.slice(0, 2) }}
          </li>
        </ul>
        <span class="text-xs text-brand-purple">{{ item.instructorCount }} instructors in all</span>
      </div>
    </div>

    <div class="mt-auto bg-paper-light px-6 pt-2">
      <CoursesRadarChart :axes="axes" :values="item.scores" :label="item.title" />
    </div>
    <NuxtLink :to="trial ? `/freetrial?class=${item.id}` : `/courses/${item.genreId}#${item.id}`" class="flex h-11 items-center justify-center gap-2 text-sm font-medium text-white transition-colors" :class="trial ? 'bg-brand-coral hover:bg-[#f0474f]' : 'bg-brand-sky hover:bg-[#1c98c8]'">
      {{ trial ? 'Book a Free Trial Lesson' : 'Learn More' }}<span class="sr-only"> ({{ item.title }})</span>
      <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 12h17m-6-6 6 6-6 6" /></svg>
    </NuxtLink>
  </article>
</template>
