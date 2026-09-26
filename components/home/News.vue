<script setup lang="ts">
import type { NewsSummary } from '~/data/news'

// News / topics carousel (News.png)
defineProps<{ items: NewsSummary[] }>()
</script>

<template>
  <section class="relative overflow-hidden bg-paper-light py-14 md:py-20" aria-labelledby="topics-title">
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <div class="absolute inset-x-0 bottom-0 h-1/2 bg-paper [clip-path:polygon(100%_0,100%_100%,0_100%)]" />
      <span class="absolute left-[16%] top-[-60px] h-44 w-44 rounded-full border-[14px] border-brand-coral/15" />
      <span class="absolute bottom-[-40px] right-[18%] h-64 w-64 rounded-full border-[16px] border-brand-coral/15" />
    </div>
    <div class="container-x relative">
      <SectionHeading id="topics-title" en="NEWS" title="News & Topics" />
      <HomeCarousel label="News and topics" tone="cream" class="mx-auto mt-10 max-w-[760px]">
        <div v-for="n in items" :key="n.id" class="w-[78%] shrink-0 snap-start sm:w-[calc((100%-2.5rem)/3)]">
          <NewsTopicCard :item="n" />
        </div>
      </HomeCarousel>
    </div>
  </section>
</template>
