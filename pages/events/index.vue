<script setup lang="ts">
import {
  applySteps, eventTypes, perks, recitalNotes, recitalPhotos, steLam, typeBlocks, 
  type EventItem, type EventType,
} from '~/data/events'

useSeoMeta({
  title: 'Events & Recitals',
  description: 'Schedules for EYS-Kids Dance Academy\'s Yubi Fest recital, workshops and seasonal events. Check availability and book here.',
})

const { data } = await useFetch<EventItem[]>('/api/events', { default: () => [] })
const all = computed(() => data.value ?? [])
const featured = computed(() => all.value.filter(e => e.featured))
const byType = (t: EventType) => all.value.filter(e => e.type === t && !e.featured)
const block = (t: EventType) => typeBlocks.find(b => b.type === t)!

// Schedule filter, kept in the URL (?type=) so it can be linked to
const route = useRoute()
const router = useRouter()
const isType = (v: unknown): v is EventType => eventTypes.some(t => t.value === v)
const filter = ref<EventType | 'all'>('all')
// Applied after hydration: the page is prerendered without the query
onMounted(() => {
  const t = new URLSearchParams(window.location.search).get('type') ?? route.query.type
  if (isType(t)) filter.value = t
})
watch(() => route.query.type, (t) => {
  if (isType(t) && t !== filter.value) filter.value = t
})
const PAGE = 8
const shown = ref(PAGE)
const filtered = computed(() => filter.value === 'all' ? all.value : all.value.filter(e => e.type === filter.value))
const visible = computed(() => filtered.value.slice(0, shown.value))
const count = (t: EventType | 'all') => t === 'all' ? all.value.length : all.value.filter(e => e.type === t).length

function setFilter(t: EventType | 'all') {
  filter.value = t
  shown.value = PAGE
  router.replace({ query: { ...route.query, type: t === 'all' ? undefined : t }, hash: route.hash })
}

function showWorkshops() {
  setFilter('workshop')
  nextTick(() => document.getElementById('schedule')?.scrollIntoView({ behavior: 'smooth' }))
}

const filters = [{ value: 'all' as const, label: 'All', color: '#333333' }, ...eventTypes]
const shapes: Record<string, string> = {
  diamond: 'polygon(50% 0,100% 50%,50% 100%,0 50%)',
  circle: 'circle(50% at 50% 50%)',
  pentagon: 'polygon(50% 0,100% 38%,82% 100%,18% 100%,0 38%)',
  triangle: 'polygon(0 0,100% 50%,0 100%)',
}

const { data: videos } = await useFetch('/api/videos', { query: { placement: 'workshop' }, key: 'videos-workshop', default: () => [] })
</script>

