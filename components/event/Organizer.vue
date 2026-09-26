<script setup lang="ts">
// Organizer row: round logo + EVENTER label + studio name (Event-lists.png)
defineProps<{ studio: string, color?: string }>()
</script>

<template>
  <div class="flex items-center gap-2.5">
    <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-paper bg-white font-display text-[10px] font-bold tracking-tight text-ink" aria-hidden="true">EYS</span>
    <span class="text-left leading-tight">
      <span class="block font-display text-[10px] font-bold tracking-wider" :style="{ color: color || '#23AADD' }">EVENTER</span>
      <span class="block text-xs text-ink">{{ studio }}</span>
    </span>
  </div>
</template>
