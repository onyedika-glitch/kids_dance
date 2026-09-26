<script setup lang="ts">
// Outlined hexagon with the diagonal accent strokes from About.png / Vision.png.
// Optional photo is clipped to the inner hexagon on a tinted fill.
withDefaults(defineProps<{
  color: string
  image?: string
  alt?: string
  strokes?: boolean
  fill?: boolean
}>(), { strokes: true, fill: false, alt: '' })
</script>

<template>
  <div class="relative aspect-[240/210] w-full">
    <svg v-if="strokes" class="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox="0 0 240 210" aria-hidden="true">
      <path d="M58 250 96 -28" :stroke="color" stroke-width="11" stroke-opacity=".55" />
      <path d="M108 38 124 -38" :stroke="color" stroke-width="4" stroke-opacity=".55" />
    </svg>
    <div v-if="image || fill" class="hex-clip absolute inset-[4%]" :style="{ backgroundColor: color }">
      <img v-if="image" :src="image" :alt="alt" loading="lazy" decoding="async" class="h-full w-full object-cover" />
    </div>
    <svg class="absolute inset-0 h-full w-full" viewBox="0 0 240 210" aria-hidden="true">
      <path d="M62 6h116l56 99-56 99H62L6 105Z" fill="none" :stroke="color" stroke-width="7" stroke-linejoin="miter" />
    </svg>
    <slot />
  </div>
</template>
