<script setup lang="ts">
import { site } from '~/data/site'
import { videoSrc, videoThumb, type VideoItem } from '~/data/videos'

// Motto, intro, CTAs and the featured video (plays inline; YouTube-only videos open the modal)
const props = defineProps<{ video?: VideoItem | null }>()
const { open } = useVideoPlayer()
const playing = ref(false)

function play() {
  if (!props.video) return
  if (videoSrc(props.video)) playing.value = true
  else open(props.video)
}

const accent = [
  { t: 'Big', c: 'text-brand-sky' },
  { t: 'dreams', c: 'text-brand-coral' },
  { t: 'start', c: 'text-brand-green' },
  { t: 'small!', c: 'text-brand-orange' },
]
</script>

<template>
  <section class="relative overflow-hidden bg-band-ice" aria-labelledby="hero-title">
    <!-- Soft playful shapes -->
    <div class="pointer-events-none absolute inset-0" aria-hidden="true">
      <span class="absolute -left-16 top-24 h-48 w-48 rounded-full border-[18px] border-brand-yellow/30" />
      <span class="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-brand-cyan/25" />
      <span class="absolute left-[46%] top-12 hidden h-4 w-4 rounded-full bg-brand-green/50 lg:block" />
    </div>

    <div class="container-wide relative grid items-center gap-10 pb-14 pt-10 md:pb-20 md:pt-14 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
      <div class="text-center lg:text-left">
        <h1 id="hero-title" class="font-display text-[44px] font-bold leading-[1.02] text-ink sm:text-6xl xl:text-7xl">
          <template v-for="(w, i) in accent" :key="w.t">
            <span :class="w.c">{{ w.t }}</span>{{ i < accent.length - 1 ? ' ' : '' }}
          </template>
        </h1>
        <p class="mx-auto mt-5 max-w-[520px] text-lg leading-relaxed text-ink-soft sm:text-xl lg:mx-0">
          {{ site.intro }} Short, happy videos for toddlers and preschoolers.
        </p>
        <div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <SkewButton to="/videos" color="coral" size="lg" class="w-full sm:w-auto">Watch videos</SkewButton>
          <SkewButton to="/abc" color="sky" size="lg" class="w-full sm:w-auto">Start the ABC Adventure</SkewButton>
        </div>
      </div>

      <div class="relative mx-auto w-full max-w-[620px]">
        <img src="/images/logo-192.webp" alt="" width="192" height="192" class="absolute -left-1 -top-8 z-10 w-20 rotate-[-8deg] rounded-full bg-white shadow-lift motion-safe:animate-bob sm:-left-8 sm:-top-10 sm:w-28" aria-hidden="true">
        <div class="drop-shadow-lift">
          <div class="chamfer chamfer-lg overflow-hidden bg-white p-2 sm:p-3">
            <div v-if="video" class="chamfer relative aspect-video overflow-hidden bg-ink [--c:28px]">
              <video v-if="playing" :src="videoSrc(video)!" :poster="videoThumb(video)" controls autoplay playsinline class="absolute inset-0 h-full w-full" :aria-label="video.title" />
              <button v-else type="button" class="group absolute inset-0 block h-full w-full" :aria-label="`Play video: ${video.title}`" @click="play">
                <img :src="videoThumb(video)" alt="" width="1280" height="720" fetchpriority="high" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]">
                <span class="absolute inset-0 grid place-items-center">
                  <span class="grid h-20 w-20 place-items-center rounded-full bg-white text-brand-coral shadow-lift transition group-hover:scale-110 group-hover:bg-brand-yellow group-hover:text-ink sm:h-24 sm:w-24">
                    <Icon name="play" class="ml-1.5 h-10 w-10 sm:h-12 sm:w-12" />
                  </span>
                </span>
              </button>
            </div>
            <div v-else class="chamfer grid aspect-video place-items-center bg-paper [--c:28px]">
              <img src="/images/logo-512.webp" alt="Tiny Explorers Hub logo" width="512" height="512" class="w-40">
            </div>
            <div v-if="video" class="flex flex-wrap items-center justify-between gap-2 px-2 pb-1 pt-3 sm:px-3">
              <p class="text-sm font-bold text-ink sm:text-base"><span class="mr-2 rounded-full bg-brand-yellow px-2.5 py-0.5 text-xs text-ink">Featured</span>{{ video.title }}</p>
              <NuxtLink :to="`/videos/${video.slug}`" class="inline-flex min-h-10 items-center gap-1 text-sm font-bold text-brand-sky hover:underline">Details<Icon name="chevron" class="h-3.5 w-3.5" /></NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
