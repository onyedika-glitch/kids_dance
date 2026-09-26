<script setup lang="ts">
useSeoMeta({
  title: 'Curriculum',
  description: 'See how a lesson flows, explore our learning environment with 10 ways we care for kids (air-conditioned studios, face-recognition entry, security cameras and more), and read trial reports from our official reporters.',
})

const { data } = await useFetch('/api/curriculum')

const fmtDate = (d: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'Asia/Tokyo' }).format(new Date(d.replaceAll('/', '-')))
</script>

<template>
  <div>
    <PageHero en="CURRICULUM" title="Curriculum" image="/images/curriculum/hero.webp" alt="Kids smiling during a lesson" :crumbs="[{ label: 'Curriculum' }]" />

    <!-- lesson flow -->
    <section class="section" aria-label="Lesson flow">
      <div class="container-x">
        <SectionHeading en="LESSON FLOW" title="How a lesson flows" lead="Each 60-minute lesson balances time for building dance skills with time for growing hearts." />
        <ol class="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="(s, i) in data?.lessonFlow" :key="s.title" class="relative pt-6">
            <span class="absolute left-4 top-0 z-10 font-display text-[56px] font-medium italic leading-none" :style="{ color: s.color }" aria-hidden="true">{{ i + 1 }}</span>
            <ChamferCard body-class="px-6 pb-6 pt-10">
              <p class="flex items-center justify-between gap-3">
                <span class="sr-only">Step {{ i + 1 }}: </span>
                <span class="text-base font-medium leading-snug sm:text-[17px]" :style="{ color: s.color }">{{ s.title }}</span>
                <span class="flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-full font-display leading-none text-white" :style="{ backgroundColor: s.color }">
                  <span class="text-lg font-semibold">{{ s.minutes }}</span><span class="text-[10px]">min</span>
                </span>
              </p>
              <p class="mt-3 text-[13px] leading-[1.9] text-ink-soft">{{ s.body }}</p>
            </ChamferCard>
          </li>
        </ol>
      </div>
    </section>

    <!-- curricle.png -->
    <section class="relative pb-16 md:pb-24" aria-labelledby="env-title">
      <div class="band absolute inset-x-0 top-0 h-[300px] md:h-[355px]" aria-hidden="true" />
      <div class="container-x relative">
        <div class="pt-10 text-center text-white md:pl-[260px] md:pt-12">
          <h2 id="env-title" class="text-xl tracking-wide sm:text-[26px]">{{ data?.environmentIntro.title }}</h2>
          <p class="mx-auto mt-5 max-w-[560px] text-xs leading-[1.9] sm:text-[13px]">{{ data?.environmentIntro.lead }}</p>
        </div>

        <div class="relative mt-8 md:mt-6">
          <div class="absolute left-7 top-[-70px] z-10 hidden w-[190px] -rotate-3 bg-[#FFFEF6] px-4 py-5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.14)] lg:block">
            <p class="text-sm text-brand-blue">Our</p>
            <p class="font-display text-[56px] font-bold leading-none text-brand-blue">10</p>
            <p class="text-xl text-brand-blue">ways we care</p>
          </div>
          <div class="drop-shadow-[0_3px_6px_rgba(0,0,0,0.08)]">
            <div class="chamfer bg-white px-4 pb-10 pt-6 [--c:36px] sm:px-8 md:pt-8 lg:px-0 lg:pb-14">
              <ul class="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4 lg:gap-y-6">
                <li class="col-span-2 flex items-start justify-center gap-4 lg:col-span-1 lg:block lg:pt-20">
                  <div class="w-[190px] -rotate-3 bg-[#FFFEF6] px-4 py-5 text-center shadow-[0_4px_12px_rgba(0,0,0,0.14)] lg:hidden">
                    <p class="text-sm text-brand-blue">Our</p>
                    <p class="font-display text-[52px] font-bold leading-none text-brand-blue">10</p>
                    <p class="text-xl text-brand-blue">ways we care</p>
                  </div>
                  <img src="/images/curriculum/kid-boy.webp" alt="" width="220" height="327" loading="lazy" decoding="async" class="hidden w-[150px] sm:block lg:mx-auto lg:w-[180px]">
                </li>
                <template v-for="(e, i) in data?.environment" :key="e.no">
                  <li class="relative pt-8 lg:[&:nth-child(4n+3)]:mt-8 lg:[&:nth-child(4n+1)]:mt-8">
                    <span class="absolute left-2 top-0 z-10 font-display text-[52px] font-medium italic leading-none sm:text-[64px]" :style="{ color: e.color }" aria-hidden="true">{{ e.no }}</span>
                    <article class="h-full drop-shadow-[0_3px_6px_rgba(0,0,0,0.1)]">
                      <div class="chamfer flex h-full flex-col bg-white [--c:26px]">
                        <div class="relative aspect-[231/150] overflow-hidden" :style="{ backgroundColor: e.tint[0] }">
                          <img v-if="e.image" :src="e.image" :alt="e.alt" loading="lazy" decoding="async" class="h-full w-full object-cover">
                          <span v-else class="flex h-full items-center justify-center gap-3 text-brand-sky" aria-hidden="true">
                            <Icon name="shield" class="h-12 w-12" /><Icon name="heart" class="h-9 w-9" />
                          </span>
                        </div>
                        <div class="flex flex-1 flex-col px-3 pb-6 pt-4 text-center">
                          <h3 class="text-balance text-[15px] leading-snug sm:text-[17px]" :style="{ color: e.color }"><span class="sr-only">{{ e.no }}. </span>{{ e.title }}</h3>
                          <p class="mt-3 text-xs leading-[1.8] text-ink-soft sm:text-[13px]">{{ e.body }}</p>
                        </div>
                      </div>
                    </article>
                  </li>
                  <li v-if="i === 1" class="hidden items-start justify-center lg:flex" aria-hidden="true">
                    <img src="/images/curriculum/kid-jump.webp" alt="" width="207" height="305" loading="lazy" decoding="async" class="-mt-12 w-[200px]">
                  </li>
                </template>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- dance-feature1.jpg -->
    <section class="relative overflow-hidden bg-[#E2DDFA] pb-16 pt-14 md:pb-24" aria-labelledby="report-title">
      <p class="pointer-events-none absolute -right-10 top-2 select-none font-display text-[120px] font-bold italic leading-none text-white/40 md:text-[200px]" aria-hidden="true">uno</p>
      <p class="pointer-events-none absolute -left-6 top-14 select-none font-display text-[90px] font-bold italic leading-none text-white/40 md:left-[12%] md:text-[140px]" aria-hidden="true">na-ra</p>
      <div class="container-x relative">
        <div class="text-center">
          <p class="inline-flex items-end gap-2 font-display text-2xl font-semibold italic text-brand-purple">
            <svg viewBox="0 0 40 30" class="h-7 w-9" aria-hidden="true"><path d="M4 4h30l4 4v18H4Z" fill="#8E7CF0" /><path d="M16 9v10a3 3 0 1 1-2-2.8V9h8v3h-6Z" fill="#fff" /></svg>
            <span class="relative">na-ra-uno</span>
          </p>
          <h2 id="report-title" class="mt-2 text-2xl font-bold text-ink sm:text-[30px]">We tried it for real with <span class="whitespace-nowrap"><span class="font-display text-4xl italic text-brand-purple sm:text-5xl">na-ra</span>!</span></h2>
        </div>

        <div class="mx-auto mt-10 max-w-[610px] drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]">
          <div class="chamfer bg-white px-4 pb-10 pt-8 [--c:36px] sm:px-12">
            <p class="relative mx-auto flex w-fit items-center gap-6 whitespace-pre-line text-center text-[15px] font-bold leading-relaxed text-ink">
              <span class="h-14 w-px -rotate-[30deg] bg-ink" aria-hidden="true" />{{ data?.reportIntro.lead }}<span class="h-14 w-px rotate-[30deg] bg-ink" aria-hidden="true" />
            </p>

            <NuxtLink v-if="data" to="/usersvoice" class="group mt-6 block">
              <article>
                <div class="relative overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                  <img :src="data.featuredReport.image" alt="Kids dancing in the studio at a trial lesson" width="518" height="271" loading="lazy" decoding="async" class="aspect-[518/300] w-full object-cover transition-transform duration-500 group-hover:scale-105">
                  <p class="absolute right-3 top-3 flex gap-1.5">
                    <span v-for="t in data.featuredReport.tags" :key="t" class="rounded-full bg-white px-2.5 py-0.5 text-[10px] text-ink sm:text-[11px]">{{ t }}</span>
                  </p>
                </div>
                <div class="relative mx-2 -mt-10 bg-white px-4 py-4 shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:-mr-6 sm:ml-12 sm:px-5">
                  <h3 class="pr-6 text-base font-bold leading-relaxed text-ink sm:text-lg">{{ data.featuredReport.title }}</h3>
                  <p class="mt-3 text-xs font-bold text-ink"><span class="mr-1 text-[10px]">Mom</span>{{ data.featuredReport.parent }}<span class="ml-4 mr-1 text-[10px]">Child</span>{{ data.featuredReport.child }}</p>
                  <p class="mt-1 text-[11px] text-ink-mute">{{ data.featuredReport.meta }}</p>
                  <Icon name="chevron" class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
                </div>
              </article>
            </NuxtLink>

            <ul class="mt-8 grid gap-6 sm:grid-cols-2 sm:gap-10">
              <li v-for="r in data?.reports" :key="r.title">
                <NuxtLink to="/usersvoice" class="group block">
                  <article class="relative">
                    <div class="overflow-hidden rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.15)]">
                      <img :src="r.image" :alt="`${r.child.replace(/\s*\(.*\)/, '')} at a trial lesson`" width="217" height="277" loading="lazy" decoding="async" class="aspect-[217/280] w-full object-cover transition-transform duration-500 group-hover:scale-105">
                    </div>
                    <div class="relative -mt-20 ml-4 bg-white px-3 py-3 shadow-[0_2px_8px_rgba(0,0,0,0.12)] sm:-mr-4">
                      <h3 class="line-clamp-3 pr-4 text-[13px] font-bold leading-snug text-ink">{{ r.title }}</h3>
                      <p class="mt-2 text-[10px] font-bold text-ink">Mom {{ r.parent }}<br>Child {{ r.child }}</p>
                      <p class="text-[10px] text-ink-mute">{{ r.meta }}</p>
                      <Icon name="chevron" class="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-purple" />
                    </div>
                  </article>
                </NuxtLink>
              </li>
            </ul>

            <div class="mt-10 text-center">
              <SkewButton to="/usersvoice" color="purple" size="lg" class="min-w-[240px]">Learn More</SkewButton>
            </div>
          </div>
        </div>

        <div class="mx-auto mt-16 max-w-[800px]">
          <h2 class="text-center text-sm font-bold leading-relaxed text-ink"><span class="font-display">Na-ra-uno</span> Diaries<span class="block text-base">Popular Articles</span></h2>
          <CoursesScroller class="mt-6" label="Popular articles">
            <li v-for="a in data?.popularArticles" :key="a.title" class="w-[70%] shrink-0 snap-start min-[480px]:w-[45%] md:w-[calc(25%-12px)]">
              <NuxtLink to="/usersvoice" class="block h-full overflow-hidden rounded-lg bg-white shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.16)]">
                <article>
                  <img :src="a.image" alt="" width="169" height="94" loading="lazy" decoding="async" class="aspect-[169/94] w-full object-cover">
                  <div class="p-3">
                    <p class="flex justify-between text-[10px] text-ink-mute"><time :datetime="a.date.replaceAll('/', '-')">{{ fmtDate(a.date) }}</time><span>{{ a.author }}</span></p>
                    <h3 class="mt-1 text-xs font-bold leading-snug text-ink">{{ a.title }}</h3>
                    <p class="mt-2 line-clamp-3 text-[11px] leading-relaxed text-ink-soft">{{ a.excerpt }}</p>
                  </div>
                </article>
              </NuxtLink>
            </li>
          </CoursesScroller>

          <h2 class="mt-14 text-center text-sm font-bold leading-relaxed text-ink"><span class="font-display">Na-ra-uno</span> Diaries<span class="block text-base">Featured Families</span></h2>
          <CoursesScroller class="mt-6" label="Featured families">
            <li v-for="f in data?.families" :key="f.name" class="w-[70%] shrink-0 snap-start min-[480px]:w-[45%] md:w-[calc(25%-12px)]">
              <NuxtLink to="/usersvoice" class="block h-full overflow-hidden rounded-lg bg-white text-center shadow-[0_2px_8px_rgba(0,0,0,0.1)] transition-shadow hover:shadow-[0_4px_14px_rgba(0,0,0,0.16)]">
                <img :src="f.image" :alt="`Photo of ${f.name}`" width="169" height="150" loading="lazy" decoding="async" class="aspect-[169/140] w-full object-cover">
                <p class="px-3 pt-3 text-sm font-bold text-ink">{{ f.name }}</p>
                <p class="px-3 pb-3 pt-1 text-[11px] leading-relaxed text-ink-mute">{{ f.meta }}</p>
              </NuxtLink>
            </li>
          </CoursesScroller>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
