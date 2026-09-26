<script setup lang="ts">
import type { Instructor, InstructorReview } from '~/data/instructors'
import { rankColors } from '~/data/instructors'

const route = useRoute()
const { data } = await useFetch<{ instructor: Instructor, reviews: InstructorReview[], others: Instructor[] }>(`/api/instructors/${route.params.id}`)
if (!data.value) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

const inst = computed(() => data.value!.instructor)

useSeoMeta({
  title: () => `${inst.value.name} (${inst.value.en}) | Instructors`,
  description: () => `Meet ${inst.value.name}. ${inst.value.catchcopy} Courses: ${inst.value.courses.join(', ')}. See reviews and lesson style.`,
})
</script>

<template>
  <div v-if="data">
    <section class="bg-white">
      <div class="container-x relative pb-8 pt-12 md:pt-14">
        <nav aria-label="Breadcrumb" class="absolute left-4 top-0 hidden sm:left-6 md:block">
          <ol class="skew-box flex items-center gap-6 bg-[#666] py-1.5 pl-6 pr-10 text-[10px] text-white">
            <li><NuxtLink to="/" class="hover:underline">EYS-Kids Dance Academy Home</NuxtLink></li>
            <li class="flex items-center gap-2"><Icon name="chevron" class="h-2.5 w-2.5" /><NuxtLink to="/instructors" class="hover:underline">Instructors</NuxtLink></li>
            <li class="flex items-center gap-2"><Icon name="chevron" class="h-2.5 w-2.5" /><span aria-current="page" class="font-bold">{{ inst.name }}</span></li>
          </ol>
        </nav>
        <DisplayTitle text="INSTRUCTORS" tag="p" class="text-center !text-[38px] sm:!text-[64px] md:!text-[88px]" />
      </div>
    </section>

    <section class="border-t border-[#DDD] bg-[linear-gradient(180deg,#DEDEDE_0%,#FDFDFD_52%,#EEEEEE_100%)]">
      <div class="container-x grid items-center gap-8 py-10 md:grid-cols-[300px_1fr] md:gap-14 md:py-14">
        <div class="relative mx-auto h-[300px] md:h-[433px]" :style="{ aspectRatio: `${inst.cutoutSize[0]} / ${inst.cutoutSize[1]}` }">
          <img :src="inst.cutout" :alt="`Full-length photo of ${inst.name}`" :width="inst.cutoutSize[0]" :height="inst.cutoutSize[1]" fetchpriority="high" decoding="async" class="h-full w-full object-contain" />
          <PeopleRankStar
            :rank="inst.rank" :color="rankColors[inst.rank]"
            class="absolute -translate-x-1/2 -translate-y-1/2 text-xl md:text-2xl"
            :style="{ left: `${inst.badge.x}%`, top: `${inst.badge.y}%`, width: `${inst.badge.size + 4}%`, aspectRatio: '1' }"
          />
        </div>
        <div>
          <p class="font-display text-sm font-semibold tracking-[0.3em] text-brand-sky">{{ inst.en }}</p>
          <h1 class="mt-2 text-3xl tracking-wide text-ink md:text-4xl">{{ inst.name }}</h1>
          <ul class="mt-4 flex flex-wrap gap-2">
            <li v-for="g in inst.genres" :key="g" class="skew-box bg-brand-sky px-6 py-1 text-xs text-white">{{ g }}</li>
          </ul>
          <p class="mt-6 text-lg font-medium text-ink md:text-xl">{{ inst.catchcopy }}</p>
          <h2 class="mt-6 text-sm font-bold text-ink">Career Highlights</h2>
          <ul class="mt-2 space-y-1.5 text-sm text-ink-soft">
            <li v-for="c in inst.career" :key="c" class="flex gap-2"><Icon name="check" class="mt-0.5 h-4 w-4 shrink-0 text-brand-sky" />{{ c }}</li>
          </ul>
        </div>
      </div>
    </section>

    <section id="reviews" class="scroll-mt-20 bg-paper py-12 md:py-16" aria-label="Profile and reviews">
      <div class="container-x">
        <PeopleProfileCard :instructor="inst" :reviews="data.reviews" reviews-open :show-detail-link="false" heading-tag="h2" />
      </div>
    </section>

    <section class="section bg-white" aria-labelledby="others-title">
      <div class="container-x">
        <h2 id="others-title" class="text-center text-xl text-ink">Other Instructors</h2>
        <ul class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <li v-for="o in data.others" :key="o.id">
            <NuxtLink :to="`/instructors/${o.id}`" class="group flex flex-col items-center gap-3 text-center">
              <span class="relative">
                <img :src="o.avatar" :alt="o.name" width="96" height="96" loading="lazy" decoding="async" class="h-24 w-24 rounded-full border-4 border-white object-cover shadow-[0_2px_8px_rgba(0,0,0,.25)] transition-transform group-hover:scale-105" />
                <PeopleRankStar :rank="o.rank" :color="rankColors[o.rank]" class="absolute -right-2 bottom-0 h-9 w-9 text-sm" />
              </span>
              <span class="text-sm tracking-wide text-ink group-hover:text-brand-sky">{{ o.name }}</span>
              <span class="text-xs text-ink-mute">{{ o.genres.join(' / ') }}</span>
            </NuxtLink>
          </li>
        </ul>
        <div class="mt-12 text-center">
          <SkewButton to="/instructors" color="sky">Back to All Instructors</SkewButton>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
