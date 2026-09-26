<script setup lang="ts">
import type { CommunityCluster, EventerPhoto } from '~/data/community'
import type { LikeEntry } from '~/data/voices'

useSeoMeta({
  title: 'Community',
  description: 'EYS-Kids Dance Academy in the community: hosting festivals, joining local events and the EYS Eventers who roll in with a stage truck – bringing the joy of dance to the neighborhood.',
})

interface CommunityData {
  intro: { title: string, lead: string }
  clusters: CommunityCluster[]
  friends: { title: string, badge: string, photos: { image: string, alt: string }[], text: string }
  eventers: { shout: string, photos: EventerPhoto[] }
  likes: LikeEntry[]
}
const { data } = await useFetch<CommunityData>('/api/community')

// eventer photo + caption placement inside the big hexagon, in %
const eventerLayout = [
  { x: 30, y: -2, w: 40, label: { x: 32.6, y: 34.8, w: 34.8 } },
  { x: 5.2, y: 45, w: 40, label: { x: 4, y: 82.5, w: 42 } },
  { x: 54.3, y: 45, w: 40.8, label: { x: 51.5, y: 82.5, w: 47 } },
]
</script>

<template>
  <div v-if="data">
    <PageHero en="COMMUNITY" title="Our Community" image="/images/community/friends-1.webp" alt="Kids dancing and smiling in the studio" :crumbs="[{ label: 'Community' }]" />

    <section class="section bg-white" aria-labelledby="community-title">
      <div class="container-x">
        <div class="text-center">
          <h2 id="community-title" class="text-xl font-medium leading-relaxed text-ink sm:text-2xl">{{ data.intro.title }}</h2>
          <p class="mt-4 whitespace-pre-line text-sm leading-relaxed text-ink-soft">{{ data.intro.lead }}</p>
        </div>

        <!-- hexagon clusters (community.png) -->
        <div class="mt-14 space-y-16 md:mt-20 md:space-y-20">
          <article v-for="c in data.clusters" :key="c.id" :aria-labelledby="`cluster-${c.id}`">
            <div class="relative mx-auto w-full max-w-[844px]" :style="{ aspectRatio: String(c.ratio) }">
              <div
                v-for="(p, i) in c.photos" :key="p.image"
                class="absolute" :style="{ left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%` }"
              >
                <HexFrame :color="c.color" :image="p.image" :alt="p.alt" :strokes="i === 0 || i === c.photos.length - 1" />
              </div>
              <h3
                :id="`cluster-${c.id}`"
                class="skew-box absolute flex h-[13%] min-h-[26px] items-center justify-center whitespace-nowrap text-[10px] font-medium tracking-normal sm:tracking-[0.05em] text-white shadow-[0_3px_6px_rgba(0,0,0,.15)] sm:text-base"
                :style="{ left: `${c.labelAt.x}%`, top: `${c.labelAt.y}%`, width: `${c.labelAt.w}%`, backgroundColor: c.color }"
              >
                {{ c.label }}
              </h3>
            </div>
            <p class="mx-auto mt-14 max-w-[640px] whitespace-pre-line text-center text-[13px] leading-[2.2] text-ink-soft">{{ c.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <!-- friends grid -->
    <section class="bg-white pb-16 md:pb-24" aria-labelledby="friends-title">
      <div class="container-x">
        <h2 id="friends-title" class="whitespace-pre-line text-center text-xl leading-relaxed tracking-wide text-ink sm:text-[26px]">{{ data.friends.title }}</h2>
        <div class="relative mt-8">
          <ul class="grid grid-cols-2">
            <li v-for="p in data.friends.photos" :key="p.image">
              <img :src="p.image" :alt="p.alt" width="498" height="278" loading="lazy" decoding="async" class="aspect-[498/278] w-full object-cover" />
            </li>
          </ul>
          <p
            class="absolute left-1/2 top-1/2 flex aspect-[172/96] w-[36%] min-w-[130px] max-w-[176px] -translate-x-[58%] -translate-y-1/2 items-center justify-center whitespace-pre-line bg-brand-coral pl-3 text-center text-[11px] font-medium leading-relaxed text-white [clip-path:polygon(0_46%,24%_0,78%_0,100%_50%,78%_100%,24%_100%)] sm:text-sm"
          >
            <span class="-rotate-6">{{ data.friends.badge }}</span>
          </p>
        </div>
        <p class="mx-auto mt-10 max-w-[640px] whitespace-pre-line text-center text-sm leading-[1.9] text-ink">{{ data.friends.text }}</p>
      </div>
    </section>

    <!-- EYS eventers -->
    <section class="overflow-hidden bg-white pb-20 pt-6 md:pb-28" aria-labelledby="eventers-title">
      <div class="container-x">
        <div class="relative mx-auto mt-16 aspect-[736/640] w-full max-w-[736px]">
          <div class="absolute inset-0 bg-[#FFAE80] opacity-20 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" aria-hidden="true" />
          <div class="absolute inset-[5%] bg-[#FFAE80] opacity-40 [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" aria-hidden="true" />
          <div class="absolute inset-[11%] bg-[#FFAE80] [clip-path:polygon(50%_0,100%_25%,100%_75%,50%_100%,0_75%,0_25%)]" aria-hidden="true" />

          <h2
            id="eventers-title"
            class="absolute -top-[12%] left-0 z-10 w-[46%] min-w-[150px] sm:-left-[8%]"
          >
            <span class="relative block -rotate-6 bg-brand-coral px-4 py-3 text-center text-xs font-medium tracking-wider text-white [clip-path:polygon(4%_0,100%_0,94%_100%,0_100%)] sm:py-5 sm:text-base">{{ data.eventers.shout }}</span>
            <svg viewBox="0 0 60 40" class="absolute -bottom-6 left-[42%] h-8 w-12 -rotate-6" aria-hidden="true"><path d="M0 0h40l20 40L22 0Z" fill="#FF8551" /></svg>
          </h2>

          <figure
            v-for="(p, i) in data.eventers.photos" :key="p.image"
            class="absolute" :style="{ left: `${eventerLayout[i].x}%`, top: `${eventerLayout[i].y}%`, width: `${eventerLayout[i].w}%` }"
          >
            <HexFrame color="#FF5860" :image="p.image" :alt="p.alt" :strokes="false" />
            <figcaption
              class="absolute left-1/2 top-[92%] w-[112%] -translate-x-1/2 skew-box bg-brand-coral px-3 py-1 text-center text-[9px] leading-tight tracking-wider text-white shadow-[0_2px_4px_rgba(0,0,0,.15)] sm:py-1.5 sm:text-xs"
            >
              {{ p.caption }}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- like teaser (Media.png) -->
    <section class="bg-paper pb-20 pt-14 md:pb-24" aria-labelledby="likes-title">
      <div class="container-x">
        <div class="text-center">
          <p class="flex items-center justify-center gap-5 text-sm text-ink" aria-hidden="true">
            <span class="h-6 w-px rotate-[-30deg] bg-ink" />Cheer them on with a “Like”!<span class="h-6 w-px rotate-[30deg] bg-ink" />
          </p>
          <h2 id="likes-title" class="mt-3 text-lg font-medium leading-relaxed text-[#3E7FD8] sm:text-xl">These kids gave it their all at our events.<br>Show your support with a “Like”!</h2>
        </div>
        <ul class="mx-auto mt-20 grid max-w-[640px] gap-x-10 gap-y-20 sm:grid-cols-2 md:max-w-none md:grid-cols-3">
          <li v-for="(e, i) in data.likes" :key="e.id" :class="{ 'md:-mt-7 md:mb-7': i % 3 === 1, 'sm:hidden md:block': i === 2 }">
            <PeopleLikeCard :entry="e" />
          </li>
        </ul>
        <div class="mt-12 text-center">
          <SkewButton to="/usersvoice" color="sky">See More Family Voices</SkewButton>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
