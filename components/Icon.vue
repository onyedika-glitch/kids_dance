<script setup lang="ts">
// Inline SVG icon set, drawn to match the thin line icons in the Figma.
defineProps<{ name: keyof typeof paths }>()
</script>

<script lang="ts">
const paths = {
  chevron: { fill: false, d: 'M9 5l7 7-7 7' },
  'chevron-left': { fill: false, d: 'M15 5l-7 7 7 7' },
  'chevron-down': { fill: false, d: 'M5 9l7 7 7-7' },
  'chevron-up': { fill: false, d: 'M5 15l7-7 7 7' },
  menu: { fill: false, d: 'M4 7h16M4 12h16M4 17h16' },
  close: { fill: false, d: 'M6 6l12 12M18 6L6 18' },
  check: { fill: false, d: 'M5 12.5l4.5 4.5L19 7' },
  plus: { fill: false, d: 'M12 5v14M5 12h14' },
  minus: { fill: false, d: 'M5 12h14' },
  pin: { fill: false, d: 'M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z' },
  clock: { fill: false, d: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-13v4.5l3 2' },
  train: { fill: false, d: 'M7 3h10a2 2 0 0 1 2 2v10a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V5a2 2 0 0 1 2-2Zm-2 8h14M8 21l2-3m6 3-2-3M9 15h.01M15 15h.01' },
  heart: { fill: false, d: 'M12 20s-7.5-4.6-9.2-9.4C1.6 7.2 4 4 7.3 4c2 0 3.4 1.1 4.7 2.8C13.3 5.1 14.7 4 16.7 4 20 4 22.4 7.2 21.2 10.6 19.5 15.4 12 20 12 20Z' },
  comment: { fill: false, d: 'M4 5h16v11H9l-5 4V5Z' },
  play: { fill: true, d: 'M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5Z' },
  star: { fill: true, d: 'M12 3.5l2.6 5.4 5.9.8-4.3 4.1 1 5.9L12 16.9l-5.2 2.8 1-5.9-4.3-4.1 5.9-.8L12 3.5Z' },
  megaphone: { fill: false, d: 'M4 10v4h3l7 4V6L7 10H4Zm13-1.5a4 4 0 0 1 0 7M19.5 6a7.5 7.5 0 0 1 0 12' },
  mail: { fill: false, d: 'M3 6h18v12H3V6Zm0 0 9 7 9-7' },
  calendar: { fill: false, d: 'M4 6h16v14H4V6Zm0 4h16M8 3v4m8-4v4' },
  user: { fill: false, d: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0' },
  search: { fill: false, d: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 4 4' },
  shield: { fill: false, d: 'M12 3l7 3v6c0 4.5-3 7.8-7 9-4-1.2-7-4.5-7-9V6l7-3Zm-3 9 2 2 4-4' },
  instagram: { fill: false, d: 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm5.5-9.5h.01' },
  twitter: { fill: false, d: 'M4 4l16 16M20 4 4 20' },
  facebook: { fill: false, d: 'M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z' },
  youtube: { fill: false, d: 'M3 8.5A3.5 3.5 0 0 1 6.5 5h11A3.5 3.5 0 0 1 21 8.5v7a3.5 3.5 0 0 1-3.5 3.5h-11A3.5 3.5 0 0 1 3 15.5v-7ZM10 9v6l5-3-5-3Z' },
} as const
</script>

<template>
  <svg viewBox="0 0 24 24" aria-hidden="true" :fill="paths[name].fill ? 'currentColor' : 'none'" :stroke="paths[name].fill ? 'none' : 'currentColor'" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path :d="paths[name].d" />
  </svg>
</template>
