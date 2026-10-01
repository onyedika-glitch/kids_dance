<script setup lang="ts">
import { site, primaryNav, moreNav, socials } from '~/data/site'

const year = new Date().getFullYear()
const showTop = ref(false)
const onScroll = () => { showTop.value = window.scrollY > 600 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <footer class="bg-ink text-white">
    <div class="container-wide grid gap-10 py-12 md:grid-cols-[1.2fr_2fr]">
      <div>
        <NuxtLink to="/" aria-label="Tiny Explorers Hub home"><SiteLogo light /></NuxtLink>
        <p class="mt-4 max-w-xs text-sm leading-relaxed text-white/75">{{ site.intro }} {{ site.motto }}</p>
        <ul class="mt-5 flex gap-3">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.href" :target="s.icon === 'mail' ? undefined : '_blank'" rel="noopener" class="grid h-11 w-11 place-items-center rounded-full bg-white/10 transition hover:bg-brand-yellow hover:text-ink" :aria-label="`Tiny Explorers Hub on ${s.label}`">
              <Icon :name="s.icon" class="h-5 w-5" />
            </a>
          </li>
        </ul>
        <a :href="`mailto:${site.email}`" class="mt-4 block break-all text-sm text-white/75 hover:text-white">{{ site.email }}</a>
      </div>
      <nav aria-label="Footer menu" class="grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
        <NuxtLink v-for="item in [...primaryNav, ...moreNav]" :key="item.to" :to="item.to" class="flex items-center gap-2 py-1 text-white/80 hover:text-white">
          <Icon name="chevron" class="h-3 w-3 text-brand-yellow" />{{ item.label }}
        </NuxtLink>
      </nav>
    </div>
    <div class="border-t border-white/10">
      <div class="container-wide flex flex-col items-center justify-between gap-3 py-5 text-[11px] text-white/55 sm:flex-row">
        <p>&copy; {{ year }} Tiny Explorers Hub. Made with love for little learners.</p>
        <ul class="flex gap-5">
          <li><NuxtLink to="/privacy" class="hover:text-white">Privacy</NuxtLink></li>
          <li><NuxtLink to="/work-with-us" class="hover:text-white">Work with us</NuxtLink></li>
        </ul>
      </div>
    </div>

    <!-- Mobile sticky CTA -->
    <div class="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 shadow-[0_-2px_8px_rgba(0,0,0,0.1)] sm:hidden">
      <NuxtLink to="/videos" class="flex h-14 items-center justify-center gap-2 bg-brand-yellow font-display text-sm font-semibold text-ink">
        <Icon name="play" class="h-4 w-4" />Watch videos
      </NuxtLink>
      <a :href="site.youtubeSubscribe" target="_blank" rel="noopener" class="flex h-14 items-center justify-center gap-2 bg-brand-coral font-display text-sm font-semibold text-white">
        <Icon name="youtube" class="h-4 w-4" />Subscribe
      </a>
    </div>
    <div class="h-14 sm:hidden" aria-hidden="true" />

    <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity" leave-to-class="opacity-0" leave-active-class="transition-opacity">
      <button v-if="showTop" type="button" class="fixed bottom-20 right-4 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-brand-sky text-white shadow-md sm:bottom-6" aria-label="Back to top" @click="toTop">
        <Icon name="chevron-up" class="h-5 w-5" />
      </button>
    </Transition>
  </footer>
</template>
