<script setup lang="ts">
// Photo header with the chamfered white title card overlapping the pastel band
// (course.png, list.png, explor.png, areir.png).
withDefaults(defineProps<{
  en?: string
  title: string
  image?: string
  alt?: string
  crumbs?: { label: string, to?: string }[]
}>(), { alt: '' })
</script>

<template>
  <section class="relative">
    <div class="relative h-[200px] overflow-hidden bg-paper sm:h-[280px] md:h-[340px]">
      <img v-if="image" :src="image" :alt="alt" class="h-full w-full object-cover" fetchpriority="high" decoding="async" />
      <nav v-if="crumbs?.length" aria-label="Breadcrumb" class="absolute left-1/2 top-3 hidden -translate-x-1/2 md:block">
        <ol class="flex items-center gap-4 bg-ink/80 px-4 py-1 text-[10px] text-white">
          <li><NuxtLink to="/" class="hover:underline">EYS-Kids Dance Academy</NuxtLink></li>
          <li v-for="c in crumbs" :key="c.label" class="flex items-center gap-2">
            <Icon name="chevron" class="h-2.5 w-2.5" />
            <NuxtLink v-if="c.to" :to="c.to" class="hover:underline">{{ c.label }}</NuxtLink>
            <span v-else aria-current="page">{{ c.label }}</span>
          </li>
        </ol>
      </nav>
    </div>
    <div class="band h-16 sm:h-20 md:h-24" />
    <div class="absolute inset-x-0 bottom-4 px-4 sm:bottom-6">
      <ChamferCard size="lg" class="mx-auto max-w-[640px]" body-class="px-6 py-6 text-center sm:py-8">
        <DisplayTitle v-if="en" :text="en" tag="p" class="!text-[30px] sm:!text-[40px] md:!text-[46px]" />
        <h1 class="text-balance text-lg text-ink sm:text-xl" :class="en ? 'mt-3' : 'text-2xl font-bold text-brand-blue sm:text-3xl'">{{ title }}</h1>
        <slot />
      </ChamferCard>
    </div>
  </section>
</template>
