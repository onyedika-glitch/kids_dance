<script setup lang="ts">
import { site } from '~/data/site'

// "Never miss a tiny adventure" card on the yellow band: follow + subscribe
withDefaults(defineProps<{ band?: boolean }>(), { band: true })

const hexes = [
  { x: 0, y: 0, c: '#1E88E5' }, { x: 1, y: 0, c: '#EE6D0C' }, { x: 2, y: 0, c: '#13A89E' },
  { x: 0, y: 1, c: '#8E5CD9' }, { x: 1, y: 1, c: '#E53935' }, { x: 2, y: 1, c: '#FFB800' },
  { x: 0, y: 2, c: '#8E5CD9' }, { x: 1, y: 2, c: '#3DAA3C' }, { x: 2, y: 2, c: '#FFB800' },
]
</script>

<template>
  <section :class="band ? 'band-warm py-10 md:py-12' : ''" aria-labelledby="cta-title">
    <div class="mx-auto w-full max-w-[680px] px-4">
      <ChamferCard size="md">
        <div class="relative overflow-hidden">
          <!-- Hexagon lattice, left edge -->
          <svg class="absolute -left-12 -top-8 hidden w-[230px] sm:block" viewBox="0 0 230 250" aria-hidden="true">
            <g fill="none" stroke-width="9">
              <path v-for="(h, i) in hexes" :key="i" :d="`M${h.x * 78 + (h.y % 2) * 39 + 20} ${h.y * 70 + 40}l20-35h40l20 35-20 35h-40z`" :stroke="h.c" />
            </g>
          </svg>

          <div class="relative px-6 pb-6 pt-14 text-center sm:pl-[190px] sm:pr-8 sm:pt-16 sm:text-left">
            <!-- Speech bubble -->
            <div class="absolute right-4 top-3 rotate-[-6deg] sm:right-8">
              <div class="relative rounded-xl bg-brand-sky px-5 py-1.5 text-center text-white">
                <span class="block text-[11px] leading-tight">New videos</span>
                <span class="block font-display text-base font-semibold leading-tight">every week!</span>
                <span class="absolute -bottom-2.5 left-1/2 h-0 w-0 border-x-[8px] border-t-[11px] border-x-transparent border-t-brand-sky" />
              </div>
            </div>
            <h2 id="cta-title" class="text-[28px] font-bold leading-tight text-ink sm:text-[32px]">Never miss a tiny adventure!</h2>
            <p class="mt-3 text-sm leading-relaxed text-ink-soft">
              New letters, animal facts and songs for little explorers. Follow along and learn together.
            </p>
          </div>

          <div class="relative flex flex-col items-center gap-3 bg-ink px-6 py-4 sm:flex-row sm:justify-end">
            <SkewButton :href="site.facebook" color="sky" size="lg" class="w-full whitespace-nowrap sm:w-auto">Follow on Facebook</SkewButton>
            <SkewButton :href="site.youtubeSubscribe" color="coral" size="lg" class="w-full whitespace-nowrap sm:w-auto">Subscribe on YouTube</SkewButton>
          </div>
        </div>
      </ChamferCard>
    </div>
  </section>
</template>
