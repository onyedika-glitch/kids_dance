<script setup lang="ts">
import type { SafetyIcon } from '~/data/safety'

// Solid pictograms for the safety page (Firstaid.png style), drawn on a 100×100 grid.
defineProps<{ name: SafetyIcon }>()

const line: Partial<Record<SafetyIcon, string>> = {
  wind: 'M12 38h46a10 10 0 1 0-10-10M12 54h66a10 10 0 1 1-10 10M12 70h34',
  thermo: 'M50 14a9 9 0 0 1 9 9v34a16 16 0 1 1-18 0V23a9 9 0 0 1 9-9Zm0 42V34',
  sparkle: 'M44 16l6 18 18 6-18 6-6 18-6-18-18-6 18-6ZM74 58l3 9 9 3-9 3-3 9-3-9-9-3 9-3Z',
  team: 'M34 46a11 11 0 1 0 0-22 11 11 0 0 0 0 22Zm-20 32a20 20 0 0 1 40 0M68 50a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-8 10a16 16 0 0 1 26 18',
  glass: 'M16 20h68v60H16ZM50 20v60M26 32l14-10M26 46l20-16M60 42l14-10',
  camera: 'M14 34l52-12 6 20-52 12ZM40 51l4 16H28M72 38l14 6-2 10-14-4',
  badge: 'M50 12l32 12v22c0 20-14 36-32 42-18-6-32-22-32-42V24Zm-14 40 10 10 20-22',
  card: 'M14 28h72v46H14ZM14 40h72M24 60h20',
  bell: 'M50 16a22 22 0 0 1 22 22v18l8 12H20l8-12V38a22 22 0 0 1 22-22Zm-8 58a8 8 0 0 0 16 0',
  door: 'M24 86V14h40v72M64 22l14 6v52l-14 6M54 52h2M12 86h76',
  phone: 'M32 10h36a6 6 0 0 1 6 6v68a6 6 0 0 1-6 6H32a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6Zm10 70h16M38 34h24M38 46h24M38 58h14',
  spray: 'M34 38h26v48H34ZM38 38V26h18v12M56 30h14l6-6M70 34l8 2M70 26l8-4M38 54h18',
}
</script>

<template>
  <svg viewBox="0 0 100 100" aria-hidden="true">
    <!-- Ambulance held in two hands -->
    <g v-if="name === 'ambulance'" fill="currentColor">
      <path d="M22 18h36a6 6 0 0 1 6 6v6h10l10 14v14a4 4 0 0 1-4 4H22a6 6 0 0 1-6-6V24a6 6 0 0 1 6-6Zm44 16v12h14l-8-12Z" />
      <path d="M34 26h8v8h8v8h-8v8h-8v-8h-8v-8h8Z" fill="#fff" />
      <circle cx="32" cy="62" r="7" /><circle cx="32" cy="62" r="3" fill="#fff" />
      <circle cx="72" cy="62" r="7" /><circle cx="72" cy="62" r="3" fill="#fff" />
      <path d="M6 44c3 0 5 2 5 5v14c0 5 3 9 7 12l14 10v9H18l-8-8c-3-3-5-7-5-12V48c0-2 0-4 1-4Z" />
      <path d="M94 44c-3 0-5 2-5 5v14c0 5-3 9-7 12L68 85v9h14l8-8c3-3 5-7 5-12V48c0-2 0-4-1-4Z" />
    </g>
    <!-- Heart with defibrillator bolt -->
    <g v-else-if="name === 'aed'">
      <path d="M50 90S8 64 8 34c0-14 10-24 22-24 9 0 16 5 20 12 4-7 11-12 20-12 12 0 22 10 22 24 0 30-42 56-42 56Z" fill="currentColor" />
      <path d="M58 16 38 48h16L42 74" fill="none" stroke="#fff" stroke-width="5" stroke-linejoin="miter" />
      <path d="M34 68l8 12 6-12Z" fill="#fff" />
    </g>
    <path v-else :d="line[name]" fill="none" stroke="currentColor" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" />
  </svg>
</template>
