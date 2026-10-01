<script setup lang="ts">
import { pillars } from '~/data/site'
import { pillarImages } from '~/data/home'
</script>

<template>
  <section id="about" class="section overflow-hidden bg-paper-light" aria-labelledby="pillars-title">
    <div class="container-wide">
      <SectionHeading en="Learn and grow" tag="p" lead="Every video is built on four simple promises, printed right on our channel banner.">
        <h2 id="pillars-title" class="mt-4 text-xl font-semibold text-ink sm:text-2xl">What little explorers get from every video</h2>
      </SectionHeading>
      <ul class="mx-auto mt-12 grid max-w-[1080px] grid-cols-2 gap-x-5 gap-y-10 sm:gap-x-8 lg:grid-cols-4 lg:gap-x-10">
        <li v-for="p in pillars" :key="p.title" class="text-center">
          <HexFrame :color="p.color" :image="pillarImages[p.title]?.image" :alt="pillarImages[p.title]?.alt" class="mx-auto max-w-[240px]">
            <span class="absolute -bottom-3 left-1/2 grid h-11 w-11 -translate-x-1/2 place-items-center rounded-full border-4 border-paper-light text-white sm:h-12 sm:w-12" :style="{ backgroundColor: p.color }" aria-hidden="true">
              <Icon :name="p.icon" class="h-5 w-5" />
            </span>
          </HexFrame>
          <h3 class="mt-10 text-lg font-bold sm:text-xl" :style="{ color: p.color === '#FFB800' ? '#B37F00' : p.color }">{{ p.title }}</h3>
          <p class="mx-auto mt-2 max-w-[240px] text-sm leading-relaxed text-ink-soft">{{ p.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
