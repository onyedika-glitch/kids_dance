<script setup lang="ts">
import type { InterestBubble, LikeEntry, SocialPost } from '~/data/voices'

useSeoMeta({
  title: 'What Families Say',
  description: 'Hear from students and parents at EYS-Kids Dance Academy – reviews shared on social media and our recital “Like” cheer ranking.',
})

const { data } = await useFetch<{ posts: SocialPost[], likeRanking: LikeEntry[], bubbles: InterestBubble[] }>('/api/voices')
const posts = computed(() => data.value?.posts ?? [])

// voice carousel
const active = ref(0)
const activePost = computed(() => posts.value[active.value])
const track = ref<HTMLElement>()
function show(i: number) {
  const n = posts.value.length
  if (!n) return
  active.value = (i + n) % n
  nextTick(() => {
    const el = track.value?.children[active.value] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' })
  })
}

const bubblePos = [
  'left-2 top-5 md:left-[50%] md:top-[52%]',
  'right-2 top-3 md:right-[26%] md:top-[10%]',
  'left-[28%] top-[92px] md:left-auto md:right-[3%] md:top-[36%]',
]
</script>

<template>
  <div>
    <PageHero en="VOICE" title="What Families Say" image="/images/community/friends-2.webp" alt="Kids dancing in the studio" :crumbs="[{ label: 'What Families Say' }]" />

    <!-- voice carousel (View.png) -->
    <section class="relative overflow-hidden pb-16 pt-12 md:pb-24 md:pt-16" aria-labelledby="voice-title">
      <div class="band absolute inset-0" aria-hidden="true" />
      <div class="absolute inset-0 bg-white/40" aria-hidden="true" />
      <div class="container-x relative">
        <h2 id="voice-title" class="text-center text-lg tracking-wide text-ink sm:text-xl">What students and parents are sharing on social media</h2>
        <p class="mt-3 text-center text-sm text-ink-soft">Select a card to read the full post.</p>

        <div class="relative mt-10">
          <button type="button" class="absolute -left-1 top-[40%] z-10 grid h-11 w-11 place-items-center bg-[#7B9BDF] text-white shadow-[0_3px_6px_rgba(0,0,0,.2)] transition-colors hover:bg-[#6384CF] md:left-2 md:h-[50px] md:w-[50px]" aria-label="Previous post" @click="show(active - 1)">
            <svg viewBox="0 0 50 50" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M38 32H12l14-12" /></svg>
          </button>
          <button type="button" class="absolute -right-1 top-[40%] z-10 grid h-11 w-11 place-items-center bg-[#7B9BDF] text-white shadow-[0_3px_6px_rgba(0,0,0,.2)] transition-colors hover:bg-[#6384CF] md:right-2 md:h-[50px] md:w-[50px]" aria-label="Next post" @click="show(active + 1)">
            <svg viewBox="0 0 50 50" class="h-full w-full" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><path d="M12 32h26L24 20" /></svg>
          </button>

          <ul ref="track" class="mx-auto flex max-w-[820px] snap-x snap-mandatory gap-10 overflow-x-auto px-[calc(50%-120px)] pb-8 pt-2 [scrollbar-width:none] md:px-2.5 [&::-webkit-scrollbar]:hidden" aria-label="Social media posts">
            <li v-for="(p, i) in posts" :key="p.id" class="relative w-[240px] shrink-0 snap-center">
              <div
                role="button" tabindex="0"
                class="relative h-[345px] cursor-pointer rounded-md transition-transform hover:-translate-y-1 focus-visible:ring-2 focus-visible:ring-brand-sky"
                :aria-pressed="active === i" :aria-label="`Show ${p.name}'s post`"
                @click="show(i)" @keydown.enter.prevent="show(i)" @keydown.space.prevent="show(i)"
              >
                <PeopleSocialPost :post="p" />
                <span v-if="active === i" class="absolute inset-x-0 bottom-0 h-1.5 rounded-b-md bg-[#4A6FC4]" aria-hidden="true" />
              </div>
              <span v-if="active === i" class="absolute left-1/2 top-[345px] h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[14px] border-x-transparent border-t-[#4A6FC4]" aria-hidden="true" />
            </li>
          </ul>
        </div>

        <ChamferCard v-if="activePost" class="mx-auto mt-6 max-w-[820px]" body-class="px-6 py-7 sm:px-10" aria-live="polite">
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <img v-if="activePost.avatar" :src="activePost.avatar" alt="" width="56" height="56" loading="lazy" decoding="async" class="h-14 w-14 rounded-full object-cover" />
            <p class="text-lg text-ink">{{ activePost.name }}</p>
            <span class="rounded-full bg-[#DDD] px-4 text-xs leading-6 text-ink-soft">{{ activePost.className }}</span>
            <span class="ml-auto text-xs text-ink-mute">{{ activePost.time }}</span>
          </div>
          <p class="mt-5 text-sm leading-[2] text-ink">{{ activePost.text }}</p>
        </ChamferCard>
      </div>
    </section>

    <!-- interest bubbles (Comments.png) -->
    <section class="bg-paper pb-4" aria-labelledby="workshop-title">
      <div class="container-x">
        <div class="relative overflow-hidden rounded-b-[36px] bg-[#D0ECF7] px-6 pb-12 pt-44 sm:pt-40 md:min-h-[270px] md:px-16 md:pb-14 md:pt-20">
          <h2 id="workshop-title" class="relative z-10 text-center text-lg font-medium leading-[1.8] text-[#3E7FD8] sm:text-xl md:w-1/2 md:text-left">
            Only at EYS!<br>Join workshops at our sister schools in other fields!
          </h2>
          <p class="relative z-10 mt-4 text-center text-sm text-ink-soft md:w-1/2 md:text-left">
            Kids can join workshops at other schools in our group – art, music, ballet and more.
          </p>
          <div class="relative z-10 mt-6 text-center md:text-left">
            <SkewButton to="/community" color="sky" size="sm">Explore Our Community</SkewButton>
          </div>
          <ul aria-label="What kids want to try next">
            <li
              v-for="(b, i) in data?.bubbles" :key="i"
              class="absolute grid min-h-[70px] min-w-[128px] place-items-center whitespace-pre-line rounded-[50%] px-6 py-4 text-center text-xs leading-relaxed text-white sm:min-h-[90px] sm:min-w-[170px] sm:text-sm"
              :class="bubblePos[i]"
              :style="{ backgroundColor: b.color }"
            >
              {{ b.text }}
              <svg viewBox="0 0 30 16" class="absolute -bottom-2 left-[22%] h-4 w-7" :fill="b.color" aria-hidden="true"><path d="M30 0C24 7 12 13 0 16 8 11 10 5 10 0Z" /></svg>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- like ranking (Media.png) -->
    <section class="bg-paper pb-20 pt-14 md:pb-28" aria-labelledby="likes-title">
      <div class="container-x">
        <div class="relative mx-auto max-w-[560px] text-center">
          <p class="flex items-center justify-center gap-5 text-sm text-ink" aria-hidden="true">
            <span class="h-6 w-px rotate-[-30deg] bg-ink" />Cheer them on with a “Like”!<span class="h-6 w-px rotate-[30deg] bg-ink" />
          </p>
          <h2 id="likes-title" class="mt-3 text-lg font-medium leading-relaxed text-[#3E7FD8] sm:text-xl">
            <span class="sr-only">Cheer them on with a “Like”! </span>
            We gave it our all!<br>Please vote for us with a “Like”!
          </h2>
          <svg viewBox="0 0 56 44" class="absolute -left-4 top-6 hidden h-11 w-14 -rotate-6 sm:block md:-left-20" aria-hidden="true">
            <path d="M6 4h44a4 4 0 0 1 4 4v24a4 4 0 0 1-4 4H26l-8 8v-8H6a4 4 0 0 1-4-4V8a4 4 0 0 1 4-4Z" fill="#3B6CC5" />
            <path d="M16 18h5v12h-5V18Zm7 12V18l5-8c1.6 0 2.6 1 2.3 2.7L29.8 16H37a2 2 0 0 1 2 2.3l-1.3 9.4A2.5 2.5 0 0 1 35.2 30H23Z" fill="#fff" />
          </svg>
          <svg viewBox="0 0 50 42" class="absolute -right-4 top-4 hidden h-10 w-12 rotate-6 sm:block md:-right-20" aria-hidden="true">
            <path d="M6 2h38a4 4 0 0 1 4 4v22a4 4 0 0 1-4 4H30l-6 8-6-8H6a4 4 0 0 1-4-4V6a4 4 0 0 1 4-4Z" fill="#F4436C" />
            <path d="M25 26s-9-5-9-11c0-2.8 2.1-4.5 4.4-4.5 1.9 0 3.4 1.1 4.6 2.8 1.2-1.7 2.7-2.8 4.6-2.8 2.3 0 4.4 1.7 4.4 4.5 0 6-9 11-9 11Z" fill="#fff" />
          </svg>
        </div>

        <ol class="mx-auto mt-20 grid max-w-[640px] gap-x-10 gap-y-20 sm:grid-cols-2 md:max-w-none md:grid-cols-3 md:gap-y-24">
          <li v-for="(e, i) in data?.likeRanking" :key="e.id" class="relative" :class="{ 'md:-mt-7 md:mb-7': i % 3 === 1 }">
            <PeopleLikeCard :entry="e" />
          </li>
        </ol>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
