<script setup lang="ts">
// "DANCE ACADEMY / EYS-Kids" wordmark with the four colored ticks, rebuilt in SVG.
withDefaults(defineProps<{ light?: boolean }>(), { light: false })
</script>

<template>
  <svg viewBox="0 0 230 56" role="img" aria-label="DANCE ACADEMY EYS-Kids" class="h-auto">
    <g stroke-width="3" stroke-linecap="square">
      <path d="M3 2v8" stroke="#FF5860" />
      <path d="M98 1l4 7" stroke="#FF5860" />
      <path d="M222 1l-3 8" stroke="#8DC21F" />
      <path d="M41 36v8" stroke="#F2C230" />
      <path d="M186 36v8" stroke="#23AADD" />
    </g>
    <text x="0" y="31" :fill="light ? '#fff' : '#333'" font-family="Poppins, sans-serif" font-size="23" letter-spacing="1.5">
      <tspan font-weight="700">DANCE</tspan><tspan font-weight="500">ACADEMY</tspan>
    </text>
    <text x="115" y="53" text-anchor="middle" :fill="light ? '#fff' : '#333'" font-family="Poppins, sans-serif" font-size="12" font-weight="500" letter-spacing="2">EYS-Kids</text>
  </svg>
</template>
