<script setup lang="ts">
// Rounded five-point star with the instructor rank letter (S / A / B …).
withDefaults(defineProps<{ rank: string, color: string, label?: string }>(), { label: '' })
</script>

<template>
  <span class="inline-grid place-items-center" role="img" :aria-label="label || `Rank ${rank}`">
    <svg viewBox="0 0 24 24" class="h-full w-full [grid-area:1/1]" aria-hidden="true">
      <path d="M12 3.2l2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.5l-5.2 2.7 1-5.8L3.6 9.3l5.8-.8L12 3.2Z" :fill="color" :stroke="color" stroke-width="2.2" stroke-linejoin="round" />
    </svg>
    <span class="grid place-items-center pt-[8%] [grid-area:1/1] font-display text-[0.9em] font-medium leading-none text-white" aria-hidden="true">{{ rank }}</span>
  </span>
</template>
