<script setup lang="ts">
import { accessFeatures, areaName, citiesOf, filterStudios, genres, prefectures, type GenreId, type StudioCardData } from '~/data/studios'

useSeoMeta({
  title: 'Access & Studios',
  description: 'EYS-Kids Dance Academy is growing nationwide. Every studio is within a 5-min walk of a station, with cushioned floors, shower rooms and a lobby. Find a convenient studio by course, area or station name.',
})

const route = useRoute()
const router = useRouter()
const { data: all } = await useFetch<StudioCardData[]>('/api/studios', { default: () => [] })

// Search state, mirrored to the query string so results can be shared / bookmarked
const qs = (v: unknown) => (typeof v === 'string' ? v : '')
const mode = ref<'filter' | 'word'>('filter')
const selected = ref<GenreId[]>([])
const pref = ref('')
const city = ref('')
const word = ref('')
const draft = ref('')

// Applied after hydration: /access is prerendered without a query string
onMounted(() => {
  const q = route.query
  selected.value = qs(q.genre).split(',').filter(g => genres.some(x => x.id === g)) as GenreId[]
  pref.value = prefectures.some(p => p.slug === qs(q.pref)) ? qs(q.pref) : ''
  city.value = pref.value && citiesOf(pref.value).some(c => c.slug === qs(q.city)) ? qs(q.city) : ''
  word.value = draft.value = qs(q.q)
  if (word.value) mode.value = 'word'
})

const allSelected = computed({
  get: () => selected.value.length === genres.length,
  set: (v: boolean) => { selected.value = v ? genres.map(g => g.id) : [] },
})
function toggleGenre(id: GenreId) {
  selected.value = selected.value.includes(id) ? selected.value.filter(g => g !== id) : [...selected.value, id]
}
function pickPref(slug: string) {
  pref.value = pref.value === slug ? '' : slug
  city.value = ''
}

const area = computed(() => city.value || pref.value || undefined)
const results = computed(() => mode.value === 'word'
  ? filterStudios(all.value, { q: word.value })
  : filterStudios(all.value, { area: area.value, genres: selected.value }))
const resultTitle = computed(() => {
  if (mode.value === 'word') return word.value ? `Results for "${word.value}"` : 'EYS-Kids studios nationwide'
  return area.value ? `EYS-Kids studios in ${areaName(area.value)}` : 'EYS-Kids studios nationwide'
})

function submitWord() {
  word.value = draft.value.trim()
}
function reset() {
  selected.value = []
  pref.value = city.value = word.value = draft.value = ''
}

watch([mode, selected, pref, city, word], () => {
  const query: Record<string, string> = {}
  if (mode.value === 'word') {
    if (word.value) query.q = word.value
  }
  else {
    if (selected.value.length) query.genre = selected.value.join(',')
    if (pref.value) query.pref = pref.value
    if (city.value) query.city = city.value
  }
  router.replace({ query })
})

const suggestions = ['Daikanyama', 'Shibuya', 'Shinjuku', 'Ikebukuro', 'Yokohama', 'Omiya']
const countIn = (slug: string) => all.value.filter(s => s.prefecture === slug || s.city === slug).length
</script>

