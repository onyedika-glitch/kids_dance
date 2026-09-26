<script setup lang="ts">
import {
  activityHighlights, activityPhotos, activityStats, activityVoices, eventStatus,  type EventItem,
} from '~/data/events'

useSeoMeta({
  title: 'Our Activities',
  description: 'See what kids get up to at EYS-Kids Dance Academy: our yearly recital, guest instructor workshops, seasonal events and community performances.',
})

const { data } = await useFetch<EventItem[]>('/api/events', { default: () => [] })
const today = new Date(Date.now() + 9 * 3600_000).toISOString().slice(0, 10)
const upcoming = computed(() => (data.value ?? []).filter(e => !eventStatus(e).full && (e.end ?? e.start) >= today).slice(0, 3))

const { data: videos } = await useFetch('/api/videos', { query: { placement: 'activity' }, key: 'videos-activity', default: () => [] })
</script>

<template>
  <div class="bg-paper">
    <PageHero en="ACTIVITY" title="Our Activities" image="/images/activity/class.webp" alt="Kids dancing energetically in the studio" :crumbs="[{ label: 'Activities' }]" />

    <!-- Intro + numbers -->
    <section class="section bg-white" aria-labelledby="activity-intro">
      <div class="container-x">
        <SectionHeading>
          <h2 id="activity-intro" class="text-xl font-medium leading-relaxed text-ink sm:text-2xl">Beyond lessons, <br class="sm:hidden">more places to shine</h2>
          <p class="mt-4 text-sm leading-relaxed text-ink-soft">
            Recital stages, guest instructor workshops, seasonal parties, local festivals.<br class="hidden sm:inline">
            All year long, EYS-Kids dancers grow by stepping up to lots of real performances.
          </p>
        </SectionHeading>
        <ul class="mx-auto mt-10 grid max-w-[720px] grid-cols-3 gap-3 sm:gap-8">
          <li v-for="(s, i) in activityStats" :key="s.label" class="relative">
            <HexFrame :color="['#23AADD', '#A66BF0', '#FF9300'][i]" :strokes="i === 1">
              <div class="absolute inset-0 grid place-items-center text-center">
                <p>
                  <span class="mx-auto block max-w-[64px] text-[10px] leading-tight text-ink-soft sm:max-w-none sm:text-sm">{{ s.label }}</span>
                  <span class="font-display text-2xl font-bold sm:text-5xl" :style="{ color: ['#23AADD', '#A66BF0', '#FF9300'][i] }">{{ s.value }}</span><span class="text-[10px] text-ink sm:text-sm">{{ s.unit }}</span>
                </p>
              </div>
            </HexFrame>
          </li>
        </ul>
      </div>
    </section>

    <!-- Highlights (Celebration.png design language) -->
    <section class="py-16 md:py-20" aria-label="Main activities">
      <div class="container-x space-y-20">
        <article v-for="(h, i) in activityHighlights" :key="h.title" :aria-labelledby="`hl-${i}`">
          <EventRibbon :id="`hl-${i}`" :title="h.title" :bubble="h.bubble" class="relative z-10" />
          <div class="-mt-6 rounded-[28px] bg-band-ice px-5 pb-10 pt-14 sm:px-10">
            <div class="grid items-center gap-8 md:grid-cols-2">
              <img :src="h.image" :alt="h.alt" width="518" height="305" loading="lazy" decoding="async" class="chamfer aspect-[16/10] w-full object-cover" :class="i % 2 ? 'md:order-2' : ''">
              <div>
                <p class="text-sm leading-loose text-ink-soft md:text-[15px]">{{ h.lead }}</p>
                <ul class="mt-6 space-y-2">
                  <li v-for="p in h.points" :key="p" class="flex items-center gap-3 bg-white px-4 py-2.5 text-sm text-ink [clip-path:polygon(0_0,100%_0,95%_100%,0_100%)]">
                    <Icon name="check" class="h-4 w-4 shrink-0 text-brand-blue" />{{ p }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Voices (Comments.png) -->
    <section class="bg-white py-16" aria-labelledby="voices-title">
      <div class="container-x">
        <h2 id="voices-title" class="text-center text-xl font-medium text-ink sm:text-2xl">In the Kids' Own Words</h2>
        <ul class="mt-10 grid gap-8 sm:grid-cols-3">
          <li v-for="v in activityVoices" :key="v.who" class="text-center">
            <p class="relative mx-auto flex min-h-[110px] max-w-[280px] items-center justify-center rounded-[50%] px-8 py-5 text-sm leading-relaxed text-white" :style="{ backgroundColor: v.color }">
              {{ v.text }}
              <span class="absolute -bottom-2 left-12 h-4 w-5 [clip-path:polygon(0_0,100%_0,0_100%)]" :style="{ backgroundColor: v.color }" aria-hidden="true" />
            </p>
            <p class="mt-4 text-xs text-ink-soft">{{ v.who }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- Photo grid -->
    <section class="section" aria-labelledby="gallery-title">
      <div class="container-x">
        <SectionHeading en="GALLERY" title="Activity Photos" />
        <ul class="mt-10 grid auto-rows-[140px] grid-cols-2 gap-3 sm:auto-rows-[180px] md:grid-cols-4">
          <li v-for="p in activityPhotos" :key="p.src + p.caption" class="group relative overflow-hidden" :class="p.wide ? 'col-span-2 row-span-2' : ''">
            <img :src="p.src" :alt="p.alt" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
            <span class="absolute bottom-2 left-2 bg-white/90 px-3 py-1 text-[11px] text-ink [clip-path:polygon(6px_0,100%_0,calc(100%-6px)_100%,0_100%)]">{{ p.caption }}</span>
          </li>
        </ul>
      </div>
    </section>

    <!-- Videos (Video.png) -->
    <section aria-labelledby="video-title">
      <EventVideoCarousel v-if="videos.length" title="Activity Videos" heading-tag="h2" :videos="videos" />
    </section>

    <!-- Upcoming events -->
    <section v-if="upcoming.length" class="section bg-lilac" aria-labelledby="upcoming-title">
      <div class="container-x">
        <h2 id="upcoming-title" class="text-center text-xl font-medium text-ink sm:text-2xl">Upcoming Events</h2>
        <ul class="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="e in upcoming" :key="e.id"><EventCard :event="e" /></li>
        </ul>
        <div class="mt-12 text-center">
          <SkewButton to="/events" color="blue">View All Events</SkewButton>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
