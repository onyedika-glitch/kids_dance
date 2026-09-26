<script setup lang="ts">
// Pentagon radar on concentric tinted discs (User.png). Values are on a 0–5 scale.
const props = withDefaults(defineProps<{
  axes: { label: string, value: number }[]
  tone?: 'blue' | 'pink'
  title?: string
}>(), { tone: 'blue', title: '' })

const tones = {
  blue: ['#E6EFFC', '#D2E2FA', '#BAD2F7', '#9CBEF3'],
  pink: ['#FDE8F2', '#FBD3E6', '#F8B8D7', '#F59AC6'],
}
const R = 70
const angle = (i: number) => (Math.PI * 2 * i) / props.axes.length - Math.PI / 2
const at = (i: number, r: number) => [100 + r * Math.cos(angle(i)), 100 + r * Math.sin(angle(i))]
const points = computed(() => props.axes.map((a, i) => at(i, (Math.min(a.value, 5) / 5) * R)))
const labels = computed(() => props.axes.map((a, i) => {
  const [x, y] = at(i, R + 20)
  const anchor = Math.abs(x - 100) < 5 ? 'middle' : x > 100 ? 'start' : 'end'
  return { ...a, x: x + (anchor === 'start' ? -10 : anchor === 'end' ? 10 : 0), y, anchor, lines: a.label.length > 10 && a.label.includes(' ') ? [a.label.slice(0, a.label.indexOf(' ')), a.label.slice(a.label.indexOf(' ') + 1)] : [a.label] }
}))
const desc = computed(() => props.axes.map(a => `${a.label} ${a.value.toFixed(1)}`).join(', '))
</script>

<template>
  <svg viewBox="-20 -10 240 220" class="h-auto w-full max-w-[280px]" role="img" :aria-label="`${title} ${desc}`">
    <circle cx="100" cy="100" r="88" fill="#fff" stroke="#EEE" stroke-width="3" />
    <circle v-for="(c, i) in tones[tone]" :key="i" cx="100" cy="100" :r="R - i * 17" :fill="c" />
    <g stroke="#555" stroke-width=".6">
      <line v-for="(_, i) in axes" :key="i" x1="100" y1="100" :x2="at(i, R + 6)[0]" :y2="at(i, R + 6)[1]" />
    </g>
    <polygon :points="points.map(p => p.join(',')).join(' ')" fill="none" stroke="#333" stroke-width="1" />
    <rect v-for="(p, i) in points" :key="i" :x="p[0] - 2.5" :y="p[1] - 2.5" width="5" height="5" fill="#222" />
    <text v-for="l in labels" :key="l.label" :x="l.x" :y="l.y" :text-anchor="l.anchor" font-size="9" fill="#333" dominant-baseline="middle">
      <tspan v-for="(t, k) in l.lines" :key="k" :x="l.x" :dy="k ? 11 : (l.lines.length > 1 ? -5 : 0)">{{ t }}</tspan>
    </text>
  </svg>
</template>
