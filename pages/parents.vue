<script setup lang="ts">
import { site } from '~/data/site'
import { categoryOf, videoThumb, type VideoItem } from '~/data/videos'

useSeoMeta({
  title: 'For Parents',
  description: 'How to get the most out of Tiny Explorers Hub videos with your toddler or preschooler: watch together, keep it short, move after watching, plus simple try-this activities.',
})

const { data } = await useFetch<{ videos: VideoItem[] }>('/api/videos', { query: { limit: 200 } })
// Up to six try-this ideas, spread across categories
const activities = computed(() => {
  const withIdea = (data.value?.videos ?? []).filter(v => v.tryThis)
  const byCat = new Map<string, VideoItem[]>()
  for (const v of withIdea) byCat.set(v.category, [...(byCat.get(v.category) ?? []), v])
  const out: VideoItem[] = []
  const lists = [...byCat.values()]
  for (let i = 0; out.length < 6 && lists.some(l => l[i]); i++) {
    for (const l of lists) if (l[i] && out.length < 6) out.push(l[i])
  }
  return out
})
const { open } = useVideoPlayer()

const steps = [
  { title: 'Watch together', text: 'Sit with your child and react out loud: "Wow, three hearts!" Your excitement is the best teacher.', icon: 'user', color: '#1E88E5' },
  { title: 'Keep it short', text: 'Each video is about 10 seconds. One or two at a time is plenty for little eyes and busy minds.', icon: 'clock', color: '#FFB800' },
  { title: 'Move after watching', text: 'Hop, point, sing or go on a hunt around the house. Learning sticks when bodies join in.', icon: 'spark', color: '#3DAA3C' },
  { title: 'Repeat, repeat', text: 'Little ones love the same video again and again. Repetition is how new sounds and words take root.', icon: 'play', color: '#E53935' },
] as const

const care = [
  'Made for ages 2–6: calm, cheerful and age-appropriate',
  'Short videos, so screen time stays small',
  'No ads that ask children to buy, click or share',
  'We never collect any data from children',
  'YouTube videos only load when you press play, in privacy-enhanced mode',
  'Our forms and gifts are for grown-ups only',
]

const faqs = [
  { q: 'What ages are the videos for?', a: 'Toddlers and preschoolers, roughly ages 2 to 6. Older siblings often enjoy the animal facts too.' },
  { q: 'Is it really free?', a: 'Yes. Every video is free to watch here, on Facebook and on YouTube. Grown-ups who want to help can support us, but it\'s never required.' },
  { q: 'Do you collect any data from my child?', a: 'No. Children never need to sign up or type anything. The only thing we count is anonymous likes, and our contact form is for adults only.' },
  { q: 'Can I use the videos in my classroom?', a: 'Of course! Teachers are welcome to play them in class. If you\'d like topics for your curriculum or a series for your school, get in touch.' },
  { q: 'How often do you post new videos?', a: 'We share new videos every week on Facebook and YouTube. Follow or subscribe so you never miss a new letter.' },
]
</script>

