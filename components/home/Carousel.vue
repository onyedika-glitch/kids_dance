<script setup lang="ts">
// Horizontal scroll-snap carousel with the square "∠" arrow buttons from News.png / jah.png.
// Items go in the default slot; each should carry `snap-start shrink-0` and a width.
withDefaults(defineProps<{
  label: string
  tone?: 'cream' | 'sky' | 'grey'
}>(), { tone: 'cream' })

const track = ref<HTMLElement | null>(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = track.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function step(dir: 1 | -1) {
  const el = track.value
  if (!el) return
  const first = el.firstElementChild as HTMLElement | null
  const gap = parseFloat(getComputedStyle(el).columnGap) || 0
  const unit = first ? first.offsetWidth + gap : el.clientWidth * 0.8
  const perView = Math.max(1, Math.floor((el.clientWidth + gap) / unit))
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollBy({ left: dir * unit * perView, behavior: reduce ? 'auto' : 'smooth' })
}

let ro: ResizeObserver | undefined
onMounted(() => {
  update()
  ro = new ResizeObserver(update)
  if (track.value) ro.observe(track.value)
})
onBeforeUnmount(() => ro?.disconnect())

const tones = {
  cream: 'bg-[#FBF1E4] text-ink hover:bg-white',
  sky: 'bg-[#8FD3EC] text-white hover:bg-brand-sky',
  grey: 'bg-[#77757F] text-white hover:bg-ink',
}
</script>

<template>
  <div class="relative" role="region" :aria-label="label" aria-roledescription="carousel">
    <div
      ref="track"
      tabindex="0"
      class="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 pt-2 outline-none [scrollbar-width:none] focus-visible:ring-2 focus-visible:ring-brand-sky sm:gap-5 [&::-webkit-scrollbar]:hidden"
      @scroll.passive="update"
    >
      <slot />
    </div>
    <div class="mt-2 flex justify-center gap-4 lg:mt-0 lg:contents">
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition disabled:opacity-40 lg:absolute lg:-left-20 lg:top-1/2 lg:-translate-y-1/2"
        :class="tones[tone]"
        :disabled="atStart"
        aria-label="Previous"
        @click="step(-1)"
      >
        <svg viewBox="0 0 28 20" class="h-4 w-6" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M3 14h22M3 14l8-8" /></svg>
      </button>
      <button
        type="button"
        class="flex h-11 w-11 items-center justify-center shadow-[0_2px_6px_rgba(0,0,0,0.15)] transition disabled:opacity-40 lg:absolute lg:-right-20 lg:top-1/2 lg:-translate-y-1/2"
        :class="tones[tone]"
        :disabled="atEnd"
        aria-label="Next"
        @click="step(1)"
      >
        <svg viewBox="0 0 28 20" class="h-4 w-6" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M3 14h22M25 14l-8-8" /></svg>
      </button>
    </div>
  </div>
</template>
