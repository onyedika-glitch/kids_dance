<script setup lang="ts">
import { pillars, site } from '~/data/site'
import { pillarImages } from '~/data/home'
import { categories } from '~/data/videos'

useSeoMeta({
  title: 'About Us',
  description: 'Tiny Explorers Hub makes cheerful 10-second learning videos for toddlers and preschoolers. Our story, our mission and how to reach us.',
})

const topics = categories.filter(c => c.id !== 'numbers')
</script>

<template>
  <div>
    <!-- Banner -->
    <section class="bg-paper-light pb-12 pt-8 md:pb-16 md:pt-12" aria-labelledby="about-title">
      <div class="container-wide">
        <nav aria-label="Breadcrumb" class="mb-4 text-xs text-ink-mute">
          <ol class="flex items-center gap-2">
            <li><NuxtLink to="/" class="inline-flex min-h-[40px] items-center hover:text-brand-sky hover:underline">Home</NuxtLink></li>
            <li class="flex items-center gap-2" aria-current="page"><Icon name="chevron" class="h-3 w-3" />About</li>
          </ol>
        </nav>
        <ChamferCard size="md" body-class="overflow-hidden">
          <picture>
            <source media="(max-width: 767px)" srcset="/images/banner-sm.webp">
            <img src="/images/banner.webp" width="1983" height="793" alt="Tiny Explorers Hub banner: Learn, Discover, Grow, Adventure. Fun Learning, Curious Minds, Creative Play, Big Adventures. Big dreams start small!" class="block h-auto w-full" fetchpriority="high" decoding="async">
          </picture>
        </ChamferCard>
        <div class="mx-auto mt-12 max-w-3xl text-center">
          <DisplayTitle text="ABOUT" tag="p" class="!text-[40px] sm:!text-[56px]" />
          <h1 id="about-title" class="mt-4 text-balance text-3xl font-bold text-ink sm:text-4xl">Big dreams start small</h1>
          <p class="mt-5 text-lg leading-relaxed text-ink-soft">{{ site.intro }}</p>
        </div>
      </div>
    </section>

    <!-- Story -->
    <section class="section band" aria-labelledby="story-title">
      <div class="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <h2 id="story-title" class="text-3xl font-bold text-ink sm:text-4xl">Our story</h2>
          <div class="mt-5 space-y-4 leading-relaxed text-ink-soft">
            <p>
              Tiny Explorers Hub is a Facebook page and YouTube channel of short learning videos for toddlers and preschoolers.
              Each video is about 10 seconds long: just right for little attention spans and busy family days.
            </p>
            <p>
              At the heart of the channel is our ABC Adventure, one letter at a time, alongside amazing animal facts, songs that celebrate
              our culture, gentle moments of faith and happy family moments. A numbers series is coming next.
            </p>
          </div>
          <h3 class="mt-8 text-xl font-semibold text-ink">Our mission</h3>
          <p class="mt-3 leading-relaxed text-ink-soft">
            To give every child, wherever they are, a cheerful and safe place to learn, discover and grow, free for every family.
          </p>
          <ul class="mt-6 flex flex-wrap gap-2" aria-label="What we make videos about">
            <li v-for="c in topics" :key="c.id" class="rounded-full px-3 py-1 text-xs font-bold text-white" :style="{ backgroundColor: c.color }">{{ c.label }}</li>
          </ul>
        </div>
        <HexFrame image="/images/posters/making-learning-fun.webp" alt="Smiling preschoolers sitting together on a classroom rug" color="#1E88E5" class="mx-auto mt-6 w-full max-w-[460px] lg:mt-0" />
      </div>
    </section>

    <!-- Pillars -->
    <section class="section bg-paper-light" aria-labelledby="pillars-title">
      <div class="container-x">
        <div class="text-center">
          <p class="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">{{ site.tagline }}</p>
          <h2 id="pillars-title" class="mt-2 text-3xl font-bold text-ink sm:text-4xl">What every video stands for</h2>
        </div>
        <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="p in pillars" :key="p.title">
            <ChamferCard size="sm" class="h-full" body-class="h-full overflow-hidden">
              <img v-if="pillarImages[p.title]" :src="pillarImages[p.title].image" :alt="pillarImages[p.title].alt" width="480" height="270" loading="lazy" decoding="async" class="aspect-video w-full object-cover">
              <div class="p-5">
                <span class="-mt-11 relative grid h-12 w-12 place-items-center rounded-xl text-white ring-4 ring-white" :style="{ backgroundColor: p.color }"><Icon :name="p.icon" class="h-6 w-6" /></span>
                <h3 class="mt-3 text-xl font-semibold" :style="{ color: p.color === '#FFB800' ? '#B27C00' : p.color }">{{ p.title }}</h3>
                <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ p.text }}</p>
              </div>
            </ChamferCard>
          </li>
        </ul>
      </div>
    </section>

    <!-- Follow -->
    <section class="section band" aria-labelledby="follow-title">
      <div class="container-x">
        <h2 id="follow-title" class="text-center text-3xl font-bold text-ink sm:text-4xl">Where to find us</h2>
        <ul class="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          <li>
            <a :href="site.facebook" target="_blank" rel="noopener" class="group block h-full drop-shadow-card focus-visible:outline-none">
              <span class="chamfer chamfer-sm flex h-full flex-col items-center gap-2 bg-white p-6 text-center group-focus-visible:ring-4 group-focus-visible:ring-inset group-focus-visible:ring-brand-sky">
                <span class="grid h-12 w-12 place-items-center rounded-full bg-brand-sky text-white"><Icon name="facebook" class="h-6 w-6" /></span>
                <span class="font-display text-lg font-semibold text-ink">Facebook</span>
                <span class="text-sm text-ink-soft">New videos first</span><span class="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </li>
          <li>
            <a :href="site.youtube" target="_blank" rel="noopener" class="group block h-full drop-shadow-card focus-visible:outline-none">
              <span class="chamfer chamfer-sm flex h-full flex-col items-center gap-2 bg-white p-6 text-center group-focus-visible:ring-4 group-focus-visible:ring-inset group-focus-visible:ring-brand-sky">
                <span class="grid h-12 w-12 place-items-center rounded-full bg-brand-coral text-white"><Icon name="youtube" class="h-6 w-6" /></span>
                <span class="font-display text-lg font-semibold text-ink">YouTube</span>
                <span class="text-sm text-ink-soft">@tinyexplorershub9</span><span class="sr-only">(opens in a new tab)</span>
              </span>
            </a>
          </li>
          <li>
            <a :href="`mailto:${site.email}`" class="group block h-full drop-shadow-card focus-visible:outline-none">
              <span class="chamfer chamfer-sm flex h-full flex-col items-center gap-2 bg-white p-6 text-center group-focus-visible:ring-4 group-focus-visible:ring-inset group-focus-visible:ring-brand-sky">
                <span class="grid h-12 w-12 place-items-center rounded-full bg-brand-green text-white"><Icon name="mail" class="h-6 w-6" /></span>
                <span class="font-display text-lg font-semibold text-ink">Email</span>
                <span class="[overflow-wrap:anywhere] text-sm text-ink-soft">{{ site.email }}</span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>

    <!-- Contact -->
    <section id="contact" class="section bg-paper-light scroll-mt-24" aria-labelledby="contact-title">
      <div class="container-x max-w-3xl">
        <div class="text-center">
          <h2 id="contact-title" class="text-3xl font-bold text-ink sm:text-4xl">Say hello</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">Ideas for a letter, a question about a video or a kind word: we'd love to hear from you.</p>
        </div>
        <ContactForm class="mt-10" default-type="parent" />
      </div>
    </section>

    <JoinCta />
  </div>
</template>
