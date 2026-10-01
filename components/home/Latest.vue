<script setup lang="ts">
import type { VideoItem } from '~/data/videos'

defineProps<{ videos: VideoItem[], total: number }>()
</script>

<template>
  <section class="section bg-white" aria-labelledby="latest-title">
    <div class="container-wide">
      <div class="flex flex-col items-center gap-4 text-center md:flex-row md:items-end md:justify-between md:text-left">
        <div>
          <DisplayTitle text="New videos" tag="p" />
          <h2 id="latest-title" class="mt-3 text-xl font-semibold text-ink sm:text-2xl">Fresh from the hub</h2>
        </div>
        <SkewButton to="/videos" color="sky" class="hidden md:inline-flex">See all {{ total }} videos</SkewButton>
      </div>
      <ul class="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        <li v-for="(v, i) in videos" :key="v.id" :class="{ 'max-sm:hidden': i >= 4 }"><VideoCard :video="v" /></li>
      </ul>
      <div class="mt-10 text-center md:hidden">
        <SkewButton to="/videos" color="sky" size="lg" class="w-full sm:w-auto">See all {{ total }} videos</SkewButton>
      </div>
    </div>
  </section>
</template>
