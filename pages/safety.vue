<script setup lang="ts">
import { entryExit, firstAid, safetyIntro, safetySections, weatherPolicy } from '~/data/safety'

useSeoMeta({
  title: 'Safety & Peace of Mind',
  description: 'How EYS-Kids Dance Academy keeps kids safe: accident insurance, AEDs and first-aid training, studio hygiene, two-adult supervision and app check-in alerts.',
})
</script>

<template>
  <div>
    <PageHero en="SAFETY" title="Safety & Peace of Mind" image="/images/safety/hero.webp" alt="Kids dancing energetically in the studio" :crumbs="[{ label: 'Safety' }]" />

    <section class="section" aria-label="Introduction">
      <div class="container-x">
        <SectionHeading :title="safetyIntro.title" :lead="safetyIntro.lead" />
        <nav aria-label="On this page" class="mt-10">
          <ul class="flex flex-wrap justify-center gap-3">
            <li v-for="s in [firstAid, ...safetySections, entryExit]" :key="s.id">
              <a :href="`#${s.id}`" class="skew-box inline-flex h-11 items-center gap-2 bg-paper px-6 text-sm text-ink transition hover:bg-[var(--tc)] hover:text-white" :style="{ '--tc': s.color }">
                {{ s.title }}<Icon name="chevron-down" class="h-3.5 w-3.5" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <!-- Ready for the unexpected (Firstaid.png) -->
    <section :id="firstAid.id" class="scroll-mt-24 bg-paper py-14 md:py-20" aria-labelledby="emergency-title">
      <div class="container-x">
        <div class="chamfer chamfer-lg bg-[#F4F4F4] px-5 pb-12 pt-10 sm:px-10 md:px-24">
          <h2 id="emergency-title" class="text-center text-lg font-medium text-ink sm:text-xl">{{ firstAid.title }}</h2>
          <ul class="mt-10 grid gap-12 sm:grid-cols-2 sm:gap-10">
            <li v-for="item in firstAid.items" :key="item.title" class="mx-auto max-w-[320px] text-center">
              <div class="relative mx-auto w-[82%]">
                <div class="hex-clip grid aspect-[200/176] place-items-center bg-white">
                  <SafetyIcon :name="item.icon" class="h-[55%] w-[55%] text-[#FF6166]" />
                </div>
                <h3 class="absolute -bottom-3 left-1/2 w-max -translate-x-1/2 bg-[#FF6166] px-8 py-2 text-sm text-white [clip-path:polygon(4%_0,100%_0,96%_100%,0_100%)] sm:text-[15px]">{{ item.title }}</h3>
              </div>
              <p class="mt-8 text-left text-[13px] leading-loose text-ink-soft">{{ item.text }}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Hygiene / supervision -->
    <section v-for="(sec, si) in safetySections" :id="sec.id" :key="sec.id" class="section scroll-mt-24" :class="si % 2 ? 'bg-paper' : 'bg-white'" :aria-labelledby="`${sec.id}-title`">
      <div class="container-x">
        <div class="text-center">
          <DisplayTitle :text="sec.en" tag="p" class="!text-[26px] sm:!text-[34px]" />
          <h2 :id="`${sec.id}-title`" class="mt-4 text-xl font-medium text-ink sm:text-2xl">{{ sec.title }}</h2>
          <p class="mx-auto mt-4 max-w-[640px] text-sm leading-relaxed text-ink-soft">{{ sec.lead }}</p>
        </div>
        <ul class="mt-10 grid gap-5 sm:grid-cols-2">
          <li v-for="item in sec.items" :key="item.title">
            <ChamferCard size="sm" class="h-full" body-class="flex h-full gap-5 p-5 sm:p-6">
              <div class="hex-clip grid h-16 w-[72px] shrink-0 place-items-center" :style="{ backgroundColor: sec.color }">
                <SafetyIcon :name="item.icon" class="h-9 w-9 text-white" />
              </div>
              <div>
                <h3 class="text-base font-medium" :style="{ color: sec.color }">{{ item.title }}</h3>
                <p class="mt-2 text-[13px] leading-relaxed text-ink-soft">{{ item.text }}</p>
              </div>
            </ChamferCard>
          </li>
        </ul>
        <figure v-if="sec.id === 'supervision'" class="mt-10 grid gap-3 sm:grid-cols-2">
          <img src="/images/safety/lesson.webp" alt="A lesson seen through the studio glass" width="216" height="166" loading="lazy" decoding="async" class="chamfer aspect-[16/10] w-full object-cover">
          <img src="/images/safety/studio.webp" alt="A spacious studio where instructors can see every child" width="216" height="162" loading="lazy" decoding="async" class="chamfer aspect-[16/10] w-full object-cover">
          <figcaption class="text-center text-xs text-ink-mute sm:col-span-2">You can watch lessons through the glass at any time</figcaption>
        </figure>
      </div>
    </section>

    <!-- Entry / exit notification -->
    <section :id="entryExit.id" class="scroll-mt-24" :aria-labelledby="`${entryExit.id}-title`">
      <div class="band py-14 md:py-20">
        <div class="container-x">
          <ChamferCard size="lg" body-class="px-5 py-10 sm:px-10 md:px-14">
            <div class="text-center">
              <DisplayTitle :text="entryExit.en" tag="p" class="!text-[24px] sm:!text-[34px]" />
              <h2 :id="`${entryExit.id}-title`" class="mt-4 text-xl font-medium text-ink sm:text-2xl">{{ entryExit.title }}</h2>
              <p class="mx-auto mt-4 max-w-[600px] text-sm leading-relaxed text-ink-soft">{{ entryExit.lead }}</p>
            </div>
            <div class="mt-10 grid items-center gap-10 md:grid-cols-[1fr_260px]">
              <ol class="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
                <li v-for="(s, i) in entryExit.steps" :key="s.title" class="text-center">
                  <p class="font-display text-xs font-semibold text-brand-orange">STEP {{ i + 1 }}</p>
                  <div class="hex-clip mx-auto mt-2 grid h-[70px] w-20 place-items-center bg-brand-orange">
                    <SafetyIcon :name="s.icon" class="h-9 w-9 text-white" />
                  </div>
                  <h3 class="mt-3 text-sm font-medium text-ink">{{ s.title }}</h3>
                  <p class="mt-1 text-xs leading-relaxed text-ink-soft">{{ s.text }}</p>
                </li>
              </ol>
              <!-- Notification preview -->
              <div class="mx-auto w-full max-w-[260px] rounded-[28px] border-[6px] border-ink bg-paper-light px-3 pb-6 pt-8" aria-label="Example notifications" role="img">
                <p class="text-center font-display text-3xl font-light text-ink" aria-hidden="true">18:05</p>
                <ul class="mt-5 space-y-2" aria-hidden="true">
                  <li v-for="m in entryExit.messages" :key="m.time" class="rounded-xl bg-white p-3 shadow-[0_1px_3px_rgba(0,0,0,.1)]">
                    <p class="flex items-center justify-between text-[10px] text-ink-mute">
                      <span class="flex items-center gap-1.5"><span class="h-3.5 w-3.5 rounded bg-brand-sky" />EYS-Kids</span>{{ m.time }}
                    </p>
                    <p class="mt-1 text-xs leading-snug text-ink">{{ m.text }}</p>
                  </li>
                </ul>
              </div>
            </div>
            <ul class="mt-10 space-y-2 border-t border-paper pt-6">
              <li v-for="n in entryExit.notes" :key="n" class="flex gap-2 text-xs leading-relaxed text-ink-soft"><span class="text-brand-orange">*</span>{{ n }}</li>
            </ul>
          </ChamferCard>
        </div>
      </div>
    </section>

    <!-- Weather / disaster -->
    <section class="section" aria-labelledby="weather-title">
      <div class="container-x max-w-[800px]">
        <h2 id="weather-title" class="skew-box mx-auto w-fit bg-brand-blue px-12 py-2.5 text-center text-lg font-medium text-white">{{ weatherPolicy.title }}</h2>
        <ol class="mt-8 space-y-3">
          <li v-for="(t, i) in weatherPolicy.items" :key="i" class="flex gap-4 bg-paper-light px-5 py-4 text-sm leading-relaxed text-ink">
            <span class="font-display text-lg font-semibold leading-none text-brand-blue">{{ String(i + 1).padStart(2, '0') }}</span>{{ t }}
          </li>
        </ol>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
