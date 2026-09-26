<script setup lang="ts">
import { newsCategories } from '~/data/news'
import type { NewsCategory, NewsSummary } from '~/data/news'

useSeoMeta({
  title: 'News',
  description: 'The latest from EYS-Kids Dance Academy: new studio openings, recitals and events, campaigns, and columns from our staff.',
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

const tabs = [{ id: '' as const, color: '#333333', label: 'All' }, ...newsCategories.map(c => ({ ...c, label: c.id }))]
</script>

<template>
  <div>
    <PageHero en="NEWS" title="News" image="/images/news/hero.webp" alt="Kids smiling and having fun dancing" :crumbs="[{ label: 'News' }]" />

    <section class="section bg-paper" aria-label="Articles">
      <div class="container-x">
        <div class="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0 [&::-webkit-scrollbar]:hidden">
          <ul class="flex w-max gap-2 sm:w-auto sm:flex-wrap sm:justify-center" aria-label="Filter by category">
            <li v-for="t in tabs" :key="t.id">
              <button
                type="button"
                class="skew-box h-10 min-w-[96px] px-5 text-sm transition-colors"
                :class="category === t.id ? 'text-white' : 'bg-white text-ink hover:bg-lilac'"
                :style="category === t.id ? { backgroundColor: t.color } : {}"
                :aria-pressed="category === t.id"
                @click="select(t.id)"
              >
                {{ t.label }}
              </button>
            </li>
          </ul>
        </div>

        <p class="mt-6 text-center text-xs text-ink-mute" aria-live="polite">{{ data?.total ?? 0 }} {{ data?.total === 1 ? 'article' : 'articles' }}</p>

        <ul v-if="items.length" class="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3" :class="{ 'opacity-60': status === 'pending' }">
          <li v-for="n in items" :key="n.id">
            <NewsCard :item="n" show-tag />
          </li>
        </ul>
        <p v-else class="mt-10 text-center text-sm text-ink-soft">No articles here yet.</p>

        <div v-if="remaining > 0" class="mt-10 text-center">
          <button type="button" class="skew-box inline-flex h-12 min-w-[240px] items-center justify-center gap-3 bg-brand-sky px-10 text-sm font-medium text-white transition-colors hover:bg-[#1c98c8]" @click="visible += PAGE">
            Load More<span class="text-xs opacity-80">({{ remaining }} more)</span><Icon name="chevron-down" class="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
