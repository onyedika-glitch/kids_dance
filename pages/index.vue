<script setup lang="ts">
import type { NewsSummary } from '~/data/news'

useSeoMeta({
  title: '',
  description: 'EYS-Kids Dance Academy is a kids\' dance school for ages 3 through upper elementary. With 68,434 members and easy-to-reach studios near stations nationwide, our STE-LAM education and Karte progress reports help grow kids\' hearts and bodies. Book a free trial lesson today.',
})

type NewsList = { total: number, items: NewsSummary[] }
const [{ data: topics }, { data: columns }] = await Promise.all([
  useFetch<NewsList>('/api/news', { query: { exclude: 'Column', limit: 6 }, key: 'home-topics' }),
  useFetch<NewsList>('/api/news', { query: { category: 'Column', limit: 6 }, key: 'home-columns' }),
])
</script>

<template>
  <div>
    <!-- Panel -->
    <section class="relative bg-paper" aria-labelledby="hero-title">
      <h1 id="hero-title" class="sr-only">EYS-Kids Dance Academy — Growing kids' hearts and bodies</h1>
      <picture>
        <source media="(max-width: 767px)" srcset="/images/home/hero-sm.webp" width="960" height="400" />
        <img src="/images/home/hero.webp" alt="Three girls jumping and dancing with the words &quot;Let's Dance!&quot;" width="1920" height="801" fetchpriority="high" decoding="async" class="aspect-[1920/801] w-full object-cover" />
      </picture>
      <p class="absolute left-[52.8%] top-[85.9%] -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-medium text-white [text-shadow:0_1px_3px_rgba(0,0,0,.35)] sm:text-sm lg:text-lg xl:text-xl" aria-hidden="true">— Growing kids' hearts and bodies · EYS-Kids Dance Academy —</p>
    </section>

    <HomeWhy />
    <FreeTrialCta />
    <HomeAbout />
    <HomeLesson />
    <HomeKarte />
    <HomeNews v-if="topics?.items.length" :items="topics.items" />
    <HomeColumns v-if="columns?.items.length" :items="columns.items" />
    <HomeClasses />
    <FreeTrialCta />
    <CampaignBanner />
  </div>
</template>
