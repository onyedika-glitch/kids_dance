<script setup lang="ts">
defineProps<{ score: number }>()
</script>

<template>
  <span class="inline-flex items-center" role="img" :aria-label="`${score.toFixed(1)} out of 5`">
    <Icon v-for="n in 5" :key="n" name="star" class="h-[1em] w-[1em]" :class="n <= Math.round(score) ? 'text-[#F5B83D]' : 'text-[#DDDDDD]'" />
  </span>
</template>
