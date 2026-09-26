<script setup lang="ts">
import { reasons } from '~/data/home'

// "7 reasons families choose EYS-Kids Dance Academy" (Lesson.png)
const top = reasons.slice(0, 4)
const bottom = reasons.slice(4)
</script>

<template>
  <section class="band overflow-hidden py-14 md:py-20" aria-labelledby="reasons7-title">
    <div class="container-x">
      <h2 id="reasons7-title" class="flex flex-wrap items-center justify-center gap-x-4 text-white sm:gap-x-6">
        <span class="text-center text-sm leading-snug sm:text-right sm:text-base">Families choose<br>EYS-Kids Dance<br>Academy for</span>
        <svg viewBox="0 0 100 120" class="h-24 w-20 drop-shadow-[0_3px_4px_rgba(0,0,0,0.18)] sm:h-32 sm:w-28" aria-hidden="true">
          <text x="50" y="104" text-anchor="middle" font-family="Poppins, sans-serif" font-size="128" font-weight="600" fill="none" stroke="#fff" stroke-width="6" stroke-linejoin="round">7</text>
        </svg>
        <span class="sr-only">7</span>
        <span class="text-2xl sm:text-4xl">great reasons</span>
      </h2>

      <ul class="mx-auto mt-10 grid max-w-[820px] grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:mt-12 md:grid-cols-4 md:gap-y-0">
        <li v-for="r in top" :key="r.no" :class="r.no % 2 === 0 ? 'md:mt-8' : ''">
          <NuxtLink :to="r.to" class="group relative block pt-8 transition-transform duration-300 hover:-translate-y-1">
            <span class="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-4 font-display text-[64px] font-medium leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)] sm:text-[72px]" aria-hidden="true">{{ r.no }}</span>
            <ChamferCard size="lg" body-class="flex min-h-[190px] flex-col text-center sm:min-h-[210px]">
              <div v-if="r.no === 3" class="flex items-center justify-center gap-2 bg-lilac px-2 pb-3 pt-9">
                <span class="chamfer chamfer-sm flex h-12 w-[60px] items-center justify-center bg-brand-purple text-center text-[10px] leading-tight text-white sm:h-14 sm:w-[68px] sm:text-[11px]">Fixed<br>weekly</span>
                <Icon name="plus" class="h-5 w-5 text-brand-purple" />
                <span class="chamfer chamfer-sm flex h-12 w-[60px] items-center justify-center bg-brand-purple text-center text-[10px] leading-tight text-white sm:h-14 sm:w-[68px] sm:text-[11px]">Free<br>make-ups</span>
              </div>
              <div class="flex flex-1 flex-col justify-end px-2 pb-6" :class="r.no === 3 ? 'pt-3' : 'pt-10'">
                <h3 class="font-display text-lg font-medium leading-tight sm:text-xl" :style="{ color: r.color }">{{ r.en }}</h3>
                <p class="mt-2 text-balance text-[12px] leading-relaxed text-ink">{{ r.text }}</p>
              </div>
            </ChamferCard>
            <span class="sr-only"> (reason {{ r.no }})</span>
          </NuxtLink>
        </li>
      </ul>

      <ul class="mx-auto mt-12 grid max-w-[660px] grid-cols-2 gap-x-4 gap-y-12 sm:gap-x-6 md:mt-14 md:grid-cols-3">
        <li v-for="r in bottom" :key="r.no" :class="r.no === 7 ? 'col-span-2 mx-auto w-1/2 md:col-span-1 md:w-auto' : ''">
          <NuxtLink :to="r.to" class="group relative block pt-8 transition-transform duration-300 hover:-translate-y-1">
            <span class="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-4 font-display text-[64px] font-medium leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.15)]" aria-hidden="true">{{ r.no }}</span>
            <ChamferCard size="md" body-class="flex min-h-[110px] flex-col justify-end px-3 pb-4 pt-8 text-center md:min-h-[88px] md:pt-5">
              <h3 class="font-display text-lg font-medium leading-tight" :style="{ color: r.color }">{{ r.en }}</h3>
              <p class="mt-1.5 text-balance text-[12px] leading-relaxed text-ink sm:text-[13px]">{{ r.text }}</p>
            </ChamferCard>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
