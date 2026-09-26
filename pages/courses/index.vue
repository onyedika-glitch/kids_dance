<script setup lang="ts">
import type { AgeGroupId, DanceClass, Genre } from '~/data/courses'

useSeoMeta({
  title: 'Genres & Courses',
  description: 'Nine genres: Hip-Hop, Jazz, Kids Rhythm Dance, Theme Park Dance, Lock, Contemporary, House, Cheer Dance and Breakin\' / Acrobatics. Search by age and genre to find the perfect class for your child.',
})

const { data } = await useFetch('/api/courses')
const genres = computed(() => data.value?.genres ?? [])
const classes = computed(() => data.value?.classes ?? [])
const ageGroups = computed(() => data.value?.ageGroups ?? [])
const axes = computed(() => data.value?.radarAxes ?? [])
const genreOf = (c: DanceClass) => genres.value.find(g => g.id === c.genreId)

const coreGenres = computed(() => genres.value.filter(g => g.core))
const optionRows = computed(() => {
  const o = genres.value.filter(g => !g.core)
  return [o.slice(0, 2), o.slice(2, 5), o.slice(5)]
})

// ---- featured class carousel (class.png / slide.png)
const featured = computed(() => genres.value
  .map(g => classes.value.find(c => c.genreId === g.id))
  .filter((c): c is DanceClass => !!c))
const track = ref<HTMLElement>()
const active = ref(0)
let raf = 0
function onScroll() {
  cancelAnimationFrame(raf)
  raf = requestAnimationFrame(() => {
    const el = track.value
    if (!el) return
    const mid = el.scrollLeft + el.clientWidth / 2
    let best = 0
    let dist = Infinity
    ;[...el.children].forEach((c, i) => {
      const n = c as HTMLElement
      const d = Math.abs(n.offsetLeft + n.offsetWidth / 2 - mid)
      if (d < dist) { dist = d; best = i }
    })
    active.value = best
  })
}
function go(i: number) {
  const el = track.value
  if (!el) return
  const n = Math.max(0, Math.min(featured.value.length - 1, i))
  const child = el.children[n] as HTMLElement | undefined
  if (!child) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollTo({ left: child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2, behavior: reduce ? 'auto' : 'smooth' })
}
onMounted(() => {
  // start on the second card so both neighbours are visible like the Figma
  nextTick(() => {
    const el = track.value
    const child = el?.children[1] as HTMLElement | undefined
    if (el && child) el.scrollLeft = child.offsetLeft + child.offsetWidth / 2 - el.clientWidth / 2
    onScroll()
  })
})

// ---- class finder (flan.png + choice.png)
const route = useRoute()
const tab = ref<'genre' | 'age'>('genre')
const pickedGenres = ref<string[]>(typeof route.query.genre === 'string' ? route.query.genre.split(',') : [])
const pickedAges = ref<AgeGroupId[]>([])
const PAGE = 6
const shown = ref(PAGE)

function toggle<T>(list: T[], v: T) {
  const i = list.indexOf(v)
  if (i >= 0) list.splice(i, 1)
  else list.push(v)
  shown.value = PAGE
}
function reset() {
  pickedGenres.value = []
  pickedAges.value = []
  shown.value = PAGE
}
const results = computed(() => classes.value.filter(c =>
  (!pickedGenres.value.length || pickedGenres.value.includes(c.genreId))
  && (!pickedAges.value.length || pickedAges.value.includes(c.ageGroup)),
))
const visible = computed(() => results.value.slice(0, shown.value))
const ageCount = (id: AgeGroupId) => classes.value.filter(c => c.ageGroup === id).length
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)
const genreLabel = (g: Genre) => g.name.replace('Kids Rhythm Dance', 'Kids\nRhythm Dance').replace('Theme Park Dance', 'Theme\nPark Dance').replace('Breakin\' / Acrobatics', 'Breakin\' /\nAcrobatics')
</script>

