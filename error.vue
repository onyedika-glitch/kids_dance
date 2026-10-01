<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
useHead({ title: notFound.value ? 'Page not found' : 'Something went wrong' })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 items-center justify-center px-4 py-20">
      <ChamferCard size="lg" class="w-full max-w-lg" body-class="px-8 py-12 text-center">
        <img src="/images/logo-192.webp" alt="" width="112" height="112" class="mx-auto h-28 w-28 motion-safe:animate-bob">
        <p class="mt-4 font-display text-6xl font-bold text-brand-yellow">{{ error.statusCode }}</p>
        <h1 class="mt-2 text-2xl font-bold">{{ notFound ? 'Oops! This path leads nowhere.' : 'Something went wrong' }}</h1>
        <p class="mt-3 text-sm text-ink-soft">{{ notFound ? 'Even the best explorers take a wrong turn sometimes.' : 'Please try again in a little while.' }}</p>
        <SkewButton color="sky" class="mt-8" @click="clearError({ redirect: '/' })">Back to home</SkewButton>
      </ChamferCard>
    </main>
    <AppFooter />
  </div>
</template>
