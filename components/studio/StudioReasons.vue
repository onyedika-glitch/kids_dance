<script setup lang="ts">
import { reasons } from '~/data/studios'

// "Why families choose EYS-Kids … Studio: N reasons" on the band (calender.png)
defineProps<{ studioName: string }>()
const top = reasons.slice(0, 4)
const rest = reasons.slice(4)
</script>

<template>
  <section class="band overflow-hidden py-14 md:py-16" aria-labelledby="reasons-title">
    <div class="container-x">
      <h2 id="reasons-title" class="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white sm:gap-x-5">
        <span class="whitespace-pre-line text-center text-sm leading-snug tracking-wide sm:text-base">Why families choose{{ '\n' }}EYS-Kids {{ studioName }}:</span>
        <span class="flex items-center gap-x-3">
        <svg viewBox="0 0 90 110" class="h-24 w-auto sm:h-28" role="img" :aria-label="String(reasons.length)">
          <text x="45" y="92" text-anchor="middle" font-family="Poppins, sans-serif" font-weight="700" font-size="112" fill="#AFC0EE" stroke="#fff" stroke-width="9" paint-order="stroke" stroke-linejoin="round">{{ reasons.length }}</text>
        </svg>
        <span class="text-2xl tracking-wide sm:text-[32px]">reasons</span>
        </span>
      </h2>

      <ol class="mx-auto mt-10 grid max-w-[750px] grid-cols-2 gap-x-3 gap-y-12 sm:gap-x-4 md:grid-cols-4">
        <li v-for="(r, i) in top" :key="r.en" class="relative" :class="i % 2 ? 'md:mt-6' : ''">
          <span class="absolute -top-10 left-1/2 z-10 -translate-x-1/2 font-display text-[56px] font-medium leading-none text-white" aria-hidden="true">{{ i + 1 }}</span>
          <NuxtLink :to="r.to" class="group block drop-shadow-card">
            <div class="chamfer chamfer-lg flex h-full flex-col bg-white pb-6 text-center">
              <div class="relative aspect-[233/120] overflow-hidden">
                <img v-if="r.image" :src="r.image" alt="" width="233" height="120" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105">
                <div v-else class="flex h-full items-center justify-center gap-1.5 bg-lilac">
                  <span v-for="b in ['Fixed\nweekly', 'Free\nmake-ups']" :key="b" class="chamfer chamfer-sm grid h-14 w-14 place-items-center whitespace-pre-line bg-brand-purple text-[10px] leading-tight text-white ring-2 ring-white sm:h-16 sm:w-16 sm:text-xs">{{ b }}</span>
                </div>
              </div>
              <h3 class="mt-3 font-display text-lg tracking-wide sm:text-xl" :style="{ color: r.color }">{{ r.en }}</h3>
              <p class="mt-1.5 whitespace-pre-line px-2 text-[11px] leading-relaxed text-ink sm:text-xs">{{ r.text }}</p>
            </div>
          </NuxtLink>
        </li>
      </ol>

      <ol :start="5" class="mx-auto mt-14 flex max-w-[730px] flex-wrap justify-center gap-x-4 gap-y-12">
        <li v-for="(r, i) in rest" :key="r.en" class="relative w-full sm:w-[calc(50%-8px)] md:w-[calc(33.333%-11px)]">
          <span class="absolute -top-10 left-1/2 z-10 -translate-x-1/2 font-display text-[52px] font-medium leading-none text-white" aria-hidden="true">{{ i + 5 }}</span>
          <NuxtLink :to="r.to" class="group block drop-shadow-card">
            <div class="chamfer chamfer-lg flex h-[112px] bg-white" style="--c: 28px">
              <img v-if="r.image" :src="r.image" alt="" width="98" height="126" loading="lazy" decoding="async" class="h-full w-[30%] object-cover">
              <div class="flex flex-1 flex-col items-center justify-center px-2 text-center">
                <h3 class="font-display text-base tracking-wide" :style="{ color: r.color }">{{ r.en }}</h3>
                <p class="mt-1 whitespace-pre-line text-[11px] leading-relaxed tracking-tight text-ink">{{ r.text }}</p>
              </div>
            </div>
          </NuxtLink>
        </li>
      </ol>
    </div>
  </section>
</template>
