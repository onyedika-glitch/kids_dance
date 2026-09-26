<script setup lang="ts">
useSeoMeta({
  title: 'Plans & Pricing',
  description: 'A fixed weekly schedule at the same time every week, plus free make-up lessons when your child misses a class. See plans from ¥7,800/month, a full list of fees including enrollment and annual fees, and answers to common questions.',
})

const { data } = await useFetch('/api/pricing')
const openFaq = ref<number | null>(0)
</script>

<template>
  <div>
    <PageHero en="PRICE SYSTEM" title="Plans &amp; Pricing" image="/images/pricing/hero.webp" alt="Kids enjoying a lesson" :crumbs="[{ label: 'Plans & Pricing' }]" />

    <!-- Fixed schedule + free make-up lessons (Lesson.png card 3) -->
    <section class="section" aria-labelledby="system-title">
      <div class="container-x">
        <div class="text-center">
          <p class="font-display text-sm font-semibold tracking-[0.3em] text-brand-purple">SYSTEM</p>
          <h2 id="system-title" class="mt-3 text-xl font-medium leading-relaxed text-ink sm:text-2xl">Great-value plans with free make-up lessons</h2>
          <p class="mx-auto mt-4 max-w-[560px] text-sm leading-relaxed text-ink-soft">EYS-Kids supports what your child loves with two simple systems that make lessons easy to attend and easy to stick with.</p>
        </div>

        <div class="mx-auto mt-10 flex max-w-[420px] items-center justify-center gap-4 bg-lilac px-6 py-8 [clip-path:polygon(24px_0,calc(100%-24px)_0,100%_24px,100%_100%,0_100%,0_24px)] sm:gap-6">
          <template v-for="(p, i) in data?.systemPoints" :key="p.key">
            <span v-if="i" class="text-5xl font-light leading-none text-brand-purple" aria-hidden="true">+</span>
            <span class="drop-shadow-card">
              <span class="chamfer flex h-24 w-24 items-center justify-center bg-white p-[3px] [--c:26px] sm:h-28 sm:w-28">
                <span class="chamfer flex h-full w-full items-center justify-center whitespace-pre-line bg-brand-purple px-1 text-center text-base leading-tight text-white [--c:24px] sm:text-lg">{{ p.key.replace(' ', '\n') }}</span>
              </span>
            </span>
          </template>
        </div>

        <div class="mt-12 grid gap-6 md:grid-cols-2">
          <ChamferCard v-for="(p, i) in data?.systemPoints" :key="p.key" tag="article" body-class="px-6 py-8 sm:px-8">
            <p class="flex items-center gap-3">
              <span class="hex-clip flex h-9 w-10 items-center justify-center font-display text-sm font-bold text-white" :class="i ? 'bg-brand-coral' : 'bg-brand-sky'">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="text-sm font-medium" :class="i ? 'text-brand-coral' : 'text-brand-sky'">{{ p.lead }}</span>
            </p>
            <h3 class="mt-4 text-lg font-bold leading-relaxed text-ink">{{ p.title }}</h3>
            <p class="mt-3 text-sm leading-[1.9] text-ink-soft">{{ p.body }}</p>
          </ChamferCard>
        </div>

        <div class="mt-14">
          <h3 class="flex items-center justify-center gap-5 text-center text-base font-medium text-ink sm:text-lg">
            <span class="h-5 w-px shrink-0 rotate-[-30deg] bg-ink" aria-hidden="true" />Free make-up lessons in 3 easy steps<span class="h-5 w-px shrink-0 rotate-[30deg] bg-ink" aria-hidden="true" />
          </h3>
          <ol class="mt-8 grid gap-4 md:grid-cols-3 md:gap-0">
            <li v-for="(s, i) in data?.makeupSteps" :key="s.title" class="relative flex gap-4 border border-paper bg-white p-5 md:flex-col md:items-center md:border-0 md:text-center">
              <span class="hex-clip flex h-12 w-14 shrink-0 items-center justify-center bg-brand-purple font-display text-lg font-bold text-white">{{ i + 1 }}</span>
              <span>
                <span class="block font-bold text-ink md:mt-2">{{ s.title }}</span>
                <span class="mt-1 block text-[13px] leading-relaxed text-ink-soft">{{ s.body }}</span>
              </span>
              <Icon v-if="i < 2" name="chevron" class="absolute -right-2 top-9 hidden h-5 w-5 text-brand-purple md:block" />
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- plans (choice.png card language) -->
    <section class="section bg-paper" aria-label="Pricing plans">
      <div class="container-x">
        <SectionHeading en="PLAN" title="Plans" lead="On every plan, your first month is prorated. All prices include tax." />
        <ul class="mt-12 grid items-start gap-6 md:grid-cols-3">
          <li v-for="p in data?.plans" :key="p.id" class="relative" :class="p.recommended && 'md:-mt-4'">
            <article class="overflow-hidden rounded-md bg-white shadow-[0_3px_10px_rgba(0,0,0,0.12)]" :class="p.recommended && 'ring-[3px] ring-brand-sky'">
              <div class="relative px-5 pb-5 pt-10 text-center" :style="{ backgroundColor: `${p.color}14` }">
                <span class="absolute left-0 top-3 py-1 pl-3 pr-5 text-xs font-medium text-white [clip-path:polygon(0_0,100%_0,calc(100%-10px)_100%,0_100%)]" :style="{ backgroundColor: p.color }">{{ p.tag }}</span>
                <span v-if="p.recommended" class="absolute right-2 top-2 rounded-full bg-brand-coral px-3 py-0.5 text-[11px] text-white">Most Popular</span>
                <h3 class="text-lg font-bold" :style="{ color: p.color }">{{ p.name }}</h3>
                <p class="mt-2 text-ink"><span class="font-display text-[40px] font-bold italic leading-none text-brand-pink">¥{{ p.price.toLocaleString('en-US') }}</span>/month</p>
                <p class="mt-1 text-xs text-ink-mute">{{ p.perLesson }} (tax incl.)</p>
              </div>
              <dl class="grid grid-cols-[5.5em_1fr] gap-x-2 gap-y-2 px-5 py-5 text-[13px] leading-relaxed text-ink">
                <dt class="text-ink-mute">Lessons</dt><dd>{{ p.frequency }}</dd>
                <dt class="text-ink-mute">Length</dt><dd>{{ p.duration }}</dd>
                <dt class="text-ink-mute">Genres</dt><dd>{{ p.genres }}</dd>
                <dt class="text-ink-mute">Make-ups</dt><dd class="font-medium text-brand-purple">{{ p.makeup }}</dd>
              </dl>
              <p class="mx-5 mb-5 bg-paper-light px-3 py-2 text-center text-xs leading-relaxed text-ink-soft">{{ p.note }}</p>
              <NuxtLink :to="`/freetrial?plan=${p.id}`" class="flex h-12 items-center justify-center gap-2 text-sm font-medium text-white transition-colors" :class="p.recommended ? 'bg-brand-coral hover:bg-[#f0474f]' : 'bg-brand-sky hover:bg-[#1c98c8]'">
                Try This Plan<span class="sr-only"> ({{ p.name }})</span>
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 12h17m-6-6 6 6-6 6" /></svg>
              </NuxtLink>
            </article>
          </li>
        </ul>
        <p class="mt-6 text-center text-xs text-ink-mute">* Small-group lessons (such as Jazz Advanced, Contemporary and Breakin') cost an extra ¥2,000/month.</p>
      </div>
    </section>

    <!-- fees -->
    <section class="section" aria-label="Fees">
      <div class="container-x">
        <SectionHeading en="FEE" title="Fees at a glance" lead="Everything you'll pay at enrollment, each month and each year." />
        <ChamferCard class="mt-10" body-class="px-4 py-6 sm:px-10 sm:py-10">
          <table class="w-full text-left text-sm">
            <caption class="sr-only">Fee breakdown (tax incl.)</caption>
            <thead class="hidden sm:table-header-group">
              <tr class="border-b-2 border-brand-sky text-xs text-ink-mute">
                <th scope="col" class="py-2 font-medium">Item</th>
                <th scope="col" class="py-2 font-medium">Price (tax incl.)</th>
                <th scope="col" class="py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="f in data?.fees" :key="f.item" class="grid grid-cols-[10em_1fr] gap-x-2 border-b border-paper py-3 sm:table-row sm:py-0">
                <th scope="row" class="font-bold text-ink sm:py-4 sm:pr-4">{{ f.item }}</th>
                <td class="font-display text-base font-semibold sm:py-4 sm:pr-4" :class="f.highlight ? 'text-brand-coral' : 'text-ink'">{{ f.price }}</td>
                <td class="col-span-2 mt-1 text-xs leading-relaxed text-ink-soft sm:mt-0 sm:py-4 sm:text-[13px]">{{ f.note }}</td>
              </tr>
            </tbody>
          </table>
        </ChamferCard>

        <h3 class="mt-14 text-center text-base font-medium text-ink sm:text-lg">Money-saving discounts</h3>
        <ul class="mt-6 grid gap-4 sm:grid-cols-3">
          <li v-for="(d, i) in data?.discounts" :key="d.title" class="border-t-4 bg-paper-light px-5 py-6 text-center" :style="{ borderColor: ['#FF9300', '#13B5B1', '#E86BB0'][i] }">
            <p class="font-bold" :style="{ color: ['#FF9300', '#13B5B1', '#E86BB0'][i] }">{{ d.title }}</p>
            <p class="mt-2 text-[13px] leading-relaxed text-ink-soft">{{ d.body }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- FAQ -->
    <section class="section bg-paper" aria-label="Frequently asked questions">
      <div class="container-x">
        <SectionHeading en="Q&amp;A" title="Pricing FAQ" />
        <ul class="mx-auto mt-10 max-w-[800px] space-y-3">
          <li v-for="(f, i) in data?.faqs" :key="f.q" class="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.06)]">
            <h3>
              <button
                :id="`faq-q-${i}`"
                type="button"
                class="flex w-full items-center gap-4 px-5 py-4 text-left text-[15px] font-medium text-ink hover:text-brand-sky"
                :aria-expanded="openFaq === i"
                :aria-controls="`faq-a-${i}`"
                @click="openFaq = openFaq === i ? null : i"
              >
                <span class="font-display text-lg font-bold text-brand-sky" aria-hidden="true">Q</span>
                <span class="flex-1">{{ f.q }}</span>
                <Icon :name="openFaq === i ? 'minus' : 'plus'" class="h-5 w-5 shrink-0 text-brand-sky" />
              </button>
            </h3>
            <div v-show="openFaq === i" :id="`faq-a-${i}`" role="region" :aria-labelledby="`faq-q-${i}`" class="flex gap-4 border-t border-paper px-5 py-4 text-sm leading-[1.9] text-ink-soft">
              <span class="font-display text-lg font-bold leading-6 text-brand-coral" aria-hidden="true">A</span>
              <p class="flex-1">{{ f.a }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <CampaignBanner />
    <FreeTrialCta />
  </div>
</template>
