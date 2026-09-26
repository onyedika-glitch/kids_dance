<script setup lang="ts">
// Five-axis class rating chart from choice.png: pink rings on a white disc, pentagon plot.
const props = withDefaults(defineProps<{
  axes: { key: string, label: string }[]
  values: Partial<Record<string, number>>
  max?: number
  label?: string
}>(), { max: 5, label: '' })

const fid = `radar-${useId()}`
const cx = 170
const cy = 142
const r = 92

function point(i: number, radius: number) {
  const a = (-90 + (360 / props.axes.length) * i) * Math.PI / 180
  return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius]
}

const plot = computed(() => props.axes.map((ax, i) => point(i, r * Math.min(props.values[ax.key] ?? 0, props.max) / props.max)))
const polygon = computed(() => plot.value.map(p => p.join(',')).join(' '))
const labels = computed(() => props.axes.map((ax, i) => {
  const [x, y] = point(i, r + 22)
  const anchor = Math.abs(x - cx) < 4 ? 'middle' : x > cx ? 'start' : 'end'
  return { x: anchor === 'start' ? x - 2 : anchor === 'end' ? x + 2 : x, y: i === 0 ? y - 16 : y + 4, anchor, lines: ax.label.split('\n') }
}))
const summary = computed(() => props.axes.map(ax => `${ax.label.replace(/\n/g, ' ')} ${props.values[ax.key]}/${props.max}`).join(', '))
</script>

<template>
  <svg viewBox="0 0 340 280" class="h-auto w-full" role="img" :aria-label="`${label} rating: ${summary}`">
    <defs>
      <filter :id="fid" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity=".1" />
      </filter>
    </defs>
    <circle :cx="cx" :cy="cy" :r="r + 14" fill="#fff" :filter="`url(#${fid})`" />
    <circle :cx="cx" :cy="cy" :r="r" fill="#FFE8F3" />
    <circle :cx="cx" :cy="cy" :r="r * .72" fill="#FFD3E8" />
    <circle :cx="cx" :cy="cy" :r="r * .5" fill="#FFC1DE" stroke="#fff" stroke-width="2" />
    <circle :cx="cx" :cy="cy" :r="r * .27" fill="#FF9FCC" />
    <polygon :points="polygon" fill="none" stroke="#FF8CC0" stroke-width="2" stroke-linejoin="round" />
    <circle v-for="(p, i) in plot" :key="i" :cx="p[0]" :cy="p[1]" r="5" fill="#FF8CC0" />
    <text v-for="(l, i) in labels" :key="`l${i}`" :x="l.x" :y="l.y" :text-anchor="l.anchor" font-size="10.5" fill="#666">
      <tspan v-for="(line, j) in l.lines" :key="j" :x="l.x" :dy="j ? 13 : 0">{{ line }}</tspan>
    </text>
  </svg>
</template>