<template>
  <div>
    <PageHero en="COURSES" title="Courses" image="/images/courses/hero.webp" alt="Kids dancing at EYS-Kids Dance Academy" :crumbs="[{ label: 'Courses' }]" />

    <!-- Cont.png -->
    <section class="section pt-12 md:pt-16" aria-label="Courses">
      <div class="container-x">
        <CoursesGenreList :genres="genres" />
      </div>
    </section>

    <!-- haxagon.png -->
    <section class="section bg-paper" aria-label="Genres">
      <div class="container-x">
        <SectionHeading en="GENRE" title="From core styles to fun extras: 9 genres to explore" lead="Start with the two core genres. Once your child finds their groove, add any genre they love." />

        <div class="relative mx-auto mt-12 max-w-[560px]">
          <p class="relative mx-auto mb-8 w-fit">
            <span class="skew-box block bg-brand-orange px-8 py-3 text-center text-[13px] font-medium leading-relaxed text-white">The street dance essentials:<br>HIP-HOP and Jazz!</span>
            <span class="absolute -bottom-2.5 left-8 h-3 w-4 bg-brand-orange [clip-path:polygon(0_0,100%_0,0_100%)]" aria-hidden="true" />
          </p>
          <ul class="grid grid-cols-2 gap-6 md:gap-16">
            <li v-for="g in coreGenres" :key="g.id">
              <NuxtLink :to="`/courses/${g.id}`" class="group block text-center">
                <HexFrame :color="g.color" :image="g.image" :alt="`Kids in a ${g.nameJa} class`" class="transition-transform group-hover:-translate-y-1" />
                <span class="skew-box relative -mt-6 block py-2 text-sm font-medium text-white" :style="{ backgroundColor: g.color }">{{ g.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>

        <p class="relative mx-auto mb-8 mt-14 w-fit">
          <span class="skew-box block bg-brand-purple px-8 py-3 text-center text-[13px] font-medium leading-relaxed text-white">Fun optional genres:<br>find the dance your child loves!</span>
          <span class="absolute -bottom-2.5 left-1/2 h-3 w-4 bg-brand-purple [clip-path:polygon(0_0,100%_0,0_100%)]" aria-hidden="true" />
        </p>
        <div class="space-y-6 md:space-y-10">
          <ul v-for="(row, r) in optionRows" :key="r" class="flex flex-wrap justify-center gap-6 md:gap-12">
            <li v-for="g in row" :key="g.id" class="w-[calc(50%-12px)] max-w-[200px] md:w-[170px]">
              <NuxtLink :to="`/courses/${g.id}`" class="group block text-center">
                <HexFrame :color="g.color" :image="g.image" :alt="`Kids in a ${g.nameJa} class`" class="transition-transform group-hover:-translate-y-1" />
                <span class="skew-box relative -mt-5 block px-2 py-1.5 text-xs font-medium leading-tight text-white" :style="{ backgroundColor: g.color }">{{ g.name }}</span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- class.png / slide.png -->
    <section class="relative overflow-hidden pb-14 pt-12 md:pb-20" aria-labelledby="peek-title">
      <div class="band absolute inset-x-0 top-0 h-[58%]" aria-hidden="true" />
      <div class="relative">
        <h2 id="peek-title" class="flex items-center justify-center gap-5 px-4 text-center text-base text-ink sm:text-lg">
          <span class="h-5 w-px shrink-0 rotate-[-30deg] bg-ink" aria-hidden="true" />Take a peek at our classes!<span class="h-5 w-px shrink-0 rotate-[30deg] bg-ink" aria-hidden="true" />
        </h2>

        <div class="relative mx-auto mt-8 max-w-[1100px]">
          <ul
            ref="track"
            class="flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-150px)] pb-6 pt-4 [scrollbar-width:none] md:gap-0 [&::-webkit-scrollbar]:hidden"
            tabindex="0"
            aria-label="Featured classes (scroll left or right)"
            @scroll.passive="onScroll"
          >
            <li
              v-for="(c, i) in featured"
              :key="c.id"
              class="w-[300px] shrink-0 snap-center transition-[opacity,transform] duration-300"
              :class="i === active ? 'z-10 md:scale-105' : 'md:scale-95 md:opacity-50'"
            >
              <article class="overflow-hidden rounded-2xl bg-white shadow-[0_6px_18px_rgba(0,0,0,0.14)]">
                <div class="relative aspect-[4/5] bg-paper">
                  <img :src="c.image" :alt="`A ${genreOf(c)?.nameJa} class in action`" loading="lazy" decoding="async" class="h-full w-full object-cover">
                  <div class="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white to-transparent" aria-hidden="true" />
                  <span class="absolute left-3 top-3 rounded-full bg-brand-coral px-3 py-1 text-[11px] text-white">{{ c.lessonType }}</span>
                  <div class="absolute inset-x-3 bottom-3">
                    <h3 class="text-lg font-bold leading-snug text-ink">{{ c.title }}</h3>
                    <p class="mt-2 flex flex-wrap gap-1.5 text-[11px] text-ink">
                      <span class="flex items-center gap-1 rounded-full bg-white py-0.5 pl-0.5 pr-2.5 shadow-sm"><span class="h-5 w-5 rounded-full" :style="{ backgroundColor: genreOf(c)?.color }" />{{ genreOf(c)?.nameJa }}</span>
                      <span class="flex items-center gap-1 rounded-full bg-white py-0.5 pl-0.5 pr-2.5 shadow-sm"><span class="h-5 w-5 rounded-full bg-brand-sky" />{{ ageGroups.find(a => a.id === c.ageGroup)?.label }}</span>
                    </p>
                  </div>
                </div>
                <div class="px-4 pb-4 text-center">
                  <p class="border-b border-paper pb-2 pt-1 font-display text-[13px] font-semibold tracking-[0.2em] text-ink">DANCE ACADEMY<span class="block text-[8px] tracking-[0.3em] text-ink-mute">EYS-Kids</span></p>
                  <NuxtLink :to="`/freetrial?class=${c.id}`" class="mt-3 flex h-11 items-center justify-center gap-2 rounded-full bg-brand-coral text-[15px] text-white shadow-md transition-colors hover:bg-[#f0474f]" :tabindex="i === active ? 0 : -1">
                    Book a Free Trial Lesson<Icon name="chevron" class="h-3.5 w-3.5" />
                  </NuxtLink>
                  <NuxtLink :to="`/courses/${c.genreId}#${c.id}`" class="mt-2 inline-flex items-center gap-2 py-1 text-xs text-ink hover:text-brand-sky" :tabindex="i === active ? 0 : -1">
                    View class details<Icon name="chevron" class="h-3 w-3" />
                  </NuxtLink>
                </div>
              </article>
            </li>
          </ul>
          <button type="button" class="absolute left-2 top-[40%] hidden h-10 w-10 items-center justify-center bg-[#4E5D6C] text-white transition-opacity hover:bg-[#3d4a57] disabled:opacity-30 sm:flex md:left-16" aria-label="Previous class" :disabled="active === 0" @click="go(active - 1)">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M20 16H4l7-7" /></svg>
          </button>
          <button type="button" class="absolute right-2 top-[40%] hidden h-10 w-10 items-center justify-center bg-[#4E5D6C] text-white transition-opacity hover:bg-[#3d4a57] disabled:opacity-30 sm:flex md:right-16" aria-label="Next class" :disabled="active === featured.length - 1" @click="go(active + 1)">
            <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M4 16h16l-7-7" /></svg>
          </button>
        </div>
        <p class="sr-only" aria-live="polite">Class {{ active + 1 }} of {{ featured.length }}: {{ featured[active]?.title }}</p>

        <div class="mt-4 text-center">
          <SkewButton href="#class-finder" color="sky" size="lg" class="min-w-[280px] !text-lg">View All Classes</SkewButton>
        </div>
      </div>
    </section>

    <!-- info.png + flan.png + choice.png -->
    <section id="class-finder" class="scroll-mt-24 bg-paper-light pb-16 md:pb-24" aria-labelledby="finder-title">
      <div class="bg-white">
        <div class="relative mx-auto flex h-[170px] max-w-[420px] items-center justify-center sm:h-[200px]">
          <svg viewBox="0 0 200 190" class="absolute left-1/2 top-1/2 h-[150px] -translate-x-[62%] -translate-y-1/2 sm:h-[180px]" aria-hidden="true">
            <path d="M100 8 190 73l-34 105H44L10 73Z" fill="#FBF3FF" stroke="#F3E3FB" stroke-width="10" stroke-linejoin="round" />
          </svg>
          <h2 id="finder-title" class="relative -translate-x-10 -rotate-6 text-center text-xl leading-relaxed text-ink-soft sm:text-2xl">Sneak a peek<br>at a class!</h2>
          <img src="/images/courses/peek-kid.webp" alt="" width="120" height="185" loading="lazy" decoding="async" class="absolute bottom-0 right-6 h-[150px] w-auto sm:right-2 sm:h-[185px]">
        </div>
      </div>

      <div class="container-x pt-10">
        <div class="bg-white px-4 py-8 shadow-[0_3px_10px_rgba(0,0,0,0.06)] sm:px-10">
          <div class="mx-auto grid max-w-[400px] grid-cols-2 rounded-full border border-[#ccc] bg-white p-0.5 text-sm" role="tablist" aria-label="How to search for classes">
            <button
              v-for="t in ([{ id: 'genre', label: 'By Genre' }, { id: 'age', label: 'By Age' }] as const)"
              :id="`tab-${t.id}`"
              :key="t.id"
              type="button"
              role="tab"
              :aria-selected="tab === t.id"
              :aria-controls="`panel-${t.id}`"
              class="relative h-10 rounded-full transition-colors"
              :class="tab === t.id ? 'bg-brand-sky text-white' : 'text-ink-soft hover:text-brand-sky'"
              @click="tab = t.id"
            >
              {{ t.label }}
              <span v-if="tab === t.id" class="absolute -bottom-2 left-1/2 h-2 w-3 -translate-x-1/2 bg-brand-sky [clip-path:polygon(0_0,100%_0,50%_100%)]" aria-hidden="true" />
            </button>
          </div>

          <div v-show="tab === 'genre'" id="panel-genre" role="tabpanel" aria-labelledby="tab-genre" class="mx-auto mt-6 max-w-[770px]">
            <ul class="grid grid-cols-2 border-l border-t border-[#ddd] min-[480px]:grid-cols-3 md:grid-cols-5">
              <li v-for="g in genres" :key="g.id" class="border-b border-r border-[#ddd]">
                <button type="button" class="group relative block w-full text-center" :aria-pressed="pickedGenres.includes(g.id)" @click="toggle(pickedGenres, g.id)">
                  <span class="block aspect-[152/98] overflow-hidden bg-paper">
                    <img :src="g.image" alt="" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform group-hover:scale-105">
                  </span>
                  <span class="flex h-12 items-center justify-center whitespace-pre-line px-1 text-[13px] leading-tight text-ink">{{ genreLabel(g) }}</span>
                  <span v-if="pickedGenres.includes(g.id)" class="absolute inset-0 flex flex-col bg-brand-sky/80 text-white" aria-hidden="true">
                    <span class="flex flex-1 items-center justify-center"><Icon name="check" class="h-12 w-12" /></span>
                    <span class="flex h-12 items-center justify-center whitespace-pre-line px-1 text-[13px] leading-tight">{{ genreLabel(g) }}</span>
                  </span>
                </button>
              </li>
              <li class="hidden border-b border-r border-[#ddd] bg-paper-light md:block" aria-hidden="true" />
            </ul>
          </div>

          <div v-show="tab === 'age'" id="panel-age" role="tabpanel" aria-labelledby="tab-age" class="mx-auto mt-6 max-w-[770px]">
            <ul class="grid gap-3 sm:grid-cols-3">
              <li v-for="(a, i) in ageGroups" :key="a.id">
                <button
                  type="button"
                  class="relative flex h-full w-full flex-col items-center justify-center border px-3 py-6 text-center transition-colors"
                  :class="pickedAges.includes(a.id) ? 'border-brand-sky bg-brand-sky text-white' : 'border-[#ddd] bg-white text-ink hover:border-brand-sky'"
                  :aria-pressed="pickedAges.includes(a.id)"
                  @click="toggle(pickedAges, a.id)"
                >
                  <span class="hex-clip mb-3 flex h-10 w-11 items-center justify-center font-display text-sm font-bold text-white" :style="{ backgroundColor: pickedAges.includes(a.id) ? 'rgba(255,255,255,.3)' : ['#8DC21F', '#FF9300', '#A66BF0'][i] }">
                    <Icon v-if="pickedAges.includes(a.id)" name="check" class="h-5 w-5" />
                    <template v-else>{{ i + 1 }}</template>
                  </span>
                  <span class="text-base font-medium">{{ a.label }}</span>
                  <span class="mt-1 text-xs" :class="pickedAges.includes(a.id) ? 'text-white' : 'text-ink-mute'">{{ cap(a.note) }} ({{ ageCount(a.id) }} classes)</span>
                </button>
              </li>
            </ul>
          </div>

          <div class="mx-auto mt-6 flex max-w-[770px] flex-wrap items-center justify-between gap-3 border-t border-paper pt-4 text-sm">
            <p aria-live="polite">
              <span class="font-display text-xl font-bold text-brand-sky">{{ results.length }}</span> matching {{ results.length === 1 ? 'class' : 'classes' }}
              <span v-if="pickedGenres.length || pickedAges.length" class="ml-2 text-xs text-ink-mute">
                ({{ [...pickedGenres.map(id => genres.find(g => g.id === id)?.name), ...pickedAges.map(id => ageGroups.find(a => a.id === id)?.label)].join(', ') }})
              </span>
            </p>
            <button v-if="pickedGenres.length || pickedAges.length" type="button" class="inline-flex h-10 items-center gap-1 px-2 text-xs text-ink-soft underline-offset-2 hover:text-brand-sky hover:underline" @click="reset">
              <Icon name="close" class="h-3.5 w-3.5" />Clear all filters
            </button>
          </div>
        </div>

        <div class="relative mt-10">
          <span class="absolute -top-10 left-1/2 h-4 w-8 -translate-x-1/2 bg-white [clip-path:polygon(0_0,100%_0,50%_100%)]" aria-hidden="true" />
          <ul v-if="visible.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <li v-for="c in visible" :key="c.id">
              <CoursesClassCard :item="c" :genre="genreOf(c)" :age-groups="ageGroups" :axes="axes" />
            </li>
          </ul>
          <div v-else class="bg-white py-16 text-center text-sm text-ink-soft">
            <p>No classes match your filters.</p>
            <button type="button" class="mt-4 text-brand-sky underline underline-offset-2" @click="reset">Clear filters</button>
          </div>
          <div v-if="results.length > shown" class="mt-10 text-center">
            <SkewButton color="blue" @click="shown += PAGE">Load More ({{ results.length - shown }} left)</SkewButton>
          </div>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
