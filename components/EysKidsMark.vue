<script setup lang="ts">
// Multicolor "EYS-Kids" group mark from the lilac top bar.
const letters = [
  ['E', '#8DC21F'], ['Y', '#13B5B1'], ['S', '#23AADD'], ['-', '#A66BF0'],
  ['K', '#E86BB0'], ['i', '#FF5860'], ['d', '#FF9300'], ['s', '#A66BF0'],
]
</script>

<template>
  <span class="font-display text-lg font-bold tracking-tight" aria-label="EYS-Kids">
    <span v-for="([ch, color], i) in letters" :key="i" :style="{ color }" aria-hidden="true">{{ ch }}</span>
  </span>
</template>
