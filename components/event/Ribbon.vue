<script setup lang="ts">
// Blue parallelogram section title with the orange speech tag (event.png / even.png / Celebration.png).
withDefaults(defineProps<{ title: string, bubble?: string, tag?: string, id?: string }>(), { tag: 'h2' })
</script>

<template>
  <div class="relative mx-auto w-fit">
    <component :is="tag" :id="id" class="skew-box bg-brand-blue px-16 py-3 text-center text-lg font-medium tracking-wider text-white sm:px-24 sm:text-xl">
      {{ title }}
    </component>
    <EventSpeechTag v-if="bubble" :text="bubble" class="!absolute -left-12 -top-12 !w-[110px] sm:-left-6 sm:-top-14 sm:!w-[130px]" />
  </div>
</template>
