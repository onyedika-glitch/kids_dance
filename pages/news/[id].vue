<script setup lang="ts">
import { formatDate } from '~/data/news'
import type { NewsItem, NewsSummary } from '~/data/news'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data, error } = await useFetch<{ item: NewsItem, newer: NewsSummary | null, older: NewsSummary | null, related: NewsSummary[] }>(() => `/api/news/${id.value}`)
if (error.value || !data.value) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

const article = computed(() => data.value!.item)
useSeoMeta({
  title: () => article.value.title,
  description: () => article.value.excerpt,
  ogImage: () => article.value.image,
  ogType: 'article',
})
</script>

<template>
  <div v-if="data">
    <PageHero en="NEWS" :title="article.title" image="/images/news/hero.webp" alt="Kids smiling and having fun dancing" :crumbs="[{ label: 'News', to: '/news' }, { label: article.title }]" />

    <section class="section bg-paper">
      <div class="mx-auto w-full max-w-[800px] px-4 sm:px-6">
        <ChamferCard size="lg" tag="article" body-class="px-5 py-8 sm:px-12 sm:py-12">
          <div class="flex flex-wrap items-center gap-3">
            <NewsTag :category="article.category" />
            <time :datetime="article.date" class="font-display text-xs text-ink-mute">{{ formatDate(article.date) }}</time>
          </div>
          <p class="mt-4 text-sm leading-relaxed text-ink-soft">{{ article.excerpt }}</p>

          <figure class="relative mt-6 overflow-hidden bg-paper">
            <img :src="article.image" :alt="article.alt" width="800" height="500" decoding="async" class="aspect-[16/10] w-full object-cover" />
            <span v-if="article.video" class="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <span class="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white bg-white/60"><Icon name="play" class="ml-1 h-6 w-6 text-[#999]" /></span>
            </span>
          </figure>

          <div class="mt-8 space-y-6">
            <div v-for="(b, i) in article.body" :key="i">
              <h2 v-if="b.heading" class="mb-3 border-l-4 border-brand-sky pl-3 text-lg font-medium text-ink">{{ b.heading }}</h2>
              <p class="text-[15px] leading-loose text-ink">{{ b.text }}</p>
            </div>
          </div>

          <aside class="mt-10 flex gap-4 rounded bg-paper-light p-4 sm:p-5" aria-label="Staff comment">
            <span class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-white bg-lilac text-lg font-medium text-brand-purple shadow" aria-hidden="true">{{ article.author.name.slice(0, 1) }}</span>
            <div>
              <p class="text-sm font-medium text-ink">{{ article.author.name }}<span class="ml-2 text-xs font-normal text-ink-mute">{{ article.author.role }}</span></p>
              <p class="mt-1 text-sm leading-relaxed text-ink-soft">{{ article.comment }}</p>
            </div>
          </aside>
        </ChamferCard>

        <nav class="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Previous and next articles">
          <NuxtLink v-if="data.older" :to="`/news/${data.older.id}`" class="group flex items-center gap-3 bg-white p-4 text-sm text-ink shadow-sm transition hover:text-brand-sky">
            <Icon name="chevron-left" class="h-4 w-4 shrink-0 text-brand-sky" />
            <span class="min-w-0"><span class="block text-[11px] text-ink-mute">Previous article</span><span class="line-clamp-1">{{ data.older.title }}</span></span>
          </NuxtLink>
          <span v-else class="hidden sm:block" />
          <NuxtLink v-if="data.newer" :to="`/news/${data.newer.id}`" class="group flex items-center justify-end gap-3 bg-white p-4 text-right text-sm text-ink shadow-sm transition hover:text-brand-sky">
            <span class="min-w-0"><span class="block text-[11px] text-ink-mute">Next article</span><span class="line-clamp-1">{{ data.newer.title }}</span></span>
            <Icon name="chevron" class="h-4 w-4 shrink-0 text-brand-sky" />
          </NuxtLink>
        </nav>
      </div>

      <div v-if="data.related.length" class="container-x mt-16">
        <h2 class="text-center text-xl font-medium text-ink">Related Articles</h2>
        <ul class="mt-8 grid gap-6 sm:grid-cols-3">
          <li v-for="n in data.related" :key="n.id">
            <NewsCard :item="n" show-tag />
          </li>
        </ul>
        <div class="mt-10 text-center">
          <SkewButton to="/news" color="sky" size="lg" class="min-w-[240px]">Back to All News</SkewButton>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
