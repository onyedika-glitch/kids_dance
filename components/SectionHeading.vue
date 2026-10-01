<script setup lang="ts">
// Display title + lead + small note, centered: the header pattern of the
// VIDEOS / ABC / ABOUT sections.
withDefaults(defineProps<{
  en?: string
  title?: string
  lead?: string
  tag?: string
}>(), { tag: 'h2' })
</script>

<template>
  <div class="text-center">
    <DisplayTitle v-if="en" :text="en" :tag="title ? 'p' : tag" />
    <component :is="en ? 'h2' : tag" v-if="title" class="mt-5 whitespace-pre-line text-xl font-medium leading-relaxed text-ink sm:text-2xl">
      {{ title }}
    </component>
    <p v-if="lead" class="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">
      {{ lead }}
    </p>
    <slot />
  </div>
</template>
