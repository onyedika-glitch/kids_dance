<script setup lang="ts">
import { categoryColor } from '~/data/news'
import type { NewsCategory } from '~/data/news'

defineProps<{ category: NewsCategory }>()
</script>

<template>
  <span class="inline-block px-3 py-1 text-[11px] leading-none text-white" :style="{ backgroundColor: categoryColor(category) }">{{ category }}</span>
</template>
