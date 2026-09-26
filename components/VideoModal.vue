<script setup lang="ts">
// Site-wide YouTube player opened from any video card via useVideoPlayer()
const { current, close } = useVideoPlayer()
const closeBtn = ref<HTMLButtonElement | null>(null)
let returnFocus: HTMLElement | null = null

const src = computed(() => current.value?.youtubeId
  ? `https://www.youtube-nocookie.com/embed/${current.value.youtubeId}?autoplay=1&rel=0&playsinline=1`
  : '')

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}

watch(current, async (v) => {
  if (!import.meta.client) return
  if (v) {
    returnFocus = document.activeElement as HTMLElement | null
    document.documentElement.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    await nextTick()
    closeBtn.value?.focus()
  } else {
    document.documentElement.style.overflow = ''
    document.removeEventListener('keydown', onKey)
    returnFocus?.focus()
  }
})
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <Transition enter-from-class="opacity-0" enter-active-class="transition-opacity duration-200" leave-to-class="opacity-0" leave-active-class="transition-opacity duration-150">
    <div v-if="current" class="fixed inset-0 z-[60] flex items-center justify-center bg-ink/85 p-4" role="dialog" aria-modal="true" :aria-label="current.title" @click.self="close">
      <div class="w-full max-w-4xl">
        <div class="mb-3 flex items-start justify-between gap-4 text-white">
          <p class="text-sm leading-snug sm:text-base">{{ current.title }}</p>
          <button ref="closeBtn" type="button" class="grid h-10 w-10 shrink-0 place-items-center bg-white/10 transition hover:bg-white/20" aria-label="Close video" @click="close">
            <Icon name="close" class="h-6 w-6" />
          </button>
        </div>
        <div class="relative aspect-video w-full bg-black">
          <iframe :src="src" :title="current.title" class="absolute inset-0 h-full w-full" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" />
        </div>
      </div>
    </div>
  </Transition>
</template>
