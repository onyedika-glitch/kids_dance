<script setup lang="ts">
import { site } from '~/data/site'
import { audience, brandPromises, naira, offers, type SponsorPackage } from '~/data/support'

useSeoMeta({
  title: 'Work With Us',
  description: 'Sponsor a letter, a learning series or a friendly shout-out on Tiny Explorers Hub, or partner with us as a school. Family-friendly, clearly labelled, brand-safe.',
})

const route = useRoute()
const { data } = await useFetch<{ packages: SponsorPackage[] }>('/api/support', { key: 'support-info' })
const packages = computed(() => data.value?.packages ?? [])
const selected = computed(() => {
  const q = String(route.query.package ?? '')
  return packages.value.some(p => p.id === q) ? q : ''
})
const priceOf = (id: string) => packages.value.find(p => p.id === id)
</script>

<template>
  <div>
    <PageHero en="PARTNERS" title="Work with Tiny Explorers Hub" image="/images/posters/making-learning-fun.webp" alt="Smiling preschoolers sitting together on a classroom rug" :crumbs="[{ label: 'Work With Us' }]" />

    <section class="section bg-paper-light" aria-labelledby="pitch-title">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <h2 id="pitch-title" class="text-3xl font-bold text-ink sm:text-4xl">For brands and schools who care about little ones</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">
            We make cheerful 10-second learning videos: ABCs and phonics, animal facts, songs and culture, faith and family moments.
            Partner with us to reach families in a way parents actually welcome.
          </p>
        </div>

        <ul class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="o in offers" :key="o.id">
            <ChamferCard size="sm" class="h-full" body-class="flex h-full flex-col p-6">
              <span class="grid h-12 w-12 place-items-center rounded-xl text-white" :style="{ backgroundColor: o.color }"><Icon :name="o.icon" class="h-6 w-6" /></span>
              <h3 class="mt-4 text-xl font-semibold text-ink">{{ o.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ o.text }}</p>
              <p v-if="priceOf(o.id)" class="mt-auto pt-4 text-sm text-ink-mute">Starting from <strong class="font-display text-lg text-brand-sky">{{ naira(priceOf(o.id)!.from) }}</strong></p>
              <p v-else class="mt-auto pt-4 text-sm font-bold text-brand-purple">Free to talk about</p>
            </ChamferCard>
          </li>
        </ul>
        <p class="mt-6 text-center text-xs text-ink-mute">Prices are placeholders to start the conversation. Every quote depends on your brief.</p>
      </div>
    </section>

    <section class="section band" aria-labelledby="audience-title">
      <div class="container-x grid gap-8 lg:grid-cols-2">
        <ChamferCard size="md" body-class="h-full p-6 sm:p-8">
          <h2 id="audience-title" class="text-2xl font-bold text-ink sm:text-3xl">Who watches</h2>
          <p class="mt-2 text-sm text-ink-soft">We're a young, growing channel. Here's an honest picture of our audience.</p>
          <ul class="mt-6 space-y-3">
            <li v-for="a in audience" :key="a" class="flex gap-3 text-ink"><Icon name="user" class="mt-0.5 h-5 w-5 shrink-0 text-brand-sky" />{{ a }}</li>
          </ul>
          <div class="mt-6 flex flex-wrap gap-3">
            <a :href="site.facebook" target="_blank" rel="noopener" class="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-band-ice px-4 text-sm font-bold text-brand-sky hover:bg-brand-sky hover:text-white"><Icon name="facebook" class="h-4 w-4" />Facebook<span class="sr-only"> (opens in a new tab)</span></a>
            <a :href="site.youtube" target="_blank" rel="noopener" class="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-brand-coral/10 px-4 text-sm font-bold text-brand-coral hover:bg-brand-coral hover:text-white"><Icon name="youtube" class="h-4 w-4" />YouTube<span class="sr-only"> (opens in a new tab)</span></a>
          </div>
        </ChamferCard>
        <ChamferCard size="md" body-class="h-full p-6 sm:p-8">
          <h2 class="text-2xl font-bold text-ink sm:text-3xl">Our brand-safety promise</h2>
          <p class="mt-2 text-sm text-ink-soft">Parents trust us with their children's screen time. We keep it that way.</p>
          <ul class="mt-6 space-y-3">
            <li v-for="b in brandPromises" :key="b" class="flex gap-3 text-ink"><Icon name="shield" class="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />{{ b }}</li>
          </ul>
        </ChamferCard>
      </div>
    </section>

    <section id="enquire" class="section bg-paper-light scroll-mt-24" aria-labelledby="enquire-title">
      <div class="container-x max-w-3xl">
        <div class="text-center">
          <h2 id="enquire-title" class="text-3xl font-bold text-ink sm:text-4xl">Let's make something together</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">
            Tell us about your brand or school and what you'd like to do. We'll reply by email.
            Prefer email? Write to <a :href="`mailto:${site.email}`" class="[overflow-wrap:anywhere] font-bold text-brand-sky hover:underline">{{ site.email }}</a>.
          </p>
        </div>
        <ContactForm class="mt-10" default-type="brand" :default-package="selected" />
      </div>
    </section>
  </div>
</template>
