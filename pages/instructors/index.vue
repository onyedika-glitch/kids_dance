<script setup lang="ts">
import type { Instructor } from '~/data/instructors'
import { rankColors, weekdayNames, weekdays } from '~/data/instructors'

useSeoMeta({
  title: 'Instructors',
  description: 'Meet the instructors at EYS-Kids Dance Academy. Compare instructor ranks, satisfaction scores, lesson styles and reviews to find the perfect teacher for your child.',
})

const { data } = await useFetch('/api/instructors')
const all = computed<Instructor[]>(() => data.value?.instructors ?? [])

// filters
const course = ref('')
const studio = ref('')
const days = ref<number[]>([])
function toggleDay(i: number) {
  days.value = days.value.includes(i) ? days.value.filter(d => d !== i) : [...days.value, i]
}
function resetFilters() {
  course.value = ''
  studio.value = ''
  days.value = []
}
const filtered = computed(() => all.value.filter(i =>
  (!course.value || i.courses.includes(course.value))
  && (!studio.value || i.studios.includes(studio.value))
  && (!days.value.length || days.value.some(d => i.days.includes(d))),
))

// carousel selection
const selectedId = ref(all.value[0]?.id ?? '')
const selectedIndex = computed(() => Math.max(0, filtered.value.findIndex(i => i.id === selectedId.value)))
const selected = computed(() => filtered.value[selectedIndex.value])
watch(filtered, (list) => {
  if (list.length && !list.some(i => i.id === selectedId.value)) selectedId.value = list[0].id
})

const stage = ref<HTMLElement>()
function select(id: string) {
  selectedId.value = id
  nextTick(() => {
    const el = stage.value?.querySelector<HTMLElement>(`[data-id="${id}"]`)
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  })
}
function step(dir: number) {
  const list = filtered.value
  if (!list.length) return
  select(list[(selectedIndex.value + dir + list.length) % list.length].id)
}

// list with load-more
const listCount = ref(2)
const listed = computed(() => filtered.value.slice(0, listCount.value))

// staff read-more
const openStaff = ref<string[]>([])
function toggleStaff(id: string) {
  openStaff.value = openStaff.value.includes(id) ? openStaff.value.filter(s => s !== id) : [...openStaff.value, id]
}
</script>

