<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()
const notFound = computed(() => props.error.statusCode === 404)
useHead({ title: notFound.value ? 'Page not found' : 'Something went wrong' })
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />
    <main class="flex flex-1 items-center justify-center bg-paper px-4 py-20">
      <ChamferCard size="lg" class="w-full max-w-lg" body-class="px-8 py-12 text-center">
        <p class="font-display text-6xl font-bold text-brand-sky">{{ error.statusCode }}</p>
        <h1 class="mt-4 text-xl font-bold">{{ notFound ? 'Page not found' : 'Something went wrong' }}</h1>
        <p class="mt-3 text-sm text-ink-soft">{{ notFound ? 'The page you are looking for may have been moved or deleted.' : 'Please try again in a little while.' }}</p>
        <SkewButton color="sky" class="mt-8" @click="clearError({ redirect: '/' })">Back to the home page</SkewButton>
      </ChamferCard>
    </main>
    <AppFooter />
  </div>
</template>
