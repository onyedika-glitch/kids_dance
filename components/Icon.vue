<script setup lang="ts">
// Inline SVG icon set (rounded line icons)
defineProps<{ name: keyof typeof paths }>()
</script>

<script lang="ts">
const paths = {
  bulb: { fill: false, d: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.4 1 1.1 1 1.9V16h5v-.2c0-.8.4-1.5 1-1.9A6 6 0 0 0 12 3Z' },
  book: { fill: false, d: 'M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5v-15ZM4 20.5A2.5 2.5 0 0 0 6.5 23H20v-5' },
  spark: { fill: false, d: 'M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8' },
  globe: { fill: false, d: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-9-9h18M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3Z' },
  share: { fill: false, d: 'M4 12v7a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-7M16 6l-4-4-4 4M12 2v13' },
  link: { fill: false, d: 'M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1' },
  whatsapp: { fill: false, d: 'M4 20l1.3-4A8 8 0 1 1 8 18.7L4 20Zm5-11c0 3.3 2.7 6 6 6l1.2-1.4-2-1-1 .8a4 4 0 0 1-2.6-2.6l.8-1-1-2L9 9Z' },
  home: { fill: false, d: 'M3 11l9-8 9 8M5 9.5V21h14V9.5' },
  sparkle: { fill: true, d: 'M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7L12 2Z' },
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
