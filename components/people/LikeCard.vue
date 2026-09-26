<script setup lang="ts">
import type { LikeEntry } from '~/data/voices'

// "Like" support card (Media.png): support-point medal, child name, message and the embedded post.
// Liking the embedded post adds a support point locally.
defineProps<{ entry: LikeEntry }>()
const bonus = ref(0)
</script>

<template>
  <div class="relative h-full rounded-md border border-[#E3E3E3] bg-[#F8FAFA] px-4 pb-4 pt-16 shadow-[0_2px_4px_rgba(0,0,0,.12)]">
    <div class="absolute left-1/2 top-0 grid h-[106px] w-[106px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[#E4E4E4]">
      <p class="flex h-[88px] w-[88px] flex-col items-center justify-center rounded-full bg-brand-purple text-white" role="img" :aria-label="`Support points: ${entry.points + bonus}`">
        <span class="border-b border-white/80 px-1 font-display text-[28px] font-bold italic leading-8" aria-hidden="true">{{ entry.points + bonus }}</span>
        <span class="mt-0.5 text-center text-[9px] leading-tight" aria-hidden="true">Support<br>points</span>
      </p>
    </div>
    <h3 class="text-center text-lg text-ink">{{ entry.child }}<small class="ml-2 text-[11px]">{{ entry.honorific }}(age {{ entry.age }})</small></h3>
    <p class="mx-auto mt-5 flex min-h-[88px] max-w-[220px] items-center justify-center text-center text-[13px] leading-relaxed text-ink-soft">“{{ entry.message }}”</p>
    <PeopleSocialPost :post="entry.post" compact heading-tag="p" class="mt-4 !h-auto" @like="bonus += $event ? 1 : -1" />
  </div>
</template>
