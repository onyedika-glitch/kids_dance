<script setup lang="ts">
import type { NewsSummary } from '~/data/news'

// "EYS-Kids Dance Academy Insights" article carousel (New.png)
defineProps<{ items: NewsSummary[] }>()
</script>

<template>
  <section class="relative overflow-hidden bg-white pb-14 pt-10 md:pb-20" aria-labelledby="columns-title">
    <div class="relative">
      <img src="/images/news/hero.webp" alt="" width="1159" height="235" loading="lazy" decoding="async" class="h-[140px] w-full object-cover opacity-60 md:h-[236px]" />
      <h2 id="columns-title" class="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-6">
        <span class="relative block -rotate-6 bg-[#2E9CF0] px-7 py-3 text-center text-sm leading-snug text-white shadow-md [clip-path:polygon(0_12%,100%_0,94%_100%,6%_88%)] md:px-10 md:py-4">EYS-Kids<br>Dance Academy<br>Insights</span>
        <span class="absolute -bottom-3 left-[58%] h-0 w-0 -rotate-6 border-x-[9px] border-t-[16px] border-x-transparent border-t-[#2E9CF0]" aria-hidden="true" />
      </h2>
    </div>
    <div class="container-x relative -mt-16 md:-mt-24">
      <HomeCarousel label="EYS-Kids Dance Academy insights" tone="sky" class="mx-auto max-w-[760px]">
        <div v-for="n in items" :key="n.id" class="w-[70%] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)]">
          <NewsCard :item="n" />
        </div>
      </HomeCarousel>
      <div class="mt-8 text-center">
        <SkewButton to="/news" color="sky" size="lg" class="min-w-[240px]">Read All Articles</SkewButton>
      </div>
    </div>
  </section>
</template>
