<script setup lang="ts">
// Round channel logo + "Tiny Explorers Hub" lettering in the logo's colors
withDefaults(defineProps<{ light?: boolean, size?: 'sm' | 'md' }>(), { light: false, size: 'md' })
const tiny = [['T', '#1E88E5'], ['i', '#FFB800'], ['n', '#3DAA3C'], ['y', '#E53935']]
</script>

<template>
  <span class="inline-flex items-center gap-2.5" role="img" aria-label="Tiny Explorers Hub">
    <img src="/images/logo-96.webp" alt="" width="56" height="56" :class="size === 'sm' ? 'h-11 w-11' : 'h-12 w-12 lg:h-14 lg:w-14'">
    <span aria-hidden="true" class="flex flex-col font-display font-bold leading-none" :class="size === 'sm' ? 'text-lg' : 'text-xl lg:text-2xl'">
      <span class="flex items-baseline gap-[0.18em]">
        <span><span v-for="([ch, c], i) in tiny" :key="i" :style="{ color: c }">{{ ch }}</span></span>
        <span :class="light ? 'text-white' : 'text-ink'">Explorers</span>
      </span>
      <span class="mt-[0.2em] self-start rounded-full bg-brand-orange px-[0.5em] py-[0.08em] text-[0.6em] text-white">Hub</span>
    </span>
  </span>
</template>
