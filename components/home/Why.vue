<script setup lang="ts">
import { regions, stelam, stelamPills } from '~/data/home'

// "Why EYS-Kids": member counter, bar chart, map, STE-LAM ring
// (Group 207340 (2).png, reason-chart.png, image1.png, step.png, stem-info.png, lesson-banner.png)
// Member figures come from Supabase (/api/stats); anything missing is simply not shown
const { data: stats } = await useFetch('/api/stats', { key: 'stats' })
const members = computed(() => stats.value?.members ?? { total: null, asOf: null, history: [] })
const history = computed(() => members.value.history)
const n = computed(() => history.value.length)
const mix = (a: number[], b: number[], t: number) => `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * t)).join(',')})`
const bars = computed(() => {
  const max = Math.max(1, ...history.value.map(h => h.count))
  return [...history.value].reverse().map((h, i) => ({
    ...h,
    width: 14 + 86 * (h.count / max),
    color: mix([179, 136, 245], [15, 168, 224], n.value > 1 ? i / (n.value - 1) : 0),
  }))
})
const first = computed(() => history.value[0])
const last = computed(() => history.value[n.value - 1])
const fmt = (v: number) => v.toLocaleString('en-US')

// Circle centres on a 600×600 canvas, clockwise from the top (S T E L A M)
const ringPos = [[300, 108], [476, 175], [476, 395], [300, 488], [124, 395], [124, 175]]
const logoColors = ['#3DB4CB', '#3DB4CB', '#13B58A', '#888', '#0B96D2', '#F79152', '#E36CB9']
</script>

