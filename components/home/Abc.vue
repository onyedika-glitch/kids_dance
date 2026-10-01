<script setup lang="ts">
import { alphabet, tileColors } from '~/data/home'
import type { VideoItem } from '~/data/videos'

// A–Z strip: letters with a video link to their spot on /abc, the rest are "coming soon"
const props = defineProps<{ videos: VideoItem[] }>()
const ready = computed(() => new Set(props.videos.map(v => v.letter).filter(Boolean) as string[]))
const count = computed(() => ready.value.size)
</script>

<template>
  <section class="section band overflow-hidden" aria-labelledby="abc-title">
    <div class="container-wide">
      <div class="grid items-center gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div class="text-center lg:text-left">
          <DisplayTitle text="ABC Adventure" tag="p" />
          <h2 id="abc-title" class="mt-4 text-xl font-semibold text-ink sm:text-2xl">One letter at a time, from A to Z</h2>
          <p class="mx-auto mt-4 max-w-[480px] text-base leading-relaxed text-ink-soft lg:mx-0">
            Meet a letter, hear its sound and find words that start with it. <template v-if="count">{{ count }} {{ count === 1 ? 'letter is' : 'letters are' }} ready to watch</template><template v-else>New letters are on the way</template>, and more arrive every week.
          </p>
          <div class="mt-7">
            <SkewButton to="/abc" color="coral" size="lg" class="w-full sm:w-auto">Start the ABC Adventure</SkewButton>
          </div>
        </div>
        <ul class="grid grid-cols-6 gap-2 sm:grid-cols-9 sm:gap-2.5 lg:grid-cols-7 xl:grid-cols-9" aria-label="Alphabet letters">
          <li v-for="(l, i) in alphabet" :key="l">
            <NuxtLink
              v-if="ready.has(l)"
              :to="`/abc#letter-${l}`"
              class="grid aspect-square min-h-10 place-items-center rounded-2xl font-display text-2xl font-bold text-white shadow-pop transition hover:-translate-y-1 hover:shadow-lift sm:text-3xl"
              :style="{ backgroundColor: tileColors[i % tileColors.length] }"
              :aria-label="`Letter ${l}: watch the video`"
            >{{ l }}</NuxtLink>
            <span v-else class="grid aspect-square min-h-10 place-items-center rounded-2xl border-2 border-dashed border-ink/20 bg-white/60 font-display text-2xl font-bold text-ink/30 sm:text-3xl" :title="`Letter ${l} is coming soon`">
              <span aria-hidden="true">{{ l }}</span><span class="sr-only">Letter {{ l }}: coming soon</span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
