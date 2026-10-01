<script setup lang="ts">
import { newsCategories } from '~/data/news'
import type { NewsCategory, NewsSummary } from '~/data/news'

useSeoMeta({
  title: 'Updates',
  description: 'News from Tiny Explorers Hub: new video series, milestones and announcements from our little learning channel.',
})

const PAGE = 9
const route = useRoute()
const router = useRouter()
const isCategory = (v: unknown): v is NewsCategory => newsCategories.some(c => c.id === v)
const category = ref<NewsCategory | ''>(isCategory(route.query.category) ? route.query.category : '')
const visible = ref(PAGE)

const { data, status } = await useFetch<{ total: number, items: NewsSummary[] }>('/api/news', {
  query: computed(() => ({ category: category.value || undefined, limit: 50 })),
})
const items = computed(() => data.value?.items.slice(0, visible.value) ?? [])
const remaining = computed(() => (data.value?.total ?? 0) - items.value.length)

function select(c: NewsCategory | '') {
  category.value = c
  visible.value = PAGE
  router.replace({ query: c ? { category: c } : {} })
}
watch(() => route.query.category, (v) => {
  const next = isCategory(v) ? v : ''
  if (next !== category.value) select(next)
})

const tabs = [{ id: '' as const, color: '#0B1F4F', label: 'All' }, ...newsCategories.map(c => ({ ...c, label: c.id }))]
</script>

<template>
  <div>
    <PageHero en="Updates" title="News from Tiny Explorers Hub" image="/images/posters/happy-new-week.webp" alt="Three happy children running across a sunny park" :crumbs="[{ label: 'Updates' }]" />

    <section class="section bg-paper-light" aria-label="Updates">
      <div class="container-x">
        <div class="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <ul class="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center" aria-label="Filter by category">
            <li v-for="t in tabs" :key="t.id">
              <button
                type="button"
                class="h-11 min-w-[96px] rounded-full border-2 px-5 text-sm font-bold transition-colors"
                :class="category === t.id ? 'text-white' : 'bg-white text-ink hover:bg-paper'"
                :style="category === t.id ? { backgroundColor: t.color, borderColor: t.color } : { borderColor: `${t.color}40` }"
                :aria-pressed="category === t.id"
                @click="select(t.id)"
              >
                {{ t.label }}
              </button>
            </li>
          </ul>
        </div>

        <p class="mt-6 text-center text-sm font-semibold text-ink-mute" aria-live="polite">{{ data?.total ?? 0 }} {{ data?.total === 1 ? 'update' : 'updates' }}</p>

        <ul v-if="items.length" class="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" :class="{ 'opacity-60': status === 'pending' }">
          <li v-for="n in items" :key="n.id">
            <NewsCard :item="n" show-tag />
          </li>
        </ul>
        <p v-else class="mt-10 text-center text-base text-ink-soft">No updates here yet.</p>

        <div v-if="remaining > 0" class="mt-10 text-center">
          <SkewButton color="sky" size="lg" class="min-w-[240px]" @click="visible += PAGE">Load more ({{ remaining }})</SkewButton>
        </div>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
