<script setup lang="ts">
import { site, primaryNav, moreNav, socials } from '~/data/site'

const route = useRoute()
const drawerOpen = ref(false)
const moreOpen = ref(false)
const moreRef = ref<HTMLElement | null>(null)

watch(() => route.fullPath, () => {
  drawerOpen.value = false
  moreOpen.value = false
})

// Lock page scroll while the mobile drawer is open
watch(drawerOpen, (open) => {
  if (import.meta.client) document.documentElement.style.overflow = open ? 'hidden' : ''
})

function onDocClick(e: MouseEvent) {
  if (moreRef.value && !moreRef.value.contains(e.target as Node)) moreOpen.value = false
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    moreOpen.value = false
    drawerOpen.value = false
  }
}
onMounted(() => {
  document.addEventListener('click', onDocClick)
  document.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  document.removeEventListener('click', onDocClick)
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})

const isActive = (to: string) => to === '/' ? route.path === '/' : route.path.startsWith(to)
const moreActive = computed(() => moreNav.some(i => isActive(i.to)))
</script>

<template>
  <header class="sticky top-0 z-50 bg-paper-light shadow-[0_1px_0_rgba(11,31,79,0.08)]">
    <!-- Top bar: tagline + socials (desktop only) -->
    <div class="hidden bg-ink text-white lg:block">
      <div class="container-wide flex h-9 items-center gap-6 text-xs">
        <p class="font-display tracking-wide text-brand-yellow">{{ site.tagline }}</p>
        <p class="text-white/70">Free learning videos for toddlers & preschoolers</p>
        <ul class="ml-auto flex items-center gap-4">
          <li v-for="s in socials" :key="s.label">
            <a :href="s.href" :target="s.icon === 'mail' ? undefined : '_blank'" rel="noopener" class="flex items-center gap-1.5 text-white/80 hover:text-white">
              <Icon :name="s.icon" class="h-3.5 w-3.5" />{{ s.label }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <!-- Brand bar -->
    <div class="container-wide flex h-16 items-center gap-4 lg:h-20">
      <NuxtLink to="/" class="flex shrink-0 items-center" aria-label="Tiny Explorers Hub home">
        <SiteLogo size="sm" class="lg:hidden" />
        <SiteLogo class="hidden lg:inline-flex" />
      </NuxtLink>

      <nav class="ml-auto hidden lg:block" aria-label="Main menu">
        <ul class="flex items-center gap-1">
          <li v-for="item in primaryNav" :key="item.to">
            <NuxtLink :to="item.to" class="rounded-full px-3.5 py-2 font-display text-[15px] font-medium transition-colors hover:bg-brand-yellow/25" :class="isActive(item.to) ? 'bg-brand-yellow/30 text-ink' : 'text-ink-soft'">{{ item.label }}</NuxtLink>
          </li>
          <li ref="moreRef" class="relative">
            <button type="button" class="flex items-center gap-1.5 rounded-full px-3.5 py-2 font-display text-[15px] font-medium transition-colors hover:bg-brand-yellow/25" :class="moreActive ? 'bg-brand-yellow/30 text-ink' : 'text-ink-soft'" :aria-expanded="moreOpen" aria-haspopup="true" @click="moreOpen = !moreOpen">
              More <Icon name="chevron-down" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': moreOpen }" />
            </button>
            <Transition enter-from-class="opacity-0 -translate-y-1" enter-active-class="transition duration-150" leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition duration-100">
              <ul v-if="moreOpen" class="absolute right-0 top-full z-10 mt-2 w-56 overflow-hidden rounded-2xl bg-white py-2 shadow-[0_10px_24px_-8px_rgba(11,31,79,0.3)]">
                <li v-for="item in moreNav" :key="item.to">
                  <NuxtLink :to="item.to" class="flex items-center justify-between px-5 py-2.5 text-sm font-semibold hover:bg-paper-light" :class="isActive(item.to) ? 'text-brand-orange' : 'text-ink'">
                    {{ item.label }}<Icon name="chevron" class="h-3 w-3 text-brand-yellow" />
                  </NuxtLink>
                </li>
              </ul>
            </Transition>
          </li>
        </ul>
      </nav>

      <SkewButton :href="site.youtubeSubscribe" color="coral" class="ml-auto hidden !h-11 sm:inline-flex lg:ml-2">Subscribe</SkewButton>

      <button
        type="button"
        class="ml-auto flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-pop sm:ml-2 lg:hidden"
        :aria-expanded="drawerOpen"
        aria-controls="mobile-nav"
        :aria-label="drawerOpen ? 'Close menu' : 'Open menu'"
        @click="drawerOpen = !drawerOpen"
      >
        <Icon :name="drawerOpen ? 'close' : 'menu'" class="h-6 w-6" />
      </button>
    </div>

    <!-- Mobile drawer -->
    <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity duration-200" leave-to-class="opacity-0" leave-active-class="transition-opacity duration-150">
      <div v-if="drawerOpen" id="mobile-nav" class="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-paper-light lg:hidden">
        <nav aria-label="Mobile menu" class="px-4 pb-10 pt-4">
          <ul class="grid gap-2">
            <li v-for="item in [...primaryNav, ...moreNav]" :key="item.to">
              <NuxtLink :to="item.to" class="flex items-center justify-between rounded-2xl bg-white px-5 py-4 font-display text-lg font-medium shadow-pop" :class="isActive(item.to) ? 'text-brand-orange' : 'text-ink'">
                {{ item.label }}<Icon name="chevron" class="h-5 w-5 text-brand-yellow" />
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-6 grid gap-3">
            <SkewButton :href="site.youtubeSubscribe" color="coral" size="lg" class="w-full">Subscribe on YouTube</SkewButton>
            <SkewButton :href="site.facebook" color="sky" size="lg" class="w-full">Follow on Facebook</SkewButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
