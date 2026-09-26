<script setup lang="ts">
import { site, primaryNav, moreNav, sisterBrands } from '~/data/site'

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
  <header class="sticky top-0 z-50 bg-white shadow-[0_1px_0_#e5e5e5]">
    <!-- Group bar (desktop only) -->
    <div class="hidden bg-lilac lg:block">
      <div class="container-wide flex h-12 items-center gap-6">
        <div class="flex items-center gap-4">
          <EysKidsMark />
          <p class="text-[11px] leading-snug text-ink-soft">From toddlers to elementary schoolers<br>Early learning by EYS-KIDS</p>
        </div>
        <ul class="ml-auto flex items-stretch divide-x divide-[#dccbee] text-center">
          <li v-for="b in sisterBrands" :key="b.label" class="px-5">
            <span class="block text-xs font-medium" :class="b.soon ? 'text-ink-mute/70' : 'text-ink-soft'">{{ b.label }}</span>
            <span class="block text-[9px] tracking-widest" :class="b.soon ? 'text-brand-coral/70' : 'text-brand-purple'">{{ b.note }}</span>
          </li>
        </ul>
      </div>
    </div>

    <!-- Brand bar -->
    <div class="container-wide flex h-16 items-center gap-4 lg:h-20">
      <NuxtLink to="/" class="flex shrink-0 items-center gap-5" aria-label="Go to the home page">
        <SiteLogo class="w-[150px] lg:w-[216px]" />
        <p class="hidden text-[11px] leading-5 tracking-wide text-ink-soft xl:block">Growing kids' hearts and bodies<br>EYS-Kids Dance Academy</p>
      </NuxtLink>

      <div class="ml-auto hidden items-center gap-5 sm:flex">
        <a :href="site.phoneHref" class="flex items-center gap-2 text-brand-blue">
          <FreeDialIcon class="h-5 w-9" />
          <span class="leading-tight">
            <span class="block font-display text-xl font-bold text-ink">{{ site.phone }}</span>
            <span class="block text-[10px] text-ink-soft">Phone hours: {{ site.hours }}</span>
          </span>
        </a>
        <SkewButton to="/freetrial" color="sky" class="!h-12 !px-7 lg:!h-14 lg:!min-w-[200px]">Free Trial Lesson</SkewButton>
      </div>

      <button
        type="button"
        class="ml-auto flex h-11 w-11 items-center justify-center text-ink sm:ml-2 lg:hidden"
        :aria-expanded="drawerOpen"
        aria-controls="mobile-nav"
        :aria-label="drawerOpen ? 'Close menu' : 'Open menu'"
        @click="drawerOpen = !drawerOpen"
      >
        <Icon :name="drawerOpen ? 'close' : 'menu'" class="h-7 w-7" />
      </button>
    </div>

    <!-- Primary nav (desktop) -->
    <nav class="hidden border-t border-[#ececec] lg:block" aria-label="Main menu">
      <ul class="mx-auto flex h-12 max-w-content items-center justify-between px-6 text-sm tracking-wider">
        <li v-for="item in primaryNav" :key="item.to">
          <NuxtLink :to="item.to" class="relative py-3 transition-colors hover:text-brand-sky" :class="isActive(item.to) ? 'text-brand-sky' : 'text-ink'">
            {{ item.label }}
            <span v-if="isActive(item.to)" class="absolute inset-x-0 -bottom-[3px] h-[3px] bg-brand-sky" />
          </NuxtLink>
        </li>
        <li ref="moreRef" class="relative">
          <button type="button" class="flex items-center gap-3 py-3 transition-colors hover:text-brand-sky" :class="moreActive ? 'text-brand-sky' : 'text-ink'" :aria-expanded="moreOpen" aria-haspopup="true" @click="moreOpen = !moreOpen">
            More <Icon name="chevron-down" class="h-4 w-4 transition-transform" :class="{ 'rotate-180': moreOpen }" />
          </button>
          <Transition enter-from-class="opacity-0 -translate-y-1" enter-active-class="transition duration-150" leave-to-class="opacity-0 -translate-y-1" leave-active-class="transition duration-100">
            <ul v-if="moreOpen" class="absolute right-0 top-full z-10 mt-1 w-60 border-t-[3px] border-brand-sky bg-white py-2 shadow-[0_6px_18px_rgba(0,0,0,0.12)]">
              <li v-for="item in moreNav" :key="item.to">
                <NuxtLink :to="item.to" class="flex items-center justify-between px-5 py-2.5 text-sm hover:bg-paper-light" :class="isActive(item.to) ? 'text-brand-sky' : 'text-ink'">
                  {{ item.label }}<Icon name="chevron" class="h-3 w-3 text-brand-sky" />
                </NuxtLink>
              </li>
            </ul>
          </Transition>
        </li>
      </ul>
    </nav>

    <!-- Mobile drawer -->
    <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity duration-200" leave-to-class="opacity-0" leave-active-class="transition-opacity duration-150">
      <div v-if="drawerOpen" id="mobile-nav" class="fixed inset-x-0 bottom-0 top-16 overflow-y-auto bg-white lg:hidden">
        <nav aria-label="Mobile menu" class="px-4 pb-10 pt-2">
          <ul class="divide-y divide-[#ececec] border-b border-[#ececec]">
            <li v-for="item in [...primaryNav, ...moreNav]" :key="item.to">
              <NuxtLink :to="item.to" class="flex items-center justify-between py-4 text-[15px]" :class="isActive(item.to) ? 'text-brand-sky' : 'text-ink'">
                {{ item.label }}<Icon name="chevron" class="h-4 w-4 text-brand-sky" />
              </NuxtLink>
            </li>
          </ul>
          <div class="mt-6 space-y-4 text-center">
            <a :href="site.phoneHref" class="inline-flex items-center gap-2 text-brand-blue">
              <FreeDialIcon class="h-5 w-9" />
              <span class="font-display text-2xl font-bold text-ink">{{ site.phone }}</span>
            </a>
            <p class="text-xs text-ink-soft">Phone hours: {{ site.hours }}</p>
            <SkewButton to="/freetrial" color="coral" size="lg" class="w-full">Free Trial Lesson</SkewButton>
          </div>
        </nav>
      </div>
    </Transition>
  </header>
</template>
