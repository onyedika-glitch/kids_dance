<script setup lang="ts">
import { ageGroups } from '~/data/home'
</script>

<template>
  <section id="about" class="section overflow-hidden bg-white" aria-labelledby="about-title">
    <div class="container-x">
      <SectionHeading id="about-title" en="ABOUT" :title="'EYS-Kids Dance Academy supports kids from age 3 through upper\u00a0elementary'" lead="The secret to dance? Letting the body learn it from an early age!" />
      <ul class="mx-auto mt-12 grid max-w-[820px] grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 md:mt-16 md:grid-cols-3 md:gap-x-12 md:gap-y-16">
        <li v-for="a in ageGroups" :key="a.id">
          <NuxtLink :to="a.to" class="group block focus-visible:ring-offset-4" :aria-label="`View courses for ${a.stage}: ${a.grade}`">
            <HexFrame :color="a.color" :image="a.image" :alt="a.alt ?? ''" class="transition-transform duration-300 group-hover:-translate-y-1">
              <div class="absolute left-[30%] top-[78%] flex items-end">
                <span class="flex h-[52px] min-w-[74px] flex-col items-center justify-center whitespace-nowrap pl-3 pr-2 text-[11px] leading-snug text-white [clip-path:polygon(12%_0,100%_0,100%_100%,0_100%)] sm:h-[66px] sm:min-w-[100px] sm:pl-4 sm:pr-3 sm:text-sm" :style="{ backgroundColor: a.color }">
                  <span>{{ a.stage }}</span><span>{{ a.grade }}</span>
                </span>
                <span class="-mb-1 -ml-1 flex h-7 w-7 items-center justify-center bg-white shadow-[0_2px_6px_rgba(0,0,0,0.18)] transition-transform group-hover:translate-x-1 sm:h-9 sm:w-9" :style="{ color: a.color }">
                  <Icon name="chevron" class="h-4 w-4" />
                </span>
              </div>
            </HexFrame>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </section>
</template>
