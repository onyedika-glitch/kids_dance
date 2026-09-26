<script setup lang="ts">
import type { Instructor, InstructorReview } from '~/data/instructors'
import { rankColors, weekdayNames, weekdays } from '~/data/instructors'

// Instructor profile card (inst.png / lesson-booking.png): header with rank + satisfaction,
// profile text, lesson style media, style meters and an expandable review panel.
const props = withDefaults(defineProps<{
  instructor: Instructor
  headingTag?: string
  reviews?: InstructorReview[]
  reviewsOpen?: boolean
  showDetailLink?: boolean
}>(), { headingTag: 'h3', reviewsOpen: false, showDetailLink: true })

const open = ref(props.reviewsOpen)
const loaded = ref<InstructorReview[] | null>(props.reviews ?? null)
const loading = ref(false)
const panelId = useId()

watch(() => props.instructor.id, () => {
  open.value = props.reviewsOpen
  loaded.value = props.reviews ?? null
})

async function toggleReviews() {
  open.value = !open.value
  if (open.value && !loaded.value && !loading.value) {
    loading.value = true
    try {
      const res = await $fetch<{ reviews: InstructorReview[] }>(`/api/instructors/${props.instructor.id}`)
      loaded.value = res.reviews
    }
    finally {
      loading.value = false
    }
  }
}

const track = ref<HTMLElement>()
function scrollMedia(dir: number) {
  const el = track.value
  if (!el) return
  const item = el.firstElementChild as HTMLElement | null
  el.scrollBy({ left: dir * ((item?.offsetWidth ?? 120) + 10), behavior: 'smooth' })
}
</script>

