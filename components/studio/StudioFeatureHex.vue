<script setup lang="ts">
import type { AccessFeature } from '~/data/studios'

// Gradient hexagon with a white line icon (list.png "what makes us special" row)
const props = defineProps<{ icon: AccessFeature['icon'] }>()
const gid = `fh-${props.icon}`
</script>

<template>
  <svg viewBox="0 0 120 104" class="h-auto w-full" aria-hidden="true">
    <defs>
      <linearGradient :id="gid" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#23AADD" />
        <stop offset="1" stop-color="#A66BF0" />
      </linearGradient>
    </defs>
    <path d="M30 2h60l28 50-28 50H30L2 52Z" :fill="`url(#${gid})`" />
    <g fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" transform="translate(36 28)">
      <template v-if="icon === 'train'">
        <rect x="10" y="2" width="28" height="34" rx="5" />
        <path d="M10 20h28M14 8h20v8H14zM17 28h.01M31 28h.01M15 36l-5 10M33 36l5 10M8 46h32M12 41h24" />
      </template>
      <template v-else-if="icon === 'shoes'">
        <path d="M13 4c-4 0-6 4-6 10 0 10 3 20 5 26 1 4 3 6 5 6s3-2 3-6c0-10 1-20-1-28-1-5-3-8-6-8Z" />
        <path d="M33 4c-4 0-6 4-6 10 0 10 3 20 5 26 1 4 3 6 5 6s3-2 3-6c0-10 1-20-1-28-1-5-3-8-6-8Z" />
        <path d="M8 16l12 6M20 16L8 22M28 16l12 6M40 16l-12 6" />
      </template>
      <template v-else-if="icon === 'shower'">
        <path d="M38 48V8a5 5 0 0 0-5-5h-6a5 5 0 0 0-5 5v4M12 18h20l-3-6H15Z" />
        <path d="M14 24v2M20 24v2M26 24v2M30 24v2M14 31v2M20 31v2M26 31v2M17 38v2M23 38v2M29 38v2" />
      </template>
      <template v-else-if="icon === 'lobby'">
        <path d="M22 4c1 8 4 11 12 12-8 1-11 4-12 12-1-8-4-11-12-12 8-1 11-4 12-12Z" />
        <path d="M36 26c.6 4.5 2.5 6.4 7 7-4.5.6-6.4 2.5-7 7-.6-4.5-2.5-6.4-7-7 4.5-.6 6.4-2.5 7-7Z" />
        <path d="M11 32c.5 3 1.6 4.2 4.6 4.6-3 .5-4.1 1.6-4.6 4.6-.4-3-1.6-4.1-4.6-4.6 3-.4 4.2-1.6 4.6-4.6Z" />
      </template>
      <template v-else>
        <rect x="14" y="4" width="20" height="18" rx="2" />
        <path d="M24 8v10M19 13h10M20 4V1h8v3" />
        <path d="M2 22l6 16 10 8h6M46 22l-6 16-10 8h-6M8 30c3 2 6 5 8 8M40 30c-3 2-6 5-8 8" />
      </template>
    </g>
  </svg>
</template>
