<script setup lang="ts">
import type { NewsSummary } from '~/data/news'

defineProps<{ items: NewsSummary[] }>()
</script>

<template>
  <section class="section bg-white" aria-labelledby="updates-title">
    <div class="container-wide">
      <div class="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <DisplayTitle text="Updates" tag="p" />
          <h2 id="updates-title" class="mt-3 text-xl font-semibold text-ink sm:text-2xl">News from the hub</h2>
        </div>
        <SkewButton to="/news" color="sky" class="hidden md:inline-flex">All updates</SkewButton>
      </div>
      <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="n in items" :key="n.id" class="sm:last:hidden lg:last:block"><NewsCard :item="n" show-tag /></li>
      </ul>
      <div class="mt-10 text-center md:hidden">
        <SkewButton to="/news" color="sky" size="lg" class="w-full sm:w-auto">All updates</SkewButton>
      </div>
    </div>
  </section>
</template>