<template>
  <ChamferCard size="lg" tag="article" body-class="relative">
    <!-- header -->
    <div class="flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-paper px-5 py-4 sm:px-8">
      <img :src="instructor.avatar" :alt="`Photo of ${instructor.name}`" width="80" height="80" loading="lazy" decoding="async" class="h-16 w-16 shrink-0 rounded-full border-4 border-white object-cover shadow-[0_2px_8px_rgba(0,0,0,.25)] sm:h-20 sm:w-20" />
      <div class="min-w-0">
        <component :is="headingTag" class="text-lg tracking-wide text-ink">{{ instructor.name }}</component>
        <p class="font-display text-[11px] tracking-widest text-ink-mute">{{ instructor.en }}</p>
      </div>
      <div class="flex flex-col items-center">
        <PeopleRankStar :rank="instructor.rank" :color="rankColors[instructor.rank]" class="h-9 w-9 text-lg" :label="`Instructor rank ${instructor.rank}`" />
        <span class="mt-0.5 text-center text-[9px] leading-tight text-ink-mute" aria-hidden="true">Instructor<br>rank</span>
      </div>
      <PeopleSatisfactionPie :great="instructor.satisfaction" :good="instructor.satisfied" />
      <p class="w-full text-sm font-medium text-brand-sky md:ml-auto md:w-auto">{{ instructor.catchcopy }}</p>
    </div>

    <div class="grid gap-8 px-5 py-6 sm:px-8 md:grid-cols-2 md:gap-6">
      <!-- profile -->
      <div>
        <p class="skew-box inline-flex h-7 items-center bg-brand-sky pl-8 pr-12 text-sm font-medium text-white">Profile</p>
        <p class="mt-4 text-[13px] leading-[1.9] text-ink">{{ instructor.bio }}</p>
        <dl class="mt-5 space-y-3 rounded border border-paper bg-paper-light px-4 py-4 text-xs text-ink">
          <div class="flex gap-3">
            <dt class="w-24 shrink-0 whitespace-nowrap border-l-2 border-ink pl-2 leading-4">Studios</dt>
            <dd class="leading-5">{{ instructor.studios.join(' / ') }}</dd>
          </div>
          <div class="flex gap-3">
            <dt class="w-24 shrink-0 whitespace-nowrap border-l-2 border-ink pl-2 leading-4">Courses</dt>
            <dd class="leading-5">{{ instructor.courses.join(', ') }}</dd>
          </div>
          <div class="flex flex-wrap items-center gap-3">
            <dt class="w-24 shrink-0 whitespace-nowrap border-l-2 border-ink pl-2 leading-4">Lesson days</dt>
            <dd>
              <ul class="flex gap-1">
                <li
                  v-for="(d, i) in weekdays" :key="d"
                  class="grid h-[26px] w-[26px] place-items-center rounded-full text-[9px] text-white"
                  :class="instructor.days.includes(i) ? 'bg-brand-sky' : 'bg-[#DDDDDD]'"
                >
                  <span class="sr-only">{{ weekdayNames[i] }}: {{ instructor.days.includes(i) ? 'available' : 'not available' }}</span><span aria-hidden="true">{{ d }}</span>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>

      <!-- lesson style -->
      <div>
        <p class="skew-box inline-flex h-7 items-center bg-brand-sky pl-8 pr-12 text-sm font-medium text-white">Lesson Style</p>
        <div class="mt-4 grid gap-6 sm:grid-cols-[1fr_190px] sm:gap-4">
          <div class="relative px-3">
            <ul ref="track" class="flex snap-x snap-mandatory gap-2.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" aria-label="Lesson videos">
              <li v-for="(m, i) in instructor.styleMedia" :key="i" class="relative w-[calc(50%-5px)] shrink-0 snap-start overflow-hidden rounded bg-paper">
                <img :src="m.image" :alt="`${instructor.name} teaching: ${m.title}`" width="114" height="224" loading="lazy" decoding="async" class="aspect-[114/200] w-full object-cover" :class="{ '-scale-x-100': m.flip }" />
                <span class="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink-soft" aria-hidden="true">
                  <Icon name="play" class="ml-0.5 h-5 w-5" />
                </span>
              </li>
            </ul>
            <button type="button" class="absolute left-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-mute shadow-[0_1px_4px_rgba(0,0,0,.25)] hover:text-brand-sky" aria-label="Previous video" @click="scrollMedia(-1)">
              <Icon name="chevron-left" class="h-3.5 w-3.5" />
            </button>
            <button type="button" class="absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full bg-white text-ink-mute shadow-[0_1px_4px_rgba(0,0,0,.25)] hover:text-brand-sky" aria-label="Next video" @click="scrollMedia(1)">
              <Icon name="chevron" class="h-3.5 w-3.5" />
            </button>
          </div>
          <ul class="flex flex-col justify-center gap-7 sm:gap-8">
            <li v-for="m in instructor.meters" :key="m.left">
              <p class="flex justify-between gap-2 text-[11px]">
                <span class="text-brand-blue">{{ m.left }}</span><span class="text-brand-coral">{{ m.right }}</span>
              </p>
              <div
                class="relative mt-2 h-1 rounded-full bg-[#D5DCE6]"
                role="meter" :aria-label="`${m.left} to ${m.right}`" aria-valuemin="0" aria-valuemax="100" :aria-valuenow="m.value"
                :aria-valuetext="`Leans ${(m.value < 50 ? m.left : m.right).toLowerCase()}`"
              >
                <span class="absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#ccc] bg-white shadow" :style="{ left: `${m.value}%` }" />
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- footer actions -->
    <div class="flex flex-wrap items-center justify-center gap-4 px-5 pb-8">
      <button
        type="button"
        class="group inline-flex h-10 -skew-x-[20deg] items-center border border-brand-sky bg-white px-10 text-brand-sky transition-colors hover:bg-brand-sky hover:text-white"
        :aria-expanded="open" :aria-controls="panelId" @click="toggleReviews"
      >
        <span class="flex skew-x-[20deg] items-center gap-6 text-sm">
          {{ open ? 'Hide Reviews' : 'See Reviews' }}
          <Icon name="chevron-down" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': open }" />
        </span>
      </button>
      <NuxtLink
        v-if="showDetailLink" :to="`/instructors/${instructor.id}`"
        class="inline-flex h-10 -skew-x-[20deg] items-center bg-brand-sky px-10 text-white transition-colors hover:bg-[#1c98c8]"
      >
        <span class="flex skew-x-[20deg] items-center gap-4 text-sm">Full Profile<Icon name="chevron" class="h-3.5 w-3.5" /></span>
      </NuxtLink>
    </div>

    <div v-show="open" :id="panelId" class="border-t border-paper px-5 py-8 sm:px-8">
      <p v-if="loading" class="py-10 text-center text-sm text-ink-mute">Loading reviews…</p>
      <PeopleReviewPanel v-else-if="loaded" :ratings="instructor.ratings" :reviews="loaded" />
    </div>
  </ChamferCard>
</template>
