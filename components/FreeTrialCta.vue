<script setup lang="ts">
import { site } from '~/data/site'

// "Free Trial Lesson" card on the warm band (foot.png / Foot4.png)
withDefaults(defineProps<{ band?: boolean }>(), { band: true })

const hexes = [
  { x: 0, y: 0, c: '#0079E4' }, { x: 1, y: 0, c: '#FF9300' }, { x: 2, y: 0, c: '#13B5B1' },
  { x: 0, y: 1, c: '#A66BF0' }, { x: 1, y: 1, c: '#FF5860' }, { x: 2, y: 1, c: '#F2C230' },
  { x: 0, y: 2, c: '#A66BF0' }, { x: 1, y: 2, c: '#8DC21F' }, { x: 2, y: 2, c: '#F2C230' },
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
              <div class="relative bg-brand-sky px-5 py-1.5 text-center text-white">
                <span class="block text-[11px] leading-tight">Try it</span>
                <span class="block text-base font-medium leading-tight">free first!</span>
                <span class="absolute -bottom-2.5 left-1/2 h-0 w-0 border-x-[8px] border-t-[11px] border-x-transparent border-t-brand-sky" />
              </div>
            </div>
            <h2 id="cta-title" class="font-display text-[28px] font-bold text-brand-blue sm:text-[34px]">Free Trial Lesson</h2>
            <p class="mt-3 text-sm leading-relaxed text-ink">
              EYS-Kids Dance Academy runs free trial lessons all year round.<br class="hidden sm:inline"> Get in touch — we'd love to meet you.
            </p>
          </div>

          <div class="relative flex flex-col items-center gap-3 bg-brand-blue px-6 py-4 text-white sm:flex-row sm:justify-between">
            <a :href="site.phoneHref" class="text-center leading-tight sm:text-left">
              <span class="block text-xs">Call us ({{ site.hours }})</span>
              <span class="mt-1 flex items-center gap-2">
                <FreeDialIcon class="h-5 w-9" />
                <span class="font-display text-2xl font-bold tracking-wide">{{ site.phone }}</span>
              </span>
            </a>
            <SkewButton to="/freetrial" color="coral" size="lg" class="w-full whitespace-nowrap sm:w-auto">Free Trial Lesson</SkewButton>
          </div>
        </div>
      </ChamferCard>
    </div>
  </section>
</template>
