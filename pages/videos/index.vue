<script setup lang="ts">
import { categories, type CategoryId, type VideoItem } from '~/data/videos'

useSeoMeta({
  title: 'Videos',
  description: 'Short, cheerful learning videos for toddlers and preschoolers: ABCs and phonics, amazing animals, songs and culture, faith and family fun. Free to watch together.',
})

const route = useRoute()
const router = useRouter()
const { data } = await useFetch<{ videos: VideoItem[], total: number }>('/api/videos', { key: 'videos-all' })
const all = computed(() => data.value?.videos ?? [])

const counts = computed(() => {
  const c = Object.fromEntries(categories.map(x => [x.id, 0])) as Record<CategoryId, number>
  for (const v of all.value) c[v.category]++
  return c
})
const active = computed<CategoryId | null>(() => {
  const q = route.query.category
  return categories.some(c => c.id === q && counts.value[c.id]) ? q as CategoryId : null
})
const activeCat = computed(() => categories.find(c => c.id === active.value))
function pick(id: CategoryId | null) {
  router.replace({ query: { ...route.query, category: id ?? undefined } })
}

const search = ref('')
const sort = ref<'new' | 'loved'>('new')
const PAGE = 12
const shown = ref(PAGE)
watch([active, search, sort], () => { shown.value = PAGE })

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  const list = all.value.filter(v => (!active.value || v.category === active.value) && (!q || v.title.toLowerCase().includes(q)))
  return sort.value === 'loved'
    ? [...list].sort((a, b) => b.likes - a.likes || b.publishedAt.localeCompare(a.publishedAt))
    : list
})
const visible = computed(() => filtered.value.slice(0, shown.value))

function reset() {
  search.value = ''
  pick(null)
}
</script>

<template>
  <div>
    <PageHero en="VIDEOS" title="Tiny videos, big adventures" image="/images/posters/octopus-three-hearts.webp" alt="An octopus swimming in the ocean" :crumbs="[{ label: 'Videos' }]" />

    <section class="section pt-10 md:pt-14" aria-labelledby="library-title">
      <div class="container-wide">
        <h2 id="library-title" class="sr-only">Video library</h2>
        <p class="mx-auto max-w-2xl text-center text-base leading-relaxed text-ink-soft">
          Every video is about 10 seconds of learning fun: watch one with your little one, then try the activity together.
        </p>

        <!-- Category chips -->
        <nav class="mt-8" aria-label="Video categories">
          <ul class="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <li class="shrink-0">
              <button type="button" class="inline-flex h-11 items-center gap-2 rounded-full border-2 px-4 whitespace-nowrap font-display text-sm font-semibold transition" :class="!active ? 'border-ink bg-ink text-white' : 'border-ink/15 bg-white text-ink hover:border-ink/40'" :aria-pressed="!active" @click="pick(null)">
                All videos <span class="rounded-full px-2 text-xs" :class="!active ? 'bg-white/20' : 'bg-paper'">{{ all.length }}</span>
              </button>
            </li>
            <li v-for="c in categories" :key="c.id" class="shrink-0">
              <button v-if="counts[c.id]" type="button" class="inline-flex h-11 items-center gap-2 rounded-full border-2 px-4 whitespace-nowrap font-display text-sm font-semibold transition" :class="active === c.id ? 'text-white' : 'bg-white text-ink hover:border-current'" :style="active === c.id ? { backgroundColor: c.color, borderColor: c.color } : { borderColor: `${c.color}55` }" :aria-pressed="active === c.id" @click="pick(c.id)">
                <span v-if="active !== c.id" class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: c.color }" aria-hidden="true" />
                {{ c.label }} <span class="rounded-full px-2 text-xs" :class="active === c.id ? 'bg-white/25' : 'bg-paper'">{{ counts[c.id] }}</span>
              </button>
              <span v-else class="inline-flex h-11 cursor-not-allowed items-center gap-2 rounded-full border-2 border-dashed border-ink/20 whitespace-nowrap px-4 font-display text-sm font-semibold text-ink-mute" aria-disabled="true">
                {{ c.label }} <span class="rounded-full bg-paper px-2 text-[11px] uppercase tracking-wide">Coming soon</span>
              </span>
            </li>
          </ul>
        </nav>
        <p v-if="activeCat" class="mt-4 text-center text-sm font-semibold" :style="{ color: activeCat.color }">{{ activeCat.blurb }}</p>

        <!-- Search + sort -->
        <div class="mx-auto mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
          <label class="relative flex-1">
            <span class="sr-only">Search videos by title</span>
            <Icon name="search" class="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-mute" />
            <input v-model="search" type="search" placeholder="Search videos (try &quot;kite&quot; or &quot;hearts&quot;)" class="h-12 w-full rounded-full border-2 border-ink/10 bg-white pl-12 pr-4 text-sm text-ink placeholder:text-ink-mute focus:border-brand-sky focus:outline-none">
          </label>
          <label class="flex items-center gap-2 text-sm font-semibold text-ink-soft">
            Sort
            <select v-model="sort" class="h-12 rounded-full border-2 border-ink/10 bg-white px-4 font-semibold text-ink focus:border-brand-sky focus:outline-none">
              <option value="new">Newest</option>
              <option value="loved">Most loved</option>
            </select>
          </label>
        </div>

        <p class="mt-8 text-sm font-semibold text-ink-soft" aria-live="polite">
          {{ filtered.length }} {{ filtered.length === 1 ? 'video' : 'videos' }}<template v-if="activeCat"> in {{ activeCat.label }}</template><template v-if="search.trim()"> matching “{{ search.trim() }}”</template>
        </p>

        <ul v-if="visible.length" class="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <li v-for="v in visible" :key="v.id"><VideoCard :video="v" /></li>
        </ul>

        <ChamferCard v-else class="mx-auto mt-6 max-w-lg" body-class="px-6 py-10 text-center">
          <img src="/images/logo-96.webp" alt="" width="64" height="64" class="mx-auto h-16 w-16">
          <p class="mt-4 font-display text-xl font-semibold text-ink">No videos found</p>
          <p class="mt-2 text-sm text-ink-soft">Try another word or look through all our videos.</p>
          <SkewButton color="sky" class="mt-6" @click="reset">Show all videos</SkewButton>
        </ChamferCard>

        <div v-if="filtered.length > shown" class="mt-10 text-center">
          <SkewButton color="coral" size="lg" @click="shown += PAGE">Load more videos</SkewButton>
        </div>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