<template>
  <section class="section overflow-hidden bg-paper" aria-labelledby="why-title">
    <div class="container-x text-center">
      <h2 id="why-title" class="text-2xl font-medium text-ink sm:text-[28px]">Why Families Choose EYS-Kids</h2>
      <p v-if="members.total" class="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink">
        Over <HomeFlapNumber :value="members.total" class="text-[15px]" /> kids learn with us nationwide!
      </p>
      <p v-else class="mt-6 text-sm text-ink">Kids all over Japan learn with us!</p>
      <p class="mx-auto mt-5 max-w-[520px] text-balance text-sm leading-loose text-ink">
        To make dance easy and fun for every child, we offer a range of services that are firsts in our industry.
      </p>

      <div class="mx-auto mt-10 grid max-w-[680px] gap-10 text-left md:grid-cols-2 md:gap-8">
        <!-- Members -->
        <div>
          <h3 class="flex items-center justify-center gap-5 text-lg text-brand-coral">
            <span class="h-8 w-px -rotate-[30deg] bg-ink-mute" aria-hidden="true" />EYS Members Keep Growing<span class="h-8 w-px rotate-[30deg] bg-ink-mute" aria-hidden="true" />
          </h3>
          <ChamferCard size="lg" class="mt-3" body-class="flex flex-col">
            <p class="bg-[#FF5A60] px-6 py-4 text-sm leading-relaxed text-white">With a vision built around healthy growth, we're one of Japan's fastest-growing kids' academies</p>
            <div class="flex-1 px-6 pb-8 pt-5">
              <p class="text-[13px] leading-relaxed text-ink">Since launching in 2009, EYS has grown year after year thanks to our unique services, and our membership keeps climbing fast.</p>
              <figure v-if="n > 1" class="relative mt-5" :aria-label="`EYS membership growth (from ${fmt(first!.count)} members in ${first!.year} to ${fmt(last!.count)} in ${last!.year})`">
                <div class="flex flex-col gap-[5px] pl-10">
                  <div v-for="(b, i) in bars" :key="b.year" class="relative h-[14px]">
                    <span v-if="i === 0 || i === n - 1" class="absolute -left-10 top-1/2 -translate-y-1/2 font-display text-[11px] font-semibold text-ink-soft">{{ b.year }}</span>
                    <span class="block h-full rounded-r-full" :style="{ width: `${b.width}%`, backgroundColor: b.color }" :title="`${b.year}: ${fmt(b.count)} members`" />
                  </div>
                </div>
                <svg class="pointer-events-none absolute left-10 top-0 h-[150px] w-[70%]" viewBox="0 0 200 150" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M8 145C30 80 80 30 170 14" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" />
                  <path d="M160 4 186 12 164 28Z" fill="#fff" />
                </svg>
                <figcaption class="absolute bottom-7 right-0 text-center text-xs text-ink">Total EYS members<span v-if="members.asOf" class="block text-[9px] text-ink-mute">({{ members.asOf }})</span></figcaption>
              </figure>
              <div v-if="n > 1 || members.total" class="mt-2 flex items-center gap-2 pl-10 text-sm text-ink">
                <span v-if="first" class="-ml-1 mr-auto flex items-center gap-1 font-display text-sm font-semibold text-ink-soft"><span class="h-3 w-1.5 rounded-r-full bg-brand-cyan" />{{ fmt(first.count) }}<span class="text-[10px] font-normal">members</span></span>
                <template v-if="members.total">About <HomeFlapNumber :value="members.total" color="#F2629B" class="text-[13px]" /> members</template>
              </div>
            </div>
          </ChamferCard>
        </div>

        <!-- Studios -->
        <div>
          <h3 class="flex items-center justify-center gap-5 text-lg text-brand-blue">
            <span class="h-8 w-px -rotate-[30deg] bg-ink-mute" aria-hidden="true" />Studios Nationwide!<span class="h-8 w-px rotate-[30deg] bg-ink-mute" aria-hidden="true" />
          </h3>
          <ChamferCard size="lg" class="mt-3" body-class="flex flex-col">
            <p class="bg-brand-blue px-6 py-4 text-sm leading-relaxed text-white">There may be an EYS-Kids Dance Academy right in your neighborhood!</p>
            <div class="flex-1 px-6 pb-7 pt-5">
              <p class="text-[13px] leading-relaxed text-ink">Our easy-to-reach studios near stations keep opening across Japan. Every one is a clean, safe space designed with your child's body and mind in mind.</p>
              <img src="/images/home/japan-map.webp" alt="Map of Japan showing EYS-Kids studios nationwide" width="335" height="284" loading="lazy" decoding="async" class="mx-auto mt-3 w-[78%]" />
              <ul class="mt-2 grid gap-1.5">
                <li v-for="r in regions" :key="r.name">
                  <NuxtLink to="/access" class="flex items-center gap-2 border border-[#EEE] px-3 py-1.5 text-xs text-ink transition hover:border-brand-blue">
                    <span class="w-[5.5rem] shrink-0 font-medium leading-snug text-brand-blue">{{ r.name }}</span>
                    <span class="flex-1 leading-snug">{{ r.studios }}</span>
                    <Icon name="chevron" class="h-3 w-3 text-brand-blue" />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </ChamferCard>
        </div>
      </div>

      <!-- STE-LAM -->
      <div class="relative mx-auto mt-16 max-w-[560px] md:mt-20">
        <span class="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 -rotate-[30deg] bg-ink-mute sm:block" aria-hidden="true" />
        <p class="text-balance px-8 text-base leading-loose text-ink sm:text-lg">In children's education especially, our own STE-LAM approach, which adds language and art to STEM, has a proven track record</p>
        <span class="absolute right-0 top-1/2 hidden h-16 w-px -translate-y-1/2 rotate-[30deg] bg-ink-mute sm:block" aria-hidden="true" />
      </div>

      <ul class="mx-auto mt-8 flex max-w-[840px] flex-col items-center gap-2 sm:flex-row sm:gap-3">
        <template v-for="(p, i) in stelamPills" :key="p.label">
          <li v-if="i > 0" aria-hidden="true"><Icon name="plus" class="h-6 w-6 text-[#AAA]" /></li>
          <li class="w-full max-w-[260px] rounded-[3px] py-3 text-sm text-white shadow-[0_2px_5px_rgba(0,0,0,0.15)] sm:flex-1" :style="{ backgroundColor: p.color }">{{ p.label }}</li>
        </template>
      </ul>
      <p class="mx-auto mt-8 max-w-[600px] text-[13px] leading-loose text-ink-soft">We take STEM education, the 21st-century approach adopted by schools around the world, and add Language, something long missing from education in Japan, to create a learning system all our own.</p>

      <!-- Ring diagram (md+) -->
      <div class="relative mx-auto mt-10 hidden h-[600px] w-[600px] md:block" role="img" aria-label="The EYS STE-LAM system: Science, Technology, Engineering, Language, Art and Mathematics">
        <svg class="absolute inset-0" viewBox="0 0 600 600" aria-hidden="true">
          <defs>
            <linearGradient id="ring" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stop-color="#F3D9F1" />
              <stop offset="1" stop-color="#CFE5F4" />
            </linearGradient>
          </defs>
          <circle cx="300" cy="300" r="180" fill="none" stroke="url(#ring)" stroke-width="40" />
          <g fill="none" stroke-width="3" opacity=".22">
            <path d="M505 40 555 128H455Z M505 78V112" stroke="#13B58A" />
            <path d="M40 110h110l-45 80Z M55 128h82M70 146h55M85 164h30" stroke="#E36CB9" />
            <path d="M540 250 600 310 540 370 480 310Z M510 280 570 340M570 280 510 340" stroke="#A67CF0" />
            <path d="M70 380 125 435 70 490 15 435Z M42 408 97 463" stroke="#F79152" />
          </g>
        </svg>
        <div class="absolute left-1/2 top-[330px] -translate-x-1/2 -translate-y-1/2 text-center">
          <p class="text-xl text-ink-soft">The EYS</p>
          <p class="my-2 font-display text-[46px] font-bold leading-none tracking-wide" aria-hidden="true"><span v-for="(c, i) in 'STE-LAM'" :key="i" :style="{ color: logoColors[i] }">{{ c }}</span></p>
          <p class="text-xl text-ink-soft">System</p>
        </div>
        <div v-for="(s, i) in stelam" :key="s.letter" class="absolute h-[130px] w-[130px] -translate-x-1/2 -translate-y-1/2" :style="{ left: `${ringPos[i][0]}px`, top: `${ringPos[i][1]}px` }">
          <span class="absolute inset-0 rounded-full border-[3px]" :style="{ borderColor: s.color }" />
          <span class="absolute bottom-0 left-1/2 flex h-[54px] w-[54px] -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full font-display text-[30px] font-bold text-white" :style="{ backgroundColor: s.color }">{{ s.letter }}</span>
          <span class="absolute left-1/2 top-[calc(100%+22px)] w-[120px] -translate-x-1/2 bg-white py-1.5 text-center shadow-[0_2px_6px_rgba(0,0,0,0.12)]">
            <span class="block font-display text-[13px] font-bold" :style="{ color: s.color }">{{ s.en }}</span>
            <span class="block text-[10px]" :style="{ color: s.color }">{{ s.ja }}</span>
          </span>
        </div>
      </div>

      <!-- Compact version (mobile) -->
      <div class="mt-10 md:hidden">
        <p class="text-base text-ink-soft">The EYS</p>
        <p class="my-2 font-display text-[40px] font-bold leading-none tracking-wide"><span v-for="(c, i) in 'STE-LAM'" :key="i" :style="{ color: logoColors[i] }">{{ c }}</span></p>
        <p class="text-base text-ink-soft">System</p>
        <ul class="mt-8 grid grid-cols-3 gap-x-3 gap-y-6">
          <li v-for="s in stelam" :key="s.letter" class="flex flex-col items-center">
            <span class="flex h-14 w-14 items-center justify-center rounded-full border-[3px] bg-white" :style="{ borderColor: s.color }">
              <span class="flex h-10 w-10 items-center justify-center rounded-full font-display text-xl font-bold text-white" :style="{ backgroundColor: s.color }">{{ s.letter }}</span>
            </span>
            <span class="mt-2 font-display text-[13px] font-bold" :style="{ color: s.color }">{{ s.en }}</span>
            <span class="text-center text-[11px]" :style="{ color: s.color }">{{ s.ja }}</span>
          </li>
        </ul>
      </div>

      <div class="chamfer mx-auto mt-14 max-w-[500px] bg-brand-blue p-[2px] [--c:18px] md:mt-8">
        <p class="chamfer bg-white px-6 py-6 text-sm leading-loose text-brand-blue [--c:17px]">
          We build each child's curriculum around their personality, drawing on six fields: science, technology, engineering, language, art and mathematics. As kids dive into what they love, their talents blossom.
        </p>
      </div>
    </div>
  </section>
</template>
