<script setup lang="ts">
// Orange irregular speech tag with a tail ("Our big day on stage" on event.png, stat.png).
withDefaults(defineProps<{ text: string, tail?: 'left' | 'right' }>(), { tail: 'left' })
const uid = useId()
</script>

<template>
  <span class="relative inline-block w-[150px] select-none sm:w-[180px]">
    <svg viewBox="0 0 180 110" class="block h-auto w-full drop-shadow-card" aria-hidden="true">
      <defs>
        <linearGradient :id="`st-${uid}`" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stop-color="#FF7A45" />
          <stop offset="1" stop-color="#FFC13B" />
        </linearGradient>
      </defs>
      <path v-if="tail === 'left'" d="M14 22 172 6 162 76 98 80 70 106 76 82 24 86Z" :fill="`url(#st-${uid})`" />
      <path v-else d="M8 8 166 22 156 86 104 82 110 106 82 80 18 76Z" :fill="`url(#st-${uid})`" />
    </svg>
    <span class="absolute inset-x-3 top-[12%] flex h-[62%] -rotate-6 items-center justify-center whitespace-pre-line text-balance text-center text-[10px] font-medium leading-tight text-white sm:text-[12px]">{{ text }}</span>
  </span>
</template>
