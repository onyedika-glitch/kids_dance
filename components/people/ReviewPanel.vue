<script setup lang="ts">
import type { Instructor, InstructorReview } from '~/data/instructors'

// Review summary (radar charts) + review list with a "See more" button (User.png).
const props = defineProps<{
  ratings: Instructor['ratings']
  reviews: InstructorReview[]
}>()

const shown = ref(1)
const visible = computed(() => props.reviews.slice(0, shown.value))
const summaries = computed(() => [
  { key: 'trial', title: 'Trial lesson', suffix: 'ratings', tone: 'blue' as const, color: '#8FB0F2', data: props.ratings.trial },
  { key: 'regular', title: 'Member', suffix: 'ratings', tone: 'pink' as const, color: '#F49AC4', data: props.ratings.regular },
])
</script>

<template>
  <div class="grid gap-10 lg:grid-cols-[300px_1fr] lg:gap-12">
    <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
      <section v-for="s in summaries" :key="s.key" class="flex flex-col items-center lg:items-start">
        <div class="flex items-end gap-4 self-start">
          <div class="flex flex-col items-center">
            <PeopleRankStar :rank="s.data.rank" :color="s.color" class="h-9 w-9 text-base" />
            <span class="font-display text-sm font-semibold italic" :style="{ color: s.color }">{{ s.data.score.toFixed(1) }}</span>
          </div>
          <h4 class="pb-4 text-xl text-ink">{{ s.title }}<small class="ml-1 text-xs">{{ s.suffix }}</small></h4>
          <p class="pb-4 text-xs text-ink">({{ s.data.count }} {{ s.data.count === 1 ? 'review' : 'reviews' }})</p>
        </div>
        <PeopleRadarChart :axes="s.data.axes" :tone="s.tone" :title="`${s.title} ${s.suffix}`" class="mt-2" />
      </section>
    </div>

    <div class="relative rounded-md border border-[#DDD] bg-white">
      <article v-for="(r, idx) in visible" :key="r.id" :class="{ 'border-t border-[#DDD]': idx > 0 }">
        <header class="flex flex-col gap-4 rounded-t-md bg-paper-light px-5 py-5 sm:flex-row sm:items-center sm:px-6">
          <img :src="r.avatar" :alt="r.name" width="90" height="90" loading="lazy" decoding="async" class="h-20 w-20 shrink-0 rounded-full border-4 border-white object-cover shadow-[0_2px_8px_rgba(0,0,0,.25)] sm:h-[90px] sm:w-[90px]" />
          <div class="min-w-0 text-ink">
            <p class="flex flex-wrap items-baseline gap-x-8 gap-y-1"><span class="text-base">{{ r.name }}</span><span class="text-xs">{{ r.profile }}</span></p>
            <dl class="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px]">
              <div class="mr-3 flex items-center gap-3"><dt class="border border-[#CCC] bg-white px-3 py-0.5">Genre</dt><dd>{{ r.genre }}</dd></div>
              <div class="flex items-center gap-3"><dt class="border border-[#CCC] bg-white px-3 py-0.5">Course</dt><dd>{{ r.course }}</dd></div>
            </dl>
            <dl class="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
              <div class="mr-6 flex gap-x-4"><dt>Free trial lesson</dt><dd class="whitespace-nowrap">{{ r.trialDate }}</dd></div>
              <div class="flex gap-x-4"><dt>Joined</dt><dd class="whitespace-nowrap">{{ r.joinDate }}</dd></div>
            </dl>
          </div>
        </header>
        <div class="divide-y divide-[#DDD] px-5 sm:px-6">
          <section v-for="part in [{ key: 'trial', title: 'Trial lesson', suffix: 'review', data: r.trial }, { key: 'regular', title: 'As a member', suffix: 'review', data: r.regular }]" :key="part.key" class="grid gap-5 py-6 md:grid-cols-[1fr_190px] md:gap-8">
            <div>
              <h4 class="border-l-4 border-ink pl-3 text-sm text-ink">{{ part.title }}<span class="ml-2 text-xs">{{ part.suffix }}</span></h4>
              <p class="mt-4 text-[13px] leading-[1.9] text-ink">{{ part.data.text }}</p>
            </div>
            <div>
              <p class="flex items-center gap-3 text-sm text-ink">Overall <PeopleStars :score="part.data.total" class="text-base" /><span class="font-display text-lg text-[#E60012]">{{ part.data.total.toFixed(1) }}</span></p>
              <dl class="mt-3 grid grid-cols-[1fr_auto] gap-y-1 text-[11px] text-ink">
                <template v-for="it in part.data.items" :key="it.label">
                  <dt>{{ it.label }}</dt>
                  <dd class="flex items-center gap-1"><PeopleStars :score="it.score" class="text-[11px]" /><span class="font-display text-xs text-[#E60012]">{{ it.score.toFixed(1) }}</span></dd>
                </template>
              </dl>
            </div>
          </section>
        </div>
      </article>
      <div class="flex justify-center pb-6 pt-2">
        <button
          v-if="shown < reviews.length" type="button"
          class="inline-flex h-10 -skew-x-[20deg] items-center border border-brand-sky bg-white px-12 text-brand-sky transition-colors hover:bg-brand-sky hover:text-white"
          @click="shown++"
        >
          <span class="flex skew-x-[20deg] items-center gap-8 text-sm">See More<Icon name="chevron-down" class="h-4 w-4" /></span>
        </button>
        <p v-else class="text-xs text-ink-mute">Showing all {{ reviews.length }} {{ reviews.length === 1 ? 'review' : 'reviews' }}</p>
      </div>
    </div>
  </div>
</template>
