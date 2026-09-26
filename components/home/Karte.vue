<script setup lang="ts">
import { karteSamples } from '~/data/home'

// 4 KARTE (kid-dance.png + Karte-info.png)
const sampleImages = ['/images/home/class-2.webp', '/images/news/dancer-jump.webp', '/images/home/class-4.webp']
const open = ref(false)
const closeBtn = ref<HTMLButtonElement | null>(null)
const opener = ref<HTMLElement | null>(null)

watch(open, async (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
  if (v) {
    await nextTick()
    closeBtn.value?.focus()
  }
  else opener.value?.focus()
})
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape' && open.value) open.value = false
}
onMounted(() => document.addEventListener('keydown', onKey))
onBeforeUnmount(() => {
  document.removeEventListener('keydown', onKey)
  document.documentElement.style.overflow = ''
})
</script>

<template>
  <section id="karte" class="scroll-mt-20 overflow-hidden bg-white pt-14 md:pt-20" aria-labelledby="karte-title">
    <div class="container-x text-center">
      <span class="hex-clip mx-auto flex h-12 w-14 items-center justify-center bg-brand-sky font-display text-2xl font-bold text-white" aria-hidden="true">4</span>
      <DisplayTitle text="KARTE" tag="p" class="mt-3" />
      <h2 id="karte-title" class="mx-auto mt-6 max-w-[640px] text-balance text-xl font-bold leading-relaxed text-ink sm:text-[28px]">Karte progress reports keep kids motivated after every lesson!</h2>
      <p class="mt-4 text-sm font-medium text-ink-soft">After each lesson, your instructor sends you a Karte report.</p>
    </div>

    <!-- Photo + karte speech bubbles -->
    <div class="relative mx-auto mt-10 max-w-[1440px] md:mt-12">
      <div class="grid items-center md:grid-cols-[62%_1fr]">
        <img src="/images/home/karte-photo.webp" alt="A parent and child smiling as they read their Karte on a smartphone" width="835" height="499" loading="lazy" decoding="async" class="aspect-[835/499] w-full object-cover md:h-full" />
        <div class="relative flex h-[300px] items-center justify-center bg-paper-light md:h-full">
          <div class="absolute left-[3%] top-[18%] -rotate-12 md:left-[-8%] md:top-[34%]">
            <p class="relative bg-[#8E7BEF] px-3 py-2.5 text-center text-[13px] font-bold leading-snug text-white shadow-lg sm:px-5 sm:py-3 sm:text-base sm:leading-relaxed">Feedback<br>every lesson<span class="absolute -bottom-3 right-6 h-0 w-0 border-x-[8px] border-t-[14px] border-x-transparent border-t-[#8E7BEF]" /></p>
          </div>
          <div class="absolute right-[5%] top-[8%] rotate-[18deg] md:top-[16%]">
            <p class="relative bg-[#FF7B45] px-3 py-2.5 text-center text-[13px] font-bold leading-snug text-white shadow-lg sm:px-5 sm:py-3 sm:text-base sm:leading-relaxed">Tips to<br>improve<span class="absolute -bottom-3 left-6 h-0 w-0 border-x-[8px] border-t-[14px] border-x-transparent border-t-[#FF7B45]" /></p>
          </div>
          <div class="relative mt-16 h-[250px] w-[128px] overflow-hidden rounded-[22px] border-[5px] border-ink bg-white shadow-xl md:mt-24" aria-hidden="true">
            <span class="absolute left-1/2 top-1 z-10 h-3 w-12 -translate-x-1/2 rounded-full bg-ink" />
            <div class="origin-top-left scale-[0.5] [width:200%] [height:200%]">
              <HomeKarteSample :sample="karteSamples[0]" :image="sampleImages[0]" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container-x pb-14 md:pb-20">
      <!-- What is Karte? -->
      <div class="chamfer mx-auto mt-16 max-w-[680px] bg-brand-orange p-[3px] [--c:26px]">
        <div class="chamfer grid items-end gap-4 bg-white px-5 pb-6 pt-5 [--c:24px] sm:grid-cols-[42%_1fr] sm:px-6 sm:pb-0">
          <img src="/images/home/karte-kids.webp" alt="EYS-Kids students laughing with their arms around each other" width="329" height="249" loading="lazy" decoding="async" class="order-2 mx-auto w-full max-w-[300px] sm:order-1" />
          <div class="order-1 text-center sm:order-2 sm:pb-6">
            <h3 class="skew-box mx-auto inline-block bg-brand-orange px-8 py-2 text-lg font-bold tracking-wide text-white sm:text-xl">What Is Karte?</h3>
            <p class="mt-4 text-sm leading-loose text-ink">Karte is EYS-Kids' own progress report system. Kids can record their lessons in videos and photos, and check their skill map and course progress at a glance!</p>
          </div>
        </div>
      </div>

      <!-- Sample cards -->
      <ul class="mx-auto mt-14 grid max-w-[720px] gap-6 sm:grid-cols-3 sm:gap-5">
        <li v-for="(s, i) in karteSamples" :key="s.title" class="overflow-hidden rounded-md shadow-[0_4px_12px_rgba(0,0,0,0.14)]" :class="[i === 1 ? 'sm:mt-28' : i === 2 ? 'sm:mt-10' : '', i > 0 ? 'hidden sm:block' : '']">
          <HomeKarteSample :sample="s" :image="sampleImages[i]" compact />
        </li>
      </ul>

      <div class="mt-12 text-center">
        <p class="flex items-center justify-center gap-4 text-xs font-bold leading-relaxed text-ink">
          <span class="h-7 w-px -rotate-[25deg] bg-ink-mute" aria-hidden="true" />See how it looks<br>on a phone!<span class="h-7 w-px rotate-[25deg] bg-ink-mute" aria-hidden="true" />
        </p>
        <button ref="opener" type="button" class="skew-box mt-3 inline-flex h-11 items-center gap-2 bg-brand-sky px-10 text-sm font-bold text-white transition hover:bg-[#1c98c8]" aria-haspopup="dialog" @click="open = true">
          <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18.5h2" /></svg>
          Mobile View
        </button>
        <p class="mt-2 text-sm font-bold text-ink">Sample screens</p>
      </div>
    </div>

    <Teleport to="body">
      <Transition enter-from-class="opacity-0" leave-to-class="opacity-0" enter-active-class="transition-opacity" leave-active-class="transition-opacity">
        <div v-if="open" class="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 p-4" @click.self="open = false">
          <div role="dialog" aria-modal="true" aria-label="Karte mobile view sample" class="relative">
            <button ref="closeBtn" type="button" class="absolute -right-3 -top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink shadow" aria-label="Close" @click="open = false">
              <Icon name="close" class="h-5 w-5" />
            </button>
            <div class="relative h-[min(640px,85vh)] w-[min(320px,80vw)] overflow-hidden rounded-[36px] border-[10px] border-ink bg-white">
              <span class="absolute left-1/2 top-1.5 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink" />
              <div class="h-full overflow-y-auto pt-6">
                <HomeKarteSample v-for="(s, i) in karteSamples" :key="s.title" :sample="s" :image="sampleImages[i]" class="border-b-8 border-paper" />
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
