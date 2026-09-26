<script setup lang="ts">
import type { KarteSample } from '~/data/home'

// One screen of the lesson Karte app, drawn in HTML (Karte-info.png sample cards)
defineProps<{ sample: KarteSample, image?: string, compact?: boolean }>()
</script>

<template>
  <div class="flex h-full flex-col bg-white text-left">
    <div class="flex items-center justify-between bg-brand-sky px-4 py-2 text-white">
      <span class="font-display text-xs font-semibold tracking-widest">LESSON KARTE</span>
      <span class="font-display text-[11px]">{{ sample.date }}</span>
    </div>
    <div class="flex flex-1 flex-col gap-3 p-4" :class="compact ? 'text-[11px]' : 'text-xs'">
      <div>
        <p class="text-[10px] text-ink-mute">Today's class</p>
        <p class="font-medium text-ink" :class="compact ? 'text-xs' : 'text-sm'">{{ sample.title }}</p>
      </div>
      <div class="relative aspect-video overflow-hidden rounded bg-paper">
        <img v-if="image" :src="image" alt="" loading="lazy" decoding="async" class="h-full w-full object-cover" />
        <span class="absolute inset-0 flex items-center justify-center">
          <span class="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-sky"><Icon name="play" class="ml-0.5 h-4 w-4" /></span>
        </span>
        <span class="absolute bottom-1 right-1 rounded bg-ink/70 px-1.5 font-display text-[10px] text-white">01:34</span>
      </div>
      <div>
        <p class="mb-1.5 text-[10px] text-ink-mute">Skill map</p>
        <ul class="grid gap-1.5">
          <li v-for="s in sample.skills" :key="s.label" class="grid grid-cols-[5.5em_1fr] items-center gap-2">
            <span class="text-ink-soft">{{ s.label }}</span>
            <span class="h-2 overflow-hidden rounded-full bg-paper"><span class="block h-full rounded-full bg-brand-purple" :style="{ width: `${s.value}%` }" /></span>
          </li>
        </ul>
      </div>
      <div class="mt-auto rounded bg-[#FFF4E5] p-3">
        <p class="text-[10px] font-medium text-brand-orange">Comment from {{ sample.instructor }}</p>
        <p class="mt-1 leading-relaxed text-ink">{{ sample.comment }}</p>
      </div>
    </div>
  </div>
</template>
