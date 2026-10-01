<script setup lang="ts">
import { formatDate } from '~/data/news'
import type { NewsItem, NewsSummary } from '~/data/news'

const route = useRoute()
const id = computed(() => String(route.params.id))

const { data, error } = await useFetch<{ item: NewsItem, newer: NewsSummary | null, older: NewsSummary | null, related: NewsSummary[] }>(() => `/api/news/${id.value}`)
if (error.value || !data.value) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

const article = computed(() => data.value!.item)
const external = (to: string) => /^https?:/.test(to)
useSeoMeta({
  title: () => article.value.title,
  description: () => article.value.excerpt,
  ogImage: () => article.value.image,
  ogType: 'article',
})
</script>

<template>
  <div v-if="data">
    <PageHero en="Updates" :title="article.title" :image="article.image" :alt="article.alt" :crumbs="[{ label: 'Updates', to: '/news' }, { label: article.title }]" />

    <section class="section bg-paper-light">
      <div class="mx-auto w-full max-w-[800px] px-4 sm:px-6">
        <ChamferCard size="lg" tag="article" body-class="px-5 py-8 sm:px-12 sm:py-12">
          <div class="flex flex-wrap items-center gap-3">
            <NewsTag :category="article.category" />
            <time :datetime="article.date" class="text-sm font-bold text-ink-mute">{{ formatDate(article.date) }}</time>
          </div>
          <p class="mt-5 text-lg leading-relaxed text-ink-soft">{{ article.excerpt }}</p>

          <figure class="relative mt-6 overflow-hidden rounded-2xl bg-paper">
            <img :src="article.image" :alt="article.alt" width="1280" height="720" decoding="async" class="aspect-video w-full object-cover">
            <NuxtLink v-if="article.video" :to="`/videos/${article.video}`" class="group absolute inset-0 grid place-items-center" aria-label="Watch the video">
              <span class="grid h-16 w-16 place-items-center rounded-full bg-white/90 text-brand-coral shadow-lift transition group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-ink"><Icon name="play" class="ml-1 h-8 w-8" /></span>
            </NuxtLink>
          </figure>

          <div class="mt-8 space-y-6">
            <div v-for="(b, i) in article.body" :key="i">
              <h2 v-if="b.heading" class="mb-2 text-xl font-semibold text-ink">{{ b.heading }}</h2>
              <p class="text-base leading-loose text-ink">{{ b.text }}</p>
            </div>
          </div>

          <div v-if="article.video || article.link" class="mt-10 flex flex-col gap-3 border-t-2 border-dashed border-paper pt-8 sm:flex-row sm:flex-wrap">
            <SkewButton v-if="article.video" :to="`/videos/${article.video}`" color="coral" class="w-full sm:w-auto">Watch the video</SkewButton>
            <template v-if="article.link">
              <SkewButton v-if="external(article.link.to)" :href="article.link.to" color="sky" class="w-full sm:w-auto">{{ article.link.label }}</SkewButton>
              <SkewButton v-else :to="article.link.to" color="sky" class="w-full sm:w-auto">{{ article.link.label }}</SkewButton>
            </template>
          </div>
        </ChamferCard>

        <nav class="mt-8 grid gap-3 sm:grid-cols-2" aria-label="Previous and next updates">
          <NuxtLink v-if="data.older" :to="`/news/${data.older.id}`" class="group flex min-h-16 items-center gap-3 rounded-2xl bg-white p-4 text-sm text-ink shadow-sm transition hover:text-brand-sky">
            <Icon name="chevron-left" class="h-4 w-4 shrink-0 text-brand-sky" />
            <span class="min-w-0"><span class="block text-xs font-semibold text-ink-mute">Previous update</span><span class="line-clamp-1 font-bold">{{ data.older.title }}</span></span>
          </NuxtLink>
          <span v-else class="hidden sm:block" />
          <NuxtLink v-if="data.newer" :to="`/news/${data.newer.id}`" class="group flex min-h-16 items-center justify-end gap-3 rounded-2xl bg-white p-4 text-right text-sm text-ink shadow-sm transition hover:text-brand-sky">
            <span class="min-w-0"><span class="block text-xs font-semibold text-ink-mute">Next update</span><span class="line-clamp-1 font-bold">{{ data.newer.title }}</span></span>
            <Icon name="chevron" class="h-4 w-4 shrink-0 text-brand-sky" />
          </NuxtLink>
        </nav>
      </div>

      <div v-if="data.related.length" class="container-wide mt-16">
        <h2 class="text-center text-2xl font-semibold text-ink">More updates</h2>
        <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="n in data.related" :key="n.id" class="sm:last:hidden lg:last:block">
            <NewsCard :item="n" show-tag />
          </li>
        </ul>
        <div class="mt-10 text-center">
          <SkewButton to="/news" color="sky" size="lg" class="w-full sm:w-auto sm:min-w-[240px]">Back to all updates</SkewButton>
        </div>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
