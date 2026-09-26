<script setup lang="ts">
import { site } from '~/data/site'
import { campaign } from '~/data/campaign'

// Enrollment campaign card with live countdown (Foot2.png)
const { expired, parts, label } = useCountdown(campaign.deadline)
const pad = (n: number) => String(n).padStart(2, '0')
</script>

<template>
  <section v-if="campaign.active && !expired" class="bg-[#6CC6EE] py-8 md:py-10" aria-label="Campaign">
    <div class="mx-auto w-full max-w-[680px] px-4">
      <p class="mb-2 text-center text-sm font-medium text-white sm:text-left">{{ campaign.headline }}</p>
      <div class="overflow-hidden rounded-xl border-2 border-white bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)]">
        <div class="grid sm:grid-cols-[1fr_auto]">
          <div class="flex items-end justify-center gap-3 px-5 pb-2 pt-4 sm:justify-start">
            <p class="whitespace-nowrap text-lg leading-tight text-ink sm:text-xl">Monthly fees<br><span class="text-brand-coral">for {{ campaign.months }} months</span></p>
            <p class="font-display text-[52px] font-bold uppercase leading-none tracking-wide text-brand-coral sm:text-[60px]">Free!</p>
          </div>
          <div class="relative flex items-center gap-3 bg-brand-purple px-5 py-3 text-white sm:[clip-path:polygon(28px_0,100%_0,100%_100%,0_100%)] sm:pl-10">
            <!-- Tote bag -->
            <svg viewBox="0 0 60 70" class="h-16 w-14 shrink-0" aria-hidden="true">
              <path d="M18 22V12a12 12 0 0 1 24 0v10" fill="none" stroke="#fff" stroke-width="2.5" />
              <path d="M6 22h48l-3 46H9Z" fill="#fff" />
              <g>
                <circle cx="22" cy="36" r="2.5" fill="#FF5860" /><circle cx="28" cy="33" r="2.5" fill="#F2C230" />
                <circle cx="34" cy="33" r="2.5" fill="#8DC21F" /><circle cx="40" cy="36" r="2.5" fill="#23AADD" />
                <circle cx="25" cy="44" r="1.6" fill="#333" /><circle cx="35" cy="44" r="1.6" fill="#333" />
                <path d="M25 50q5 5 10 0" fill="none" stroke="#333" stroke-width="1.6" stroke-linecap="round" />
              </g>
            </svg>
            <div class="leading-tight">
              <span class="inline-block rounded-full bg-brand-coral px-3 py-0.5 text-[10px]">EYS-Kids original</span>
              <p class="mt-1 text-sm"><span class="mr-1 font-display text-2xl font-bold text-white">Double</span>campaign!</p>
              <p class="text-base font-bold text-[#FFE14D]">Plus a free {{ campaign.gift }}!</p>
            </div>
          </div>
        </div>

        <!-- Deadline + live countdown -->
        <div class="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-brand-sky px-4 py-2 text-white">
          <span class="text-[11px] uppercase leading-tight tracking-wide">Ends</span>
          <span class="font-display text-2xl font-bold">{{ label.date }}</span>
          <span class="flex h-6 items-center justify-center rounded-full bg-ink px-2 text-xs">{{ label.weekday }}</span>
          <span class="font-display text-2xl font-bold">{{ label.time }}</span>
          <span class="ml-1 rotate-[-8deg] bg-white px-1.5 text-xs font-bold text-brand-coral">Left</span>
          <span class="font-display tabular-nums" role="timer" aria-live="off">
            <span class="text-2xl font-bold">{{ parts.days }}</span><span class="mr-1 text-xs">d</span>
            <span class="text-2xl font-bold">{{ pad(parts.hours) }}</span><span class="mr-1 text-xs">h</span>
            <span class="text-2xl font-bold">{{ pad(parts.minutes) }}</span><span class="mr-1 text-xs">m</span>
            <span class="text-2xl font-bold">{{ pad(parts.seconds) }}</span><span class="text-xs">s</span>
          </span>
        </div>

        <div class="flex flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between">
          <span class="relative hidden rounded-[50%] border-2 border-brand-coral px-4 py-1 text-center text-[11px] leading-tight text-brand-coral sm:block">Try it<br><span class="text-sm">free first!</span></span>
          <a :href="site.phoneHref" class="whitespace-nowrap leading-tight text-ink">
            <span class="block text-[11px]">Call us ({{ site.hours }})</span>
            <span class="flex items-center gap-2">
              <FreeDialIcon class="h-4 w-8" />
              <span class="font-display text-2xl font-bold">{{ site.phone }}</span>
            </span>
          </a>
          <SkewButton to="/freetrial" color="coral" size="lg" class="w-full whitespace-nowrap sm:w-auto">Free Trial Lesson</SkewButton>
        </div>
      </div>
    </div>
  </section>
</template>
