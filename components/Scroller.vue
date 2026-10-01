<script setup lang="ts">
// Horizontal card row with round prev/next buttons.
// Scroll-snap on touch; buttons page one card at a time and disable at either end.
defineProps<{ label: string }>()

const el = ref<HTMLElement>()
const atStart = ref(true)
const atEnd = ref(true)

function update() {
  const t = el.value
  if (!t) return
  atStart.value = t.scrollLeft <= 2
  atEnd.value = t.scrollLeft + t.clientWidth >= t.scrollWidth - 2
}
function page(dir: 1 | -1) {
  const t = el.value
  if (!t) return
  const card = t.firstElementChild as HTMLElement | null
  const step = card ? card.offsetWidth + parseFloat(getComputedStyle(t).columnGap || '0') : t.clientWidth
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  t.scrollBy({ left: dir * step, behavior: reduce ? 'auto' : 'smooth' })
}
onMounted(() => {
  update()
  window.addEventListener('resize', update, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <div class="relative">
    <ul ref="el" class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 pt-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" :aria-label="label" tabindex="0" @scroll.passive="update">
      <slot />
    </ul>
    <button v-show="!(atStart && atEnd)" type="button" class="absolute -left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-sky text-white shadow-pop transition hover:bg-brand-blue disabled:opacity-0 md:-left-5" :disabled="atStart" aria-label="Previous" @click="page(-1)">
      <Icon name="chevron-left" class="h-5 w-5" />
    </button>
    <button v-show="!(atStart && atEnd)" type="button" class="absolute -right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-brand-sky text-white shadow-pop transition hover:bg-brand-blue disabled:opacity-0 md:-right-5" :disabled="atEnd" aria-label="Next" @click="page(1)">
      <Icon name="chevron" class="h-5 w-5" />
    </button>
  </div>
</template>