<template>
  <div class="overflow-x-clip bg-paper">
    <PageHero en="EVENT" title="Events & Recitals" image="/images/events/stage-class.webp" alt="Kids dancing in the studio" :crumbs="[{ label: 'Events' }]" />

    <!-- Jump links -->
    <nav aria-label="Event types" class="container-x pt-10">
      <ul class="flex flex-wrap justify-center gap-3">
        <li v-for="t in eventTypes" :key="t.value">
          <a :href="`#${t.value}`" class="skew-box inline-flex h-11 items-center gap-2 bg-white px-7 text-sm text-ink transition hover:bg-[var(--tc)] hover:text-white" :style="{ '--tc': t.color }">
            <span class="h-2 w-2 rounded-full" :style="{ backgroundColor: t.color }" aria-hidden="true" />{{ t.label }}
          </a>
        </li>
      </ul>
    </nav>

    <!-- Recitals (event.png + const.png + Plans.png) -->
    <section id="recital" class="scroll-mt-24 pt-20" aria-labelledby="recital-title">
      <div class="container-x">
        <EventRibbon id="recital-title" :title="block('recital').title" :bubble="block('recital').bubble" class="relative z-10" />
        <div class="-mt-6 rounded-[28px] bg-band-ice px-5 pb-10 pt-14 sm:px-10">
          <div class="grid items-center gap-8 md:grid-cols-2">
            <p class="text-center text-sm leading-loose text-ink-soft md:text-[15px]">{{ block('recital').lead }}</p>
            <figure class="relative">
              <div class="chamfer overflow-hidden">
                <img src="/images/events/stage-class.webp" alt="Kids practicing for the stage" width="518" height="305" loading="lazy" decoding="async" class="aspect-[16/9] w-full object-cover">
              </div>
              <figcaption class="absolute inset-x-0 bottom-0 bg-ink/45 px-4 py-3 text-center text-sm font-medium leading-relaxed text-white sm:text-base">{{ block('recital').catch }}</figcaption>
            </figure>
          </div>

          <div class="relative mt-14">
            <p v-for="n in recitalNotes" :key="n.side" class="relative z-10 mb-3 w-fit max-w-[260px] bg-white px-8 py-2 text-[13px] leading-relaxed text-ink shadow-[0_2px_6px_rgba(0,0,0,.1)] [clip-path:polygon(10%_0,100%_0,90%_100%,0_100%)] md:absolute md:-top-10 md:mb-0" :class="n.side === 'left' ? 'md:-left-14' : 'ml-auto md:-right-14'">
              {{ n.text }}
            </p>
            <ul class="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4 md:px-16">
              <li v-for="p in recitalPhotos" :key="p.src" class="bg-white p-[2px] [clip-path:polygon(16%_0,84%_0,100%_14%,100%_100%,0_100%,0_14%)]">
                <img :src="p.src" :alt="p.alt" width="216" height="216" loading="lazy" decoding="async" class="aspect-square w-full object-cover [clip-path:polygon(16%_0,84%_0,100%_14%,100%_100%,0_100%,0_14%)]">
              </li>
            </ul>
          </div>

          <!-- Performer perks -->
          <div class="relative mx-auto mt-16 max-w-[560px]">
            <h3 class="skew-box relative z-10 mx-auto w-fit bg-brand-blue px-14 py-2.5 text-xl font-medium tracking-wide text-white">Performer Perks</h3>
            <div class="-mt-6 bg-brand-blue p-[2px] [clip-path:polygon(24px_0,calc(100%-24px)_0,100%_24px,100%_calc(100%-24px),calc(100%-24px)_100%,24px_100%,0_calc(100%-24px),0_24px)]">
              <div class="bg-white px-5 pb-8 pt-10 [clip-path:polygon(23px_0,calc(100%-23px)_0,100%_23px,100%_calc(100%-23px),calc(100%-23px)_100%,23px_100%,0_calc(100%-23px),0_23px)] sm:px-8">
                <p class="text-center text-[13px] leading-loose text-ink-soft">{{ perks.lead }}</p>
                <ol class="mt-6 space-y-4">
                  <li v-for="(item, i) in perks.items" :key="i" class="flex items-center gap-4 bg-[#B9D3E0] px-5 py-3 [clip-path:polygon(0_0,100%_0,92%_100%,0_100%)]" :class="i % 2 ? 'sm:ml-16 sm:[clip-path:polygon(8%_0,100%_0,92%_100%,0_100%)]' : 'sm:mr-10'">
                    <span class="hex-clip grid h-10 w-11 shrink-0 place-items-center bg-white p-[2px]">
                      <span class="hex-clip grid h-full w-full place-items-center bg-brand-blue font-display text-lg text-white">{{ i + 1 }}</span>
                    </span>
                    <span class="text-sm font-medium leading-snug text-brand-blue">{{ item }}</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming recitals (Plans.png) -->
      <div class="container-x relative">
        <p class="relative mx-auto -mt-6 w-fit max-w-full -rotate-3 bg-brand-purple px-10 py-5 text-center text-[15px] leading-relaxed text-white [clip-path:polygon(0_12%,100%_0,94%_88%,60%_88%,56%_100%,52%_86%,6%_92%)] sm:px-16 sm:text-lg">
          Once a year, every class gets<br>its own moment on a wonderful stage
        </p>
        <ul class="mt-12 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          <li v-for="e in byType('recital')" :key="e.id" class="w-[80%] shrink-0 snap-center sm:w-auto"><EventCard :event="e" /></li>
        </ul>
      </div>
    </section>

    <!-- Workshops (even.png + Comment.png + Comments.png + Video.png) -->
    <section id="workshop" class="scroll-mt-24 pt-24" aria-labelledby="workshop-title">
      <div class="container-x">
        <EventRibbon id="workshop-title" :title="block('workshop').title" :bubble="block('workshop').bubble" class="relative z-10" />
        <div class="-mt-6 rounded-t-[28px] bg-band-ice px-5 pb-10 pt-14 sm:px-10">
          <div class="grid items-center gap-8 md:grid-cols-2">
            <p class="text-center text-sm leading-loose text-ink-soft md:text-[15px]">{{ block('workshop').lead }}</p>
            <figure class="relative">
              <div class="chamfer overflow-hidden">
                <img src="/images/events/lesson.webp" alt="Kids dancing at a workshop" width="216" height="166" loading="lazy" decoding="async" class="aspect-[16/9] w-full object-cover">
              </div>
              <figcaption class="absolute inset-x-0 bottom-0 bg-ink/45 px-4 py-3 text-center text-sm font-medium leading-relaxed text-white sm:text-base">{{ block('workshop').catch }}</figcaption>
            </figure>
          </div>
          <ul class="mt-10 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            <li v-for="e in byType('workshop').slice(0, 3)" :key="e.id" class="w-[80%] shrink-0 snap-center sm:w-auto"><EventCard :event="e" /></li>
          </ul>
        </div>
      </div>

      <!-- STE-LAM -->
      <div class="band mt-16 pb-0 pt-10" aria-labelledby="stelam-title">
        <div class="container-x">
          <h3 id="stelam-title" class="mx-auto w-full max-w-[500px] rounded-full border-2 border-white bg-brand-teal py-2.5 text-center text-lg font-medium text-white shadow-[0_3px_8px_rgba(0,0,0,.12)]">STE-LAM Workshops</h3>
          <p class="mt-8 whitespace-pre-line text-center text-sm leading-loose text-ink-soft">{{ steLam.lead }}</p>
          <p class="mx-auto mt-10 flex max-w-[420px] items-center justify-between gap-4 text-center text-sm leading-relaxed text-ink">
            <span class="h-8 w-px shrink-0 -rotate-[30deg] bg-ink" aria-hidden="true" />
            <span>Find what you're great at!<br>A few of the STE-LAM workshops you can join</span>
            <span class="h-8 w-px shrink-0 rotate-[30deg] bg-ink" aria-hidden="true" />
          </p>
          <ul class="mt-8 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            <li v-for="g in steLam.genres" :key="g.name" class="flex flex-col items-center">
              <div class="grid h-28 w-28 place-items-center bg-white/85 text-center" :class="g.shape === 'triangle' ? 'pr-9' : ''" :style="{ clipPath: shapes[g.shape] }">
                <span class="leading-tight">
                  <span class="block whitespace-pre-line font-medium leading-tight" :class="g.shape === 'triangle' ? 'text-xs' : 'text-sm'" :style="{ color: g.color }">{{ g.name }}</span>
                  <span class="mx-auto mt-1 block max-w-[72px] text-[9px] leading-tight text-ink-soft">{{ g.school }}</span>
                </span>
              </div>
              <ul class="mt-3 w-full max-w-[180px] space-y-1.5">
                <li v-for="p in g.programs" :key="p" class="rounded-full px-3 py-1.5 text-center text-[11px] leading-tight text-white" :style="{ backgroundColor: g.color }">{{ p }}</li>
              </ul>
            </li>
          </ul>

          <!-- Comments.png -->
          <div class="relative mx-auto mt-14 flex max-w-[640px] flex-col-reverse gap-6 bg-band-ice px-6 pb-8 pt-8 text-center sm:block sm:pt-10">
            <p class="whitespace-pre-line text-base font-medium leading-relaxed text-brand-blue sm:ml-0 sm:w-1/2 sm:pt-16 sm:text-lg">{{ steLam.message }}</p>
            <ul aria-label="What parents say" class="flex flex-wrap justify-center gap-3 sm:block">
              <li v-for="(b, i) in steLam.bubbles" :key="i" class="sm:absolute" :class="[['sm:left-10 sm:top-6', 'sm:right-[34%] sm:top-2', 'sm:right-4 sm:top-14'][i]]">
                <span class="relative block max-w-[180px] rounded-[50%] px-5 py-3 text-center text-[11px] leading-snug text-white sm:px-7 sm:py-4 sm:text-xs" :style="{ backgroundColor: b.color }">
                  {{ b.text }}
                  <span class="absolute -bottom-1.5 left-6 h-3 w-4 [clip-path:polygon(0_0,100%_0,0_100%)]" :style="{ backgroundColor: b.color }" aria-hidden="true" />
                </span>
              </li>
            </ul>
          </div>
        </div>
        <EventVideoCarousel v-if="videos.length" title="STE-LAM Workshops" :videos="videos" :band="false" class="mt-6" />
      </div>
      <div class="container-x">
        <div class="rounded-b-[28px] bg-band-ice py-6 text-center">
          <SkewButton color="sky" @click="showWorkshops">See All Workshops</SkewButton>
        </div>
      </div>
    </section>

    <!-- Events (Celebration.png) -->
    <section id="event" class="scroll-mt-24 pb-20 pt-24" aria-labelledby="event-title">
      <div class="container-x">
        <EventRibbon id="event-title" :title="block('event').title" :bubble="block('event').bubble" class="relative z-10" />
        <div class="relative -mt-6 overflow-hidden rounded-[28px] bg-band-ice px-5 pb-12 pt-14 sm:px-10">
          <p class="mx-auto flex max-w-[440px] items-center justify-between gap-4 text-center text-sm leading-loose text-ink-soft">
            <span class="h-8 w-px shrink-0 -rotate-[30deg] bg-ink-soft" aria-hidden="true" />
            <span>{{ block('event').lead }}</span>
            <span class="h-8 w-px shrink-0 rotate-[30deg] bg-ink-soft" aria-hidden="true" />
          </p>
          <div class="mt-8 grid grid-cols-3 gap-2 sm:gap-3">
            <img src="/images/events/friends.webp" alt="Smiling kids at a party" width="216" height="274" loading="lazy" decoding="async" class="chamfer aspect-[4/3] w-full object-cover">
            <img src="/images/events/duo.webp" alt="Kids dancing in costume" width="216" height="166" loading="lazy" decoding="async" class="chamfer aspect-[4/3] w-full object-cover">
            <img src="/images/events/studio.webp" alt="An event at the studio" width="216" height="162" loading="lazy" decoding="async" class="chamfer aspect-[4/3] w-full object-cover">
          </div>
          <!-- Confetti -->
          <div class="relative mt-10 h-40 sm:h-44">
            <svg class="absolute inset-0 h-full w-full" viewBox="0 0 600 180" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <path d="M40 60c10 20-14 30-4 50s-14 30-4 50" fill="none" stroke="#E8307A" stroke-width="7" stroke-linecap="round" />
              <path d="M58 70c10 20-14 30-4 50" fill="none" stroke="#2BAFD5" stroke-width="5" stroke-linecap="round" />
              <path d="M470 20c14-10 26 6 16 20s6 30 20 24" fill="none" stroke="#2BB9A9" stroke-width="5" stroke-linecap="round" />
              <path d="M540 120c10-10 22 0 14 12s8 18 18 10" fill="none" stroke="#8E4FD8" stroke-width="4" stroke-linecap="round" />
              <g>
                <rect x="120" y="30" width="12" height="5" fill="#F2C230" transform="rotate(-20 120 30)" />
                <rect x="400" y="60" width="16" height="7" fill="#F2C230" transform="rotate(-30 400 60)" />
                <rect x="560" y="40" width="10" height="4" fill="#F2C230" />
                <rect x="330" y="150" width="14" height="6" fill="#F2C230" transform="rotate(-25 330 150)" />
                <rect x="520" y="90" width="8" height="8" fill="#E8307A" transform="rotate(20 520 90)" />
                <rect x="100" y="140" width="6" height="6" fill="#8E4FD8" />
                <circle cx="330" cy="10" r="3" fill="#E8307A" />
                <circle cx="200" cy="160" r="2.5" fill="#2BAFD5" />
                <circle cx="460" cy="150" r="2.5" fill="#2BB9A9" />
                <rect x="570" y="150" width="10" height="5" fill="#E8307A" transform="rotate(40 570 150)" />
              </g>
            </svg>
            <p class="absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 -rotate-3 bg-brand-coral px-6 pb-9 pt-5 text-center text-sm leading-relaxed text-white [clip-path:polygon(0_10%,100%_0,97%_78%,50%_80%,46%_100%,42%_80%,4%_86%)] sm:w-[360px] sm:text-base">
              {{ block('event').catch }}
            </p>
          </div>
          <ul class="mt-6 -mx-5 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
            <li v-for="e in byType('event').slice(0, 3)" :key="e.id" class="w-[80%] shrink-0 snap-center sm:w-auto"><EventCard :event="e" /></li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Pick Up + schedule (Event-lists.png) -->
    <section id="schedule" class="scroll-mt-20 bg-lilac pb-20" aria-labelledby="pickup-title">
      <h2 id="pickup-title" class="band py-2 text-center font-display text-xl text-white">Pick Up</h2>
      <div class="container-wide mt-12">
        <ul class="grid gap-14 md:grid-cols-2 md:gap-10">
          <li v-for="e in featured" :key="e.id" class="mx-auto w-full max-w-[460px]"><EventFeatureCard :event="e" /></li>
        </ul>

        <div class="mt-20 text-center">
          <h2 class="text-xl font-medium text-ink sm:text-2xl">Event Schedule</h2>
          <div class="mt-6 flex flex-wrap justify-center gap-2" role="group" aria-label="Filter by type">
            <button v-for="f in filters" :key="f.value" type="button" class="skew-box inline-flex h-10 items-center gap-2 px-6 text-sm transition" :class="filter === f.value ? 'text-white' : 'bg-white text-ink hover:bg-paper-light'" :style="filter === f.value ? { backgroundColor: f.color } : {}" :aria-pressed="filter === f.value" @click="setFilter(f.value)">
              {{ f.label }}<span class="font-display text-xs opacity-70">{{ count(f.value) }}</span>
            </button>
          </div>
        </div>

        <p class="sr-only" aria-live="polite">Showing {{ filtered.length }} {{ filtered.length === 1 ? 'event' : 'events' }}</p>
        <ul v-if="visible.length" class="mt-12 grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <li v-for="e in visible" :key="e.id"><EventCard :event="e" /></li>
        </ul>
        <p v-else class="mt-12 text-center text-sm text-ink-soft">There are no upcoming events right now.</p>
        <div v-if="shown < filtered.length" class="mt-12 text-center">
          <SkewButton color="white" @click="shown += PAGE">Load More</SkewButton>
        </div>
      </div>
    </section>

    <!-- 4 steps (Comm.png) -->
    <section class="section" aria-labelledby="steps-title">
      <div class="container-x">
        <div class="relative">
          <h2 id="steps-title" class="skew-box relative z-10 mx-auto w-fit bg-brand-orange px-10 py-2.5 text-base font-medium text-white sm:px-14">Book an Event in 4 Steps</h2>
          <div class="-mt-5 bg-brand-orange p-[2px] [clip-path:polygon(28px_0,calc(100%-28px)_0,100%_28px,100%_calc(100%-28px),calc(100%-28px)_100%,28px_100%,0_calc(100%-28px),0_28px)]">
            <ol class="grid grid-cols-2 gap-x-4 gap-y-10 bg-white px-5 pb-12 pt-14 [clip-path:polygon(27px_0,calc(100%-27px)_0,100%_27px,100%_calc(100%-27px),calc(100%-27px)_100%,27px_100%,0_calc(100%-27px),0_27px)] md:grid-cols-4 md:px-10">
              <li v-for="s in applySteps" :key="s.no" class="relative mx-auto w-full max-w-[160px]">
                <svg class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 130 140" aria-hidden="true">
                  <path d="M88 -6 64 150" :stroke="s.color" stroke-width="7" />
                  <path d="M112 0 100 60" :stroke="s.color" stroke-width="3" />
                </svg>
                <p class="relative text-center font-display text-3xl leading-none" :style="{ color: s.color }">{{ s.no }}</p>
                <div class="hex-clip relative mt-1 grid aspect-[130/112] w-full place-items-center px-4 text-center" :style="{ backgroundColor: s.color }">
                  <span class="text-xs leading-snug text-white sm:text-[13px]">{{ s.text }}</span>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
