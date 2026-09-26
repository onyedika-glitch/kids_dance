<script setup lang="ts">
import { site, primaryNav, moreNav } from '~/data/site'

const year = new Date().getFullYear()
const showTop = ref(false)
const onScroll = () => { showTop.value = window.scrollY > 600 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="border-t border-[#e5e5e5] bg-paper-light text-ink">
    <div class="container-wide grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
      <div>
        <NuxtLink to="/" aria-label="Go to the home page"><SiteLogo class="w-[200px]" /></NuxtLink>
        <p class="mt-4 text-xs leading-relaxed text-ink-soft">Growing kids' hearts and bodies<br>EYS-Kids Dance Academy</p>
        <a :href="site.phoneHref" class="mt-5 inline-flex items-center gap-2 text-brand-blue">
          <FreeDialIcon class="h-5 w-9" />
          <span class="font-display text-2xl font-bold text-ink">{{ site.phone }}</span>
        </a>
        <p class="mt-1 text-[11px] text-ink-soft">Phone hours: {{ site.hours }}</p>
      </div>
      <nav aria-label="Footer menu" class="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
        <NuxtLink v-for="item in [...primaryNav, ...moreNav]" :key="item.to" :to="item.to" class="flex items-center gap-2 py-1 hover:text-brand-sky">
          <Icon name="chevron" class="h-3 w-3 text-brand-sky" />{{ item.label }}
        </NuxtLink>
      </nav>
    </div>
    <div class="border-t border-[#e5e5e5]">
      <div class="container-wide flex flex-col items-center justify-between gap-3 py-5 text-[11px] text-ink-mute sm:flex-row">
        <p>&copy; {{ year }} EYS-Kids Dance Academy. All Rights Reserved.</p>
        <ul class="flex gap-5">
          <li><NuxtLink to="/news" class="hover:text-brand-sky">News</NuxtLink></li>
          <li><NuxtLink to="/safety" class="hover:text-brand-sky">Safety</NuxtLink></li>
        </ul>
      </div>
    </div>

    <!-- Mobile sticky CTA -->
    <div class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] sm:hidden">
      <a :href="site.phoneHref" class="flex h-14 items-center justify-center gap-2 bg-brand-blue text-sm font-medium text-white">
        <FreeDialIcon class="h-4 w-7" />Call us
      </a>
      <NuxtLink to="/freetrial" class="flex h-14 items-center justify-center bg-brand-coral text-sm font-medium text-white">Free Trial Lesson</NuxtLink>
    </div>
    <div class="h-14 sm:hidden" aria-hidden="true" />

    <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity" leave-to-class="opacity-0" leave-active-class="transition-opacity">
      <button v-if="showTop" type="button" class="fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center bg-brand-sky text-white shadow-md sm:bottom-6" aria-label="Back to top" @click="toTop">
        <Icon name="chevron-up" class="h-5 w-5" />
      </button>
    </Transition>
  </footer>
</template>
