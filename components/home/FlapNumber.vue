<script setup lang="ts">
// Split-flap style counter ("68,434" in reason-chart.png). Counts up from 0 the
// first time it scrolls into view; SSR and reduced-motion users get the final value.
const props = withDefaults(defineProps<{
  value: number
  color?: string
  duration?: number
}>(), { color: '#5B8DEF', duration: 1800 })

const el = ref<HTMLElement | null>(null)
const current = ref(props.value)
// Keep the digit count fixed (odometer style) so the boxes don't jump while counting
const chars = computed(() => {
  const digits = String(current.value).padStart(String(props.value).length, '0')
  return [...digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')]
})

let io: IntersectionObserver | undefined
let raf = 0
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return
  current.value = 0
  io = new IntersectionObserver((entries) => {
    if (!entries.some(e => e.isIntersecting)) return
    io?.disconnect()
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / props.duration)
      current.value = Math.round(props.value * (1 - Math.pow(1 - p, 3)))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
  }, { threshold: 0.6 })
  if (el.value) io.observe(el.value)
})
onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el" class="inline-flex items-end gap-[2px] rounded-sm bg-white p-[3px] align-middle shadow-[0_1px_4px_rgba(0,0,0,0.18)]" :aria-label="value.toLocaleString('en-US')" role="img">
    <template v-for="(c, i) in chars" :key="i">
      <span v-if="c === ','" class="w-2 text-center font-display text-[1.4em] leading-none" :style="{ color }" aria-hidden="true">,</span>
      <span v-else class="relative inline-flex h-[1.6em] w-[1.05em] items-center justify-center border border-[#E4E4E4] bg-white font-display text-[1.4em] font-medium leading-none tabular-nums" :style="{ color }" aria-hidden="true">
        {{ c }}
        <span class="absolute inset-x-0 top-1/2 h-px bg-[#EDEDED]" />
      </span>
    </template>
  </span>
</template>
