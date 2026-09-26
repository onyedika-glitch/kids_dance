<script setup lang="ts">
// "Very satisfied 80.9%" pie from the instructor profile header.
const props = defineProps<{ great: number, good: number }>()

function arc(from: number, to: number) {
  const pt = (p: number) => {
    const a = (p / 100) * Math.PI * 2 - Math.PI / 2
    return `${(21 + 21 * Math.cos(a)).toFixed(3)} ${(21 + 21 * Math.sin(a)).toFixed(3)}`
  }
  return `M21 21L${pt(from)}A21 21 0 ${to - from > 50 ? 1 : 0} 1 ${pt(to)}Z`
}

const slices = computed(() => [
  { d: arc(0, props.great), color: '#FF9BB9' },
  { d: arc(props.great, props.great + props.good), color: '#F7C52B' },
  { d: arc(props.great + props.good, 100), color: '#BBBBBB' },
])
</script>

<template>
  <div class="relative h-[74px] w-[74px] shrink-0 sm:h-20 sm:w-20" role="img" :aria-label="`Very satisfied: ${great}%`">
    <svg viewBox="0 0 42 42" class="h-full w-full" aria-hidden="true">
      <path v-for="s in slices" :key="s.color" :d="s.d" :fill="s.color" />
    </svg>
    <p class="absolute inset-0 flex flex-col items-center justify-center pt-4 text-center text-[8px] leading-tight text-ink" aria-hidden="true">
      Very satisfied<span class="font-display text-[11px] font-semibold">{{ great }}<small class="text-[7px]">%</small></span>
    </p>
  </div>
</template>
