<script setup lang="ts">
useSeoMeta({
  title: 'Vision',
  description: 'At EYS-Kids, street dance isn\'t about training performers. It\'s “education through dance.” Discover lessons that build manners, independence and teamwork, plus our original STE-LAM education.',
})

const { data } = await useFetch('/api/vision')

// Offsets (px) of each circle centre from the ring centre in sted.png, clockwise from the top
const ring = [
  { x: 0, y: -278 }, { x: 256, y: -183 }, { x: 256, y: 147 },
  { x: 0, y: 277 }, { x: -256, y: 147 }, { x: -256, y: -183 },
]
const logo = [
  { ch: 'S', c: '#5FB4C9' }, { ch: 'T', c: '#3DBB95' }, { ch: 'E', c: '#A985EC' }, { ch: '-', c: '#A985EC' },
  { ch: 'L', c: '#3F97CC' }, { ch: 'A', c: '#EC9563' }, { ch: 'M', c: '#DA72B9' },
]
</script>

<template>
  <div>
    <PageHero en="VISION" title="Vision" image="/images/vision/hero.webp" alt="A lesson at EYS-Kids Dance Academy" :crumbs="[{ label: 'Vision' }]" />

    <!-- Vision.png -->
    <section class="section overflow-hidden" aria-labelledby="vision-title">
      <div class="container-x">
        <div class="text-center">
          <svg viewBox="0 0 60 52" class="mx-auto h-12 w-14" role="img" aria-label="Reason 1">
            <defs>
              <linearGradient id="vision-badge" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0" stop-color="#23AADD" /><stop offset="1" stop-color="#A66BF0" />
              </linearGradient>
            </defs>
            <path d="M15 1h30l14 25-14 25H15L1 26Z" fill="url(#vision-badge)" />
            <text x="30" y="37" text-anchor="middle" font-family="Poppins, sans-serif" font-size="30" font-weight="600" fill="#fff">1</text>
          </svg>
          <h2 id="vision-title" class="mx-auto mt-6 max-w-[860px] text-balance text-xl font-medium leading-[1.6] text-ink sm:whitespace-pre-line sm:text-[26px]">{{ data?.visionIntro.title }}</h2>
          <p class="mt-6 text-sm text-ink-soft">{{ data?.visionIntro.lead }}</p>
        </div>

        <ol class="mx-auto mt-10 max-w-[1000px] space-y-12 lg:mt-6 lg:space-y-0">
          <li v-for="(p, i) in data?.visionPillars" :key="p.label" class="lg:flex lg:items-start" :class="i % 2 ? 'lg:flex-row-reverse' : ''">
            <div class="mx-auto w-[78%] max-w-[330px] shrink-0 lg:mx-0 lg:w-[400px] lg:max-w-none">
              <HexFrame :color="p.color" :image="p.image" :alt="p.alt" />
            </div>
            <div class="relative z-10 -mt-6 lg:mt-5 lg:flex-1" :class="i % 2 ? 'lg:-mr-[88px]' : 'lg:-ml-[88px]'">
              <h3 class="skew-box mx-auto flex min-h-12 w-[88%] px-6 py-2 text-center max-w-[400px] items-center justify-center text-[15px] text-white lg:mx-0 lg:h-14 lg:text-base" :class="i % 2 ? 'lg:ml-auto' : ''" :style="{ backgroundColor: p.color }">
                {{ p.label }}
              </h3>
              <p class="mt-6 px-2 text-sm leading-[2] text-ink-soft lg:mt-8 lg:max-w-[440px] lg:text-[14px] lg:leading-[2.2]" :class="i % 2 ? 'lg:ml-0 lg:mr-[130px] lg:px-0' : 'lg:ml-[130px] lg:px-0'">{{ p.body }}</p>
            </div>
          </li>
        </ol>

        <div class="mt-14 text-center">
          <SkewButton to="/curriculum" color="sky" size="lg" class="!h-16 min-w-[300px] font-display !text-2xl font-semibold tracking-[0.18em] drop-shadow-card sm:!h-20 sm:min-w-[440px] sm:!text-3xl">VIEW MORE</SkewButton>
        </div>
      </div>
    </section>

    <!-- sted.png -->
    <section class="section bg-paper-light" aria-labelledby="stelam-title">
      <div class="container-x">
        <p class="relative mx-auto w-fit">
          <span class="band block whitespace-pre-line rounded-md px-8 py-4 text-center text-sm font-medium leading-relaxed text-white shadow-[0_3px_8px_rgba(0,0,0,0.1)] sm:px-12 sm:text-base">{{ data?.stelamIntro.bubble }}</span>
          <span class="absolute -bottom-2 left-1/2 h-3 w-4 -translate-x-1/2 bg-[#A5B9E3] [clip-path:polygon(0_0,100%_0,50%_100%)]" aria-hidden="true" />
        </p>
        <div class="relative mt-10 flex items-center justify-center">
          <span class="absolute left-[4%] hidden h-24 w-px -rotate-[30deg] bg-ink-mute md:block" aria-hidden="true" />
          <h2 id="stelam-title" class="max-w-[680px] text-balance text-center text-base leading-[1.8] text-ink md:max-w-none md:whitespace-pre-line md:px-16 sm:text-lg">{{ data?.stelamIntro.title }}</h2>
          <span class="absolute right-[4%] hidden h-24 w-px rotate-[30deg] bg-ink-mute md:block" aria-hidden="true" />
        </div>

        <ul class="mt-10 flex flex-col items-stretch gap-2 sm:flex-row sm:items-center sm:gap-3" aria-label="What makes up STE-LAM education">
          <template v-for="(p, i) in data?.stelamPillars" :key="p.label">
            <li v-if="i" class="text-center text-3xl font-light leading-none text-ink-mute" aria-hidden="true">+</li>
            <li class="flex h-12 flex-1 items-center justify-center text-sm text-white shadow-[0_3px_6px_rgba(0,0,0,0.12)]" :style="{ backgroundColor: p.color }">{{ p.label }}</li>
          </template>
        </ul>
        <p class="mx-auto mt-8 max-w-[720px] text-center text-[13px] leading-[2] text-ink-soft">{{ data?.stelamIntro.body }}</p>

        <!-- ring diagram (desktop) / grid (mobile) -->
        <div class="mt-12 md:mt-16">
          <div class="mb-8 text-center md:hidden">
            <p class="text-lg text-ink-soft">EYS's original</p>
            <p class="font-display text-5xl font-bold leading-tight tracking-wide" aria-label="STE-LAM"><span v-for="(l, i) in logo" :key="i" :style="{ color: l.c }" aria-hidden="true">{{ l.ch }}</span></p>
            <p class="text-lg text-ink-soft">program</p>
          </div>
          <div class="relative mx-auto md:h-[840px] md:w-[760px]">
            <svg class="absolute left-1/2 top-[390px] hidden h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 md:block" viewBox="0 0 600 600" aria-hidden="true">
              <defs>
                <linearGradient id="stelam-ring" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stop-color="#E9D8FA" /><stop offset="1" stop-color="#D5E8F7" />
                </linearGradient>
              </defs>
              <circle cx="300" cy="300" r="262" fill="none" stroke="url(#stelam-ring)" stroke-width="36" />
            </svg>
            <div class="absolute left-1/2 top-[390px] hidden -translate-x-1/2 -translate-y-1/2 text-center md:block">
              <p class="text-2xl text-ink-soft">EYS's original</p>
              <p class="my-2 font-display text-[64px] font-bold leading-none tracking-wide" aria-label="STE-LAM"><span v-for="(l, i) in logo" :key="i" :style="{ color: l.c }" aria-hidden="true">{{ l.ch }}</span></p>
              <p class="text-2xl text-ink-soft">program</p>
            </div>
            <ul class="grid grid-cols-2 gap-x-4 gap-y-8 min-[520px]:grid-cols-3 md:block">
              <li
                v-for="(f, i) in data?.stelamFields"
                :key="f.letter"
                class="flex flex-col items-center md:absolute md:left-[var(--x)] md:top-[var(--y)] md:w-[200px] md:-translate-x-1/2 md:-translate-y-[100px]"
                :style="{ '--x': `${380 + ring[i].x}px`, '--y': `${390 + ring[i].y}px` }"
              >
                <div class="relative w-full max-w-[160px] md:max-w-none">
                  <img :src="f.image" :alt="f.alt" width="176" height="176" loading="lazy" decoding="async" class="aspect-square w-full rounded-full border-[6px] bg-white object-cover" :style="{ borderColor: f.color }">
                  <span class="absolute bottom-0 left-1/2 flex h-[38%] w-[38%] -translate-x-1/2 translate-y-[42%] items-center justify-center rounded-full font-display text-[28px] font-semibold text-white md:text-[38px]" :style="{ backgroundColor: f.color }" aria-hidden="true">{{ f.letter }}</span>
                </div>
                <p class="relative mt-5 w-[88%] max-w-[180px] bg-white py-2 text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] md:mt-4">
                  <span class="block text-[15px] font-bold" :style="{ color: f.color }">{{ f.name }}</span>
                  <span class="block text-[11px]" :style="{ color: f.color }">({{ f.ja }})</span>
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <CampaignBanner />
    <FreeTrialCta />
  </div>
</template>