<template>
  <div>
    <!-- page title -->
    <section class="bg-white">
      <div class="container-x relative pb-8 pt-12 md:pb-10 md:pt-14">
        <nav aria-label="Breadcrumb" class="absolute left-4 top-0 hidden sm:left-6 md:block">
          <ol class="skew-box flex items-center gap-6 bg-[#666] py-1.5 pl-6 pr-10 text-[10px] text-white">
            <li><NuxtLink to="/" class="hover:underline">EYS-Kids Dance Academy Home</NuxtLink></li>
            <li class="flex items-center gap-2"><Icon name="chevron" class="h-2.5 w-2.5" /><span aria-current="page" class="font-bold">Instructors</span></li>
          </ol>
        </nav>
        <h1 class="text-center">
          <span class="sr-only">Meet Our Instructors</span>
          <DisplayTitle text="INSTRUCTORS" tag="span" class="!block !text-[38px] sm:!text-[64px] md:!text-[88px]" />
        </h1>
      </div>

      <!-- filters -->
      <form class="border-y border-[#DDD]" aria-label="Filter instructors" @submit.prevent @reset.prevent="resetFilters">
        <div class="container-wide flex flex-wrap items-center gap-x-6 gap-y-3 py-3.5 text-xs text-ink">
          <span class="text-ink-soft">Filter:</span>
          <label class="relative">
            <span class="sr-only">Course</span>
            <select v-model="course" class="h-8 appearance-none rounded-full border border-[#BBB] bg-white pl-4 pr-8 text-xs text-ink focus:border-brand-sky">
              <option value="">Course</option>
              <option v-for="c in data?.courses" :key="c" :value="c">{{ c }}</option>
            </select>
            <Icon name="chevron-down" class="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2" />
          </label>
          <label class="relative">
            <span class="sr-only">Studio</span>
            <select v-model="studio" class="h-8 appearance-none rounded-full border border-[#BBB] bg-white pl-4 pr-8 text-xs text-ink focus:border-brand-sky">
              <option value="">Studio</option>
              <option v-for="s in data?.studios" :key="s" :value="s">{{ s }}</option>
            </select>
            <Icon name="chevron-down" class="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2" />
          </label>
          <fieldset class="flex flex-wrap items-center gap-3">
            <legend class="float-left mr-1 inline-flex h-8 items-center whitespace-nowrap rounded-full border border-[#BBB] px-4">Lesson days</legend>
            <div class="flex gap-1.5">
              <button
                v-for="(d, i) in weekdays" :key="d" type="button"
                class="grid h-8 w-8 place-items-center rounded-full text-[11px] text-white transition-colors sm:h-7 sm:w-7"
                :class="days.includes(i) ? 'bg-brand-sky' : 'bg-[#D6D6D6] hover:bg-[#bbb]'"
                :aria-pressed="days.includes(i)" :aria-label="weekdayNames[i]" @click="toggleDay(i)"
              >
                {{ d }}
              </button>
            </div>
          </fieldset>
          <p class="text-brand-sky" aria-live="polite">{{ filtered.length }} {{ filtered.length === 1 ? 'match' : 'matches' }}</p>
          <button v-if="course || studio || days.length" type="reset" class="text-ink-mute underline hover:text-ink">Clear filters</button>
        </div>
      </form>
    </section>

    <!-- stage + selected profile -->
    <section class="bg-paper pb-16 md:pb-24" aria-label="Instructors">
      <div class="bg-[linear-gradient(180deg,#DEDEDE_0%,#FDFDFD_52%,#EEEEEE_100%)]">
        <div class="container-x relative">
          <template v-if="filtered.length">
            <button type="button" class="absolute left-4 top-[calc(50%-24px)] z-10 hidden h-14 w-14 place-items-center bg-[#808080] text-white shadow-[0_3px_6px_rgba(0,0,0,.2)] transition-colors hover:bg-[#666] sm:grid md:h-20 md:w-20 xl:-left-[140px]" aria-label="Previous instructor" @click="step(-1)">
              <svg viewBox="0 0 80 80" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M62 52H18l24-21" /></svg>
            </button>
            <button type="button" class="absolute right-4 top-[calc(50%-24px)] z-10 hidden h-14 w-14 place-items-center bg-[#808080] text-white shadow-[0_3px_6px_rgba(0,0,0,.2)] transition-colors hover:bg-[#666] sm:grid md:h-20 md:w-20 xl:-right-[140px]" aria-label="Next instructor" @click="step(1)">
              <svg viewBox="0 0 80 80" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M18 52h44L38 31" /></svg>
            </button>
          </template>

          <ul
            v-if="filtered.length" ref="stage"
            class="flex h-[340px] snap-x snap-mandatory items-stretch gap-10 overflow-x-auto px-[18%] [--s:.66] [scrollbar-width:none] sm:px-20 md:h-[530px] md:gap-[72px] md:px-5 md:[--s:1] [&::-webkit-scrollbar]:hidden"
            aria-label="Choose an instructor (use the left and right arrow keys)"
            @keydown.left.prevent="step(-1)" @keydown.right.prevent="step(1)"
          >
            <li v-for="inst in filtered" :key="inst.id" :data-id="inst.id" class="relative flex shrink-0 snap-center items-center pb-8 pt-4 md:pb-10">
              <button
                type="button"
                class="group relative block transition-opacity duration-300"
                :class="inst.id === selected?.id ? 'opacity-100' : 'opacity-75 hover:opacity-100'"
                :style="{ height: `calc(var(--s) * ${inst.cutoutSize[1]}px)`, aspectRatio: `${inst.cutoutSize[0]} / ${inst.cutoutSize[1]}` }"
                :aria-pressed="inst.id === selected?.id"
                :aria-label="`Show profile: ${inst.name} (rank ${inst.rank})`"
                @click="select(inst.id)"
              >
                <img :src="inst.cutout" alt="" :width="inst.cutoutSize[0]" :height="inst.cutoutSize[1]" decoding="async" class="h-full w-full object-contain transition-transform duration-300 group-hover:-translate-y-1" />
                <PeopleRankStar
                  :rank="inst.rank" :color="rankColors[inst.rank]"
                  class="absolute -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_1px_1px_rgba(0,0,0,.15)]"
                  :style="{ left: `${inst.badge.x}%`, top: `${inst.badge.y}%`, width: `${inst.badge.size + 4}%`, aspectRatio: '1', fontSize: `calc(var(--s) * ${inst.cutoutSize[0] * inst.badge.size / 250}px)` }"
                />
              </button>
              <span v-if="inst.id === selected?.id" class="absolute bottom-0 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[22px] border-b-[34px] border-x-transparent border-b-white" aria-hidden="true" />
            </li>
          </ul>
          <div v-else class="py-24 text-center text-sm text-ink-soft">
            <p>No instructors match your filters.</p>
            <button type="button" class="mt-4 text-brand-sky underline" @click="resetFilters">Clear filters</button>
          </div>

          <div v-if="filtered.length" class="flex justify-center gap-3 pb-4 sm:hidden">
            <button type="button" class="grid h-10 w-10 place-items-center bg-[#808080] text-white" aria-label="Previous instructor" @click="step(-1)"><Icon name="chevron-left" class="h-4 w-4" /></button>
            <button type="button" class="grid h-10 w-10 place-items-center bg-[#808080] text-white" aria-label="Next instructor" @click="step(1)"><Icon name="chevron" class="h-4 w-4" /></button>
          </div>
        </div>
      </div>

      <div v-if="selected" class="container-x">
        <PeopleProfileCard :instructor="selected" heading-tag="h2" />
        <div class="mt-10 text-center">
          <SkewButton href="#list" color="sky">View All Instructors</SkewButton>
        </div>
      </div>
    </section>

    <!-- staff (dist.png) -->
    <section class="relative overflow-hidden py-16 md:py-20" aria-labelledby="staff-title">
      <div class="band absolute inset-0" aria-hidden="true" />
      <div class="absolute inset-0 bg-white/70" aria-hidden="true" />
      <div class="container-x relative">
        <h2 id="staff-title" class="mx-auto w-fit border-b border-ink px-4 pb-3 text-center text-base tracking-[0.05em] text-ink sm:px-8 sm:text-[17px]">
          Meet the creative minds who built EYS
        </h2>
        <ul class="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 md:mt-16 md:grid-cols-4 md:gap-x-[67px]">
          <li v-for="p in data?.staff" :key="p.id" class="flex flex-col items-center">
            <h3 class="text-center text-sm tracking-wide text-ink">{{ p.name }}</h3>
            <div class="relative mt-4 h-[170px] w-full sm:h-[205px]">
              <span class="absolute bottom-[33px] left-1/2 h-[100px] w-[100px] -translate-x-1/2 border-2 border-white sm:h-[120px] sm:w-[120px]" aria-hidden="true" />
              <img :src="p.photo" :alt="`Photo of ${p.name}`" :width="p.photoSize[0]" :height="p.photoSize[1]" loading="lazy" decoding="async" class="absolute bottom-0 left-1/2 h-[165px] w-auto max-w-none -translate-x-1/2 sm:h-auto" :style="{ aspectRatio: `${p.photoSize[0]} / ${p.photoSize[1]}` }" />
            </div>
            <p class="relative flex min-h-5 w-full items-center justify-center bg-[#222] px-1 py-0.5 text-center text-[10px] leading-tight text-white sm:text-[11px]">
              <span v-if="p.org" class="absolute -top-4 left-0 bg-[#222] px-3 text-[10px] leading-4 sm:-left-8">{{ p.org }}</span>
              {{ p.role }}
            </p>
            <p :id="`staff-${p.id}`" class="mt-4 text-xs leading-[1.9] text-ink-soft" :class="{ 'line-clamp-3': !openStaff.includes(p.id) }">{{ p.text }}</p>
            <button
              type="button" class="mt-4 grid h-10 w-10 place-items-center bg-brand-sky text-white shadow-[0_3px_6px_rgba(0,0,0,.18)] transition-colors hover:bg-[#1c98c8]"
              :aria-expanded="openStaff.includes(p.id)" :aria-controls="`staff-${p.id}`" :aria-label="`${openStaff.includes(p.id) ? 'Collapse' : 'Read'} ${p.name}'s full bio`"
              @click="toggleStaff(p.id)"
            >
              <Icon name="chevron-down" class="h-5 w-5 transition-transform" :class="{ 'rotate-180': openStaff.includes(p.id) }" />
            </button>
          </li>
        </ul>
      </div>
    </section>

    <!-- full list (lesson-booking.png) -->
    <section id="list" class="section scroll-mt-20 bg-paper" aria-labelledby="list-title">
      <div class="container-x">
        <SectionHeading en="PROFILE" tag="p">
          <h2 id="list-title" class="mt-5 text-xl font-medium text-ink sm:text-2xl">All Instructors</h2>
        </SectionHeading>
        <ul v-if="listed.length" class="mt-12 space-y-8">
          <li v-for="inst in listed" :key="inst.id">
            <PeopleProfileCard :instructor="inst" />
          </li>
        </ul>
        <p v-else class="mt-10 text-center text-sm text-ink-soft">No instructors match your filters.</p>
        <div v-if="listCount < filtered.length" class="mt-10 text-center">
          <button type="button" class="inline-flex h-11 -skew-x-[20deg] items-center border border-brand-sky bg-white px-12 text-brand-sky transition-colors hover:bg-brand-sky hover:text-white" @click="listCount += 2">
            <span class="flex skew-x-[20deg] items-center gap-6 text-sm">See More ({{ filtered.length - listCount }} left)<Icon name="chevron-down" class="h-4 w-4" /></span>
          </button>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
