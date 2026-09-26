<script setup lang="ts">
// English section titles (ABOUT, VISION, KARTE...). Each letter is tinted along
// the sky → purple ramp from the Figma, and "A" is drawn as the rounded triangle.
const props = withDefaults(defineProps<{
  text: string
  tag?: string
  from?: string
  to?: string
}>(), {
  tag: 'h2',
  from: '#23AADD',
  to: '#A66BF0',
})

function hexToRgb(hex: string) {
  const n = parseInt(hex.slice(1), 16)
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255]
}

// Letters grouped per word so a long title wraps between words, never mid-word
const words = computed(() => {
  const a = hexToRgb(props.from)
  const b = hexToRgb(props.to)
  const visible = [...props.text].filter(c => c.trim()).length
  let i = 0
  return props.text.split(/\s+/).filter(Boolean).map(word => [...word].map((ch) => {
    const t = visible > 1 ? i++ / (visible - 1) : 0
    const rgb = a.map((v, k) => Math.round(v + (b[k] - v) * t))
    return { ch, color: `rgb(${rgb.join(',')})` }
  }))
})
</script>

<template>
  <component :is="tag" class="font-display text-[34px] font-bold uppercase leading-none tracking-[0.12em] sm:text-[44px] md:text-[52px]" :aria-label="text">
    <template v-for="(word, w) in words" :key="w">
      <template v-if="w">{{ ' ' }}</template>
      <span class="inline-block whitespace-nowrap" aria-hidden="true">
        <span v-for="(l, i) in word" :key="i" :style="{ color: l.color }" class="inline-block">
          <svg v-if="l.ch.toUpperCase() === 'A'" viewBox="0 0 100 100" class="inline-block h-[0.74em] w-[0.8em] align-baseline" fill="currentColor">
            <path d="M50 6c4 0 7 2 9 6l37 68c4 8-1 14-9 14H13c-8 0-13-6-9-14L41 12c2-4 5-6 9-6Zm0 44L37 76h26Z" />
          </svg>
          <template v-else>{{ l.ch }}</template>
        </span>
      </span>
    </template>
  </component>
</template>
