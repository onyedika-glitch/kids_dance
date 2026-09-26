<template>
  <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
    <Navbar />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <FooterBanner />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue'
import FooterBanner from '~/components/FooterBanner.vue'
</script>