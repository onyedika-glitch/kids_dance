<script setup lang="ts">
// Big English section titles (VIDEOS, ABC, MOST LOVED...). Letters cycle through the logo's
// colors like the "Tiny" lettering; words never break mid-word.
const props = withDefaults(defineProps<{
  text: string
  tag?: string
  colors?: string[]
}>(), {
  tag: 'h2',
  colors: () => ['#1E88E5', '#FFB800', '#3DAA3C', '#E53935', '#EE6D0C', '#8E5CD9'],
})

const words = computed(() => {
  let i = 0
  return props.text.split(/\s+/).filter(Boolean).map(word => [...word].map(ch => ({ ch, color: props.colors[i++ % props.colors.length] })))
})
</script>

<template>
  <component :is="tag" class="font-display text-[34px] font-bold uppercase leading-none tracking-wide sm:text-[44px] md:text-[52px]" :aria-label="text">
    <template v-for="(word, w) in words" :key="w">
      <template v-if="w">{{ ' ' }}</template>
      <span class="inline-block whitespace-nowrap" aria-hidden="true">
        <span v-for="(l, i) in word" :key="i" :style="{ color: l.color }">{{ l.ch }}</span>
      </span>
    </template>
  </component>
</template>