<template>
  <div>
    <PageHero en="PARENTS" title="Learning together, a few seconds at a time" image="/images/posters/sunday-smiles.webp" alt="Two smiling children sitting on the grass in a park" :crumbs="[{ label: 'For Parents' }]" />

    <!-- How to use -->
    <section class="section bg-paper-light" aria-labelledby="how-title">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <h2 id="how-title" class="text-3xl font-bold text-ink sm:text-4xl">How to use the videos</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">Our videos are tiny on purpose. Here's how to turn 10 seconds of watching into a whole morning of play.</p>
        </div>
        <ol class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <li v-for="(s, i) in steps" :key="s.title">
            <ChamferCard size="sm" class="h-full" body-class="h-full p-6">
              <div class="flex items-center gap-3">
                <span class="grid h-12 w-12 place-items-center rounded-xl text-white" :style="{ backgroundColor: s.color }"><Icon :name="s.icon" class="h-6 w-6" /></span>
                <span class="font-display text-4xl font-bold text-ink/10" aria-hidden="true">{{ i + 1 }}</span>
              </div>
              <h3 class="mt-4 text-xl font-semibold text-ink"><span class="sr-only">Step {{ i + 1 }}: </span>{{ s.title }}</h3>
              <p class="mt-2 text-sm leading-relaxed text-ink-soft">{{ s.text }}</p>
            </ChamferCard>
          </li>
        </ol>
      </div>
    </section>

    <!-- Try this -->
    <section v-if="activities.length" class="section band" aria-labelledby="try-title">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <p class="font-display text-sm font-semibold uppercase tracking-widest text-brand-orange">Try this at home</p>
          <h2 id="try-title" class="mt-2 text-3xl font-bold text-ink sm:text-4xl">Watch it, then play it</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">Many of our videos come with a little activity. Here are a few favourites.</p>
        </div>
        <ul class="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="v in activities" :key="v.slug">
            <ChamferCard size="sm" class="h-full" body-class="flex h-full flex-col">
              <button type="button" class="group relative block aspect-video w-full overflow-hidden bg-paper focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-sky" :aria-label="`Play ${v.title}`" @click="open(v)">
                <img :src="videoThumb(v, 'sm')" alt="" width="480" height="270" loading="lazy" decoding="async" class="h-full w-full object-cover transition duration-500 group-hover:scale-105">
                <span class="absolute inset-0 grid place-items-center" aria-hidden="true">
                  <span class="grid h-12 w-12 place-items-center rounded-full bg-white/90 text-brand-coral shadow-lg transition group-hover:bg-brand-yellow group-hover:text-ink"><Icon name="play" class="ml-0.5 h-6 w-6" /></span>
                </span>
              </button>
              <div class="flex flex-1 flex-col p-5">
                <span class="self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold text-white" :style="{ backgroundColor: categoryOf(v.category).color }">{{ categoryOf(v.category).label }}</span>
                <h3 class="mt-2 text-lg font-semibold leading-snug text-ink">{{ v.title }}</h3>
                <p class="mt-3 flex gap-2.5 rounded-lg bg-paper-light p-3 text-sm leading-relaxed text-ink">
                  <Icon name="bulb" class="mt-0.5 h-5 w-5 shrink-0 text-brand-orange" /><span><strong class="text-brand-orange">Try this:</strong> {{ v.tryThis }}</span>
                </p>
                <NuxtLink :to="`/videos/${v.slug}`" class="mt-auto inline-flex min-h-[40px] items-center gap-1 pt-3 text-sm font-bold text-brand-sky hover:underline">More about this video<Icon name="chevron" class="h-3.5 w-3.5" /></NuxtLink>
              </div>
            </ChamferCard>
          </li>
        </ul>
        <div class="mt-10 text-center"><SkewButton to="/videos" color="sky" size="lg">Browse all videos</SkewButton></div>
      </div>
    </section>

    <!-- Made with care -->
    <section class="section bg-paper-light" aria-labelledby="care-title">
      <div class="container-x grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p class="font-display text-sm font-semibold uppercase tracking-widest text-brand-green">Safe screen time</p>
          <h2 id="care-title" class="mt-2 text-3xl font-bold text-ink sm:text-4xl">Made with care</h2>
          <p class="mt-4 leading-relaxed text-ink-soft">Everything here is built so you can press play without worrying.</p>
          <ul class="mt-6 space-y-3">
            <li v-for="c in care" :key="c" class="flex gap-3 text-ink"><span class="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand-green text-white"><Icon name="check" class="h-4 w-4" /></span>{{ c }}</li>
          </ul>
          <p class="mt-6 text-sm"><NuxtLink to="/privacy" class="inline-flex min-h-[40px] items-center gap-1 font-bold text-brand-sky hover:underline">Read our privacy policy<Icon name="chevron" class="h-3.5 w-3.5" /></NuxtLink></p>
        </div>
        <HexFrame image="/images/posters/lost-favorite-toy.webp" alt="A little girl pointing excitedly in her bedroom" color="#3DAA3C" class="mx-auto w-full max-w-[440px]" />
      </div>
    </section>

    <!-- FAQ -->
    <section class="section band" aria-labelledby="faq-title">
      <div class="container-x max-w-3xl">
        <h2 id="faq-title" class="text-center text-3xl font-bold text-ink sm:text-4xl">Questions parents ask</h2>
        <div class="mt-10 space-y-3">
          <div v-for="f in faqs" :key="f.q" class="drop-shadow-card">
          <details class="chamfer chamfer-sm group bg-white">
            <summary class="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 bg-white px-5 py-4 font-display text-lg font-semibold text-ink focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-brand-sky [&::-webkit-details-marker]:hidden">
              {{ f.q }}
              <span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-band-ice text-brand-sky transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true"><Icon name="chevron-down" class="h-4 w-4" /></span>
            </summary>
            <p class="px-5 pb-5 leading-relaxed text-ink-soft">{{ f.a }}</p>
          </details>
          </div>
        </div>
        <p class="mt-8 text-center text-sm text-ink-soft">Another question? Email <a :href="`mailto:${site.email}`" class="[overflow-wrap:anywhere] font-bold text-brand-sky hover:underline">{{ site.email }}</a>.</p>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