<template>
  <div>
    <!-- Hero (list.png) -->
    <section class="relative" aria-labelledby="access-title">
      <div class="relative h-[200px] overflow-hidden bg-paper sm:h-[300px] md:h-[375px]">
        <img src="/images/access/hero.webp" alt="An EYS-Kids dance studio" width="1916" height="397" class="h-full w-full object-cover" fetchpriority="high" decoding="async">
        <nav aria-label="Breadcrumb" class="absolute left-1/2 top-3 hidden -translate-x-1/2 md:block">
          <ol class="flex items-center gap-4 bg-ink/80 px-4 py-1 text-[10px] text-white">
            <li><NuxtLink to="/" class="hover:underline">EYS-Kids Dance Academy Home</NuxtLink></li>
            <li class="flex items-center gap-2"><Icon name="chevron" class="h-2.5 w-2.5" /><span aria-current="page">Access</span></li>
          </ol>
        </nav>
      </div>
      <div class="band px-4 pb-8 md:pb-7">
        <ChamferCard size="lg" class="relative mx-auto -mt-14 max-w-[750px] md:-mt-11" body-class="px-5 pb-10 pt-8 text-center sm:px-10 md:pt-10">
          <DisplayTitle text="ACCESS" tag="p" class="!text-[36px] sm:!text-[46px] md:!text-[52px]" />
          <h1 id="access-title" class="mt-5 text-xl leading-relaxed tracking-wide text-ink sm:text-[26px]">
            Growing nationwide!<br>What makes EYS-Kids<br class="sm:hidden"> studios special
          </h1>
          <ul class="mx-auto mt-8 grid max-w-[640px] grid-cols-2 gap-x-4 gap-y-8 text-left sm:grid-cols-3 md:grid-cols-5 md:gap-x-5">
            <li v-for="f in accessFeatures" :key="f.title" class="flex flex-col items-center">
              <div class="w-[92px] md:w-[106px]"><StudioFeatureHex :icon="f.icon" /></div>
              <h2 class="mt-3 text-sm text-ink">{{ f.title }}</h2>
              <p class="mt-3 w-full text-[13px] leading-relaxed text-ink-soft md:text-xs">{{ f.text }}</p>
            </li>
          </ul>
        </ChamferCard>
      </div>
    </section>

    <!-- Search (jer.png) -->
    <section aria-labelledby="search-title" class="bg-paper-light pt-8 md:pt-6">
      <h2 id="search-title" class="sr-only">Find a studio</h2>
      <div class="container-x">
        <div class="mx-auto flex w-full max-w-[400px] rounded-full border border-paper bg-white p-0.5" role="tablist" aria-label="Search method">
          <button id="tab-filter" type="button" role="tab" :aria-selected="mode === 'filter'" aria-controls="panel-filter"
            class="h-12 flex-1 rounded-full text-sm transition-colors md:h-[58px]" :class="mode === 'filter' ? 'bg-brand-blue text-white shadow-[0_3px_6px_rgba(0,0,0,0.16)]' : 'text-ink-soft hover:text-brand-blue'"
            @click="mode = 'filter'">Search by Filters</button>
          <button id="tab-word" type="button" role="tab" :aria-selected="mode === 'word'" aria-controls="panel-word"
            class="h-12 flex-1 rounded-full text-sm transition-colors md:h-[58px]" :class="mode === 'word' ? 'bg-brand-blue text-white shadow-[0_3px_6px_rgba(0,0,0,0.16)]' : 'text-ink-soft hover:text-brand-blue'"
            @click="mode = 'word'">Search by Keyword</button>
        </div>

        <!-- Conditions -->
        <div v-show="mode === 'filter'" id="panel-filter" role="tabpanel" aria-labelledby="tab-filter" class="relative mx-auto mt-6 max-w-[750px]">
          <p class="relative z-10 mx-auto -mb-3 w-fit skew-box bg-brand-purple px-10 py-2 text-[13px] text-white md:px-16">
            Choose Courses <span class="ml-2 text-[10px] opacity-90">(select any)</span>
          </p>
          <div class="relative bg-white px-4 pb-10 pt-8 shadow-[0_3px_8px_rgba(0,0,0,0.1)] sm:px-8 md:px-[86px]">
            <label class="mx-auto flex w-fit cursor-pointer items-center gap-2 text-[13px] text-ink-soft">
              <input v-model="allSelected" type="checkbox" class="h-4 w-4 rounded-sm border-ink-mute accent-brand-sky">Select all courses
            </label>
            <ul class="mt-5 grid grid-cols-3 border-l border-t border-paper sm:grid-cols-5">
              <li v-for="g in genres" :key="g.id" class="border-b border-r border-paper">
                <button type="button" class="group relative flex h-full w-full flex-col text-center" :aria-pressed="selected.includes(g.id)" @click="toggleGenre(g.id)">
                  <span class="relative block aspect-[152/98] w-full overflow-hidden">
                    <img :src="g.image" :alt="''" width="152" height="98" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
                    <span v-if="selected.includes(g.id)" class="band absolute inset-0 grid place-items-center opacity-80">
                      <Icon name="check" class="h-9 w-9 text-white [stroke-width:3]" />
                    </span>
                  </span>
                  <span class="flex min-h-[44px] flex-1 items-center justify-center whitespace-pre-line px-1 py-1.5 text-[11px] leading-tight sm:text-xs"
                    :class="selected.includes(g.id) ? 'band text-white' : 'bg-white text-ink'">{{ g.label }}</span>
                </button>
              </li>
            </ul>

            <fieldset class="mt-8">
              <legend class="mx-auto text-center text-[13px] text-ink-soft">Choose an Area</legend>
              <div class="mt-3 flex flex-wrap justify-center gap-2">
                <button type="button" class="h-10 min-w-[88px] border px-4 text-[13px] transition-colors"
                  :class="!pref ? 'border-brand-purple bg-brand-purple text-white' : 'border-paper bg-white text-ink hover:border-brand-purple'"
                  :aria-pressed="!pref" @click="pref = ''; city = ''">All areas</button>
                <button v-for="p in prefectures" :key="p.slug" type="button" class="h-10 min-w-[88px] border px-4 text-[13px] transition-colors"
                  :class="pref === p.slug ? 'border-brand-purple bg-brand-purple text-white' : 'border-paper bg-white text-ink hover:border-brand-purple'"
                  :aria-pressed="pref === p.slug" @click="pickPref(p.slug)">{{ p.label }}</button>
              </div>
              <div v-if="pref" class="mt-3 flex flex-wrap justify-center gap-2">
                <button v-for="c in citiesOf(pref)" :key="c.slug" type="button" class="h-10 rounded-full border px-4 text-xs transition-colors"
                  :class="city === c.slug ? 'border-brand-sky bg-brand-sky text-white' : 'border-brand-sky/40 bg-white text-brand-sky hover:border-brand-sky'"
                  :aria-pressed="city === c.slug" @click="city = city === c.slug ? '' : c.slug">{{ c.label }} ({{ countIn(c.slug) }})</button>
              </div>
            </fieldset>
            <div v-if="selected.length || pref" class="mt-6 text-center">
              <button type="button" class="text-xs text-ink-mute underline hover:text-ink" @click="reset">Clear filters</button>
            </div>
          </div>
        </div>

        <!-- Word -->
        <div v-show="mode === 'word'" id="panel-word" role="tabpanel" aria-labelledby="tab-word" class="relative mx-auto mt-6 max-w-[750px]">
          <p class="relative z-10 mx-auto -mb-3 w-fit skew-box bg-brand-purple px-10 py-2 text-[13px] text-white md:px-16">Search by Keyword</p>
          <form role="search" class="bg-white px-4 pb-10 pt-9 shadow-[0_3px_8px_rgba(0,0,0,0.1)] sm:px-8 md:px-[86px]" @submit.prevent="submitWord">
            <label for="studio-q" class="block text-center text-[13px] text-ink-soft">Enter a station, area or studio name</label>
            <div class="mt-4 flex">
              <input id="studio-q" v-model="draft" type="search" enterkeyhint="search" placeholder="e.g. Daikanyama, Shibuya, Yokohama"
                class="h-12 min-w-0 flex-1 border border-r-0 border-paper bg-paper-light px-4 text-base text-ink placeholder:text-ink-mute focus:border-brand-sky focus:bg-white focus:outline-none sm:text-sm">
              <button type="submit" class="flex h-12 items-center gap-2 bg-brand-blue px-5 text-sm text-white hover:bg-[#0068c4]">
                <Icon name="search" class="h-4 w-4" />Search
              </button>
            </div>
            <div class="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
              <span class="text-ink-mute">Popular searches:</span>
              <button v-for="w in suggestions" :key="w" type="button" class="h-9 rounded-full border border-paper px-3 text-ink-soft hover:border-brand-sky hover:text-brand-sky" @click="draft = w; submitWord()">{{ w }}</button>
            </div>
          </form>
        </div>
      </div>
      <!-- pointer -->
      <div class="relative z-10 mx-auto h-0 w-0 translate-y-full border-x-[28px] border-t-[20px] border-x-transparent border-t-white drop-shadow-[0_3px_2px_rgba(0,0,0,0.06)]" aria-hidden="true" />
    </section>

    <section class="relative pb-16 pt-12 md:pb-20" aria-label="Search results">
      <div class="band absolute inset-0 opacity-30" aria-hidden="true" />
      <div class="container-x relative">
        <div class="mx-auto max-w-[750px]">
          <StudioResults :studios="results" :title="resultTitle">
            <template #empty>
              <div class="mt-5"><button type="button" class="text-xs text-brand-sky underline" @click="reset">Reset filters</button></div>
            </template>
          </StudioResults>
        </div>
      </div>
    </section>

    <!-- Browse by area -->
    <section class="section bg-white">
      <div class="container-x">
        <SectionHeading en="AREA" title="Browse by Area" />
        <ul class="mx-auto mt-10 grid max-w-[900px] gap-5 md:grid-cols-3">
          <li v-for="p in prefectures" :key="p.slug">
            <ChamferCard size="sm" body-class="p-5 h-full">
              <NuxtLink :to="`/access/${p.slug}`" class="flex items-center justify-between border-b border-paper pb-3 text-base text-ink hover:text-brand-sky">
                <span>{{ p.name }}<span class="ml-2 font-display text-xs text-ink-mute">{{ countIn(p.slug) }} {{ countIn(p.slug) === 1 ? 'studio' : 'studios' }}</span></span>
                <Icon name="chevron" class="h-4 w-4 text-brand-sky" />
              </NuxtLink>
              <ul class="mt-3 flex flex-wrap gap-2">
                <li v-for="c in citiesOf(p.slug)" :key="c.slug">
                  <NuxtLink :to="`/access/${c.slug}`" class="inline-flex h-10 items-center rounded-full border border-brand-sky/40 px-4 text-xs text-brand-sky hover:bg-brand-sky hover:text-white">
                    {{ c.label }} ({{ countIn(c.slug) }})
                  </NuxtLink>
                </li>
              </ul>
            </ChamferCard>
          </li>
        </ul>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
