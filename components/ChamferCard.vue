<script setup lang="ts">
// White card with clipped corners and the soft Figma drop shadow.
// The shadow sits on the wrapper because clip-path would cut a box-shadow.
withDefaults(defineProps<{
  tag?: string
  size?: 'sm' | 'md' | 'lg'
  bodyClass?: string
}>(), { tag: 'div', size: 'md', bodyClass: '' })
</script>

<template>
  <component :is="tag" class="drop-shadow-card">
    <div class="chamfer h-full bg-white" :class="[{ 'chamfer-sm': size === 'sm', 'chamfer-lg': size === 'lg' }, bodyClass]">
      <slot />
    </div>
  </component>
</template>
