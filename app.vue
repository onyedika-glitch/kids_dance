<script setup lang="ts">
useHead({
  titleTemplate: (title?: string) => title && !title.startsWith('Tiny Explorers Hub') ? `${title} | Tiny Explorers Hub` : 'Tiny Explorers Hub | Learn, Discover, Grow, Adventure',
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
    <VideoModal />
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active { transition: opacity .2s ease; }
.page-enter-from,
.page-leave-to { opacity: 0; }
</style>
