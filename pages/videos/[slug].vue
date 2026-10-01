<script setup lang="ts">
import { categoryOf, facebookUrl, videoSrc, videoThumb, youtubeUrl, type VideoItem } from '~/data/videos'

const route = useRoute()
const slug = computed(() => String(route.params.slug))
const { data, error } = await useFetch<{ video: VideoItem, liked: boolean, related: VideoItem[] }>(() => `/api/videos/${slug.value}`, { key: `video-${slug.value}` })
if (error.value || !data.value) {
  throw createError({ statusCode: error.value?.statusCode === 404 || !data.value ? 404 : 500, statusMessage: 'Video not found', fatal: true })
}

const video = computed(() => data.value!.video)
const cat = computed(() => categoryOf(video.value.category))
const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/$/, '')
const abs = (p: string) => /^https?:/.test(p) ? p : `${siteUrl}${p}`
const pageUrl = computed(() => `${siteUrl}/videos/${video.value.slug}`)
const fb = computed(() => facebookUrl(video.value))
const yt = computed(() => youtubeUrl(video.value))
const published = computed(() => new Date(video.value.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }))

useSeoMeta({
  title: () => video.value.title,
  description: () => video.value.description,
  ogTitle: () => `${video.value.title} | Tiny Explorers Hub`,
  ogDescription: () => video.value.description,
  ogImage: () => abs(videoThumb(video.value)),
  ogUrl: () => pageUrl.value,
  ogType: 'video.other',
  twitterCard: 'summary_large_image',
})
useHead(() => ({
  link: [{ rel: 'canonical', href: pageUrl.value }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: video.value.title,
      description: video.value.description,
      thumbnailUrl: [abs(videoThumb(video.value))],
      uploadDate: video.value.publishedAt,
      ...(video.value.duration ? { duration: `PT${video.value.duration}S` } : {}),
      ...(videoSrc(video.value) ? { contentUrl: abs(videoSrc(video.value)!) } : {}),
      ...(video.value.youtubeId ? { embedUrl: `https://www.youtube.com/embed/${video.value.youtubeId}` } : {}),
      isFamilyFriendly: true,
      inLanguage: 'en',
      genre: cat.value.label,
      publisher: { '@type': 'Organization', name: 'Tiny Explorers Hub', logo: { '@type': 'ImageObject', url: abs('/images/logo-512.webp') } },
    }),
  }],
}))

const shareText = computed(() => `${video.value.title} (a tiny learning video from Tiny Explorers Hub) ${pageUrl.value}`)
const copied = ref(false)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(pageUrl.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2500)
  }
  catch {
    window.prompt('Copy this link', pageUrl.value)
  }
}
</script>

<template>
  <div>
    <section class="bg-band-sky pb-12 pt-6 md:pb-16 md:pt-8" aria-labelledby="video-title">
      <div class="container-wide">
        <nav aria-label="Breadcrumb">
          <ol class="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-soft">
            <li><NuxtLink to="/" class="hover:text-brand-sky hover:underline">Home</NuxtLink></li>
            <li class="flex items-center gap-2"><Icon name="chevron" class="h-3 w-3" /><NuxtLink to="/videos" class="hover:text-brand-sky hover:underline">Videos</NuxtLink></li>
            <li class="flex items-center gap-2"><Icon name="chevron" class="h-3 w-3" /><NuxtLink :to="`/videos?category=${cat.id}`" class="hover:text-brand-sky hover:underline">{{ cat.label }}</NuxtLink></li>
          </ol>
        </nav>

        <div class="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
          <div class="min-w-0">
            <VideoPlayer :video="video" />

            <div class="mt-6">
              <div class="flex flex-wrap items-center gap-2">
                <NuxtLink :to="`/videos?category=${cat.id}`" class="rounded-full px-3 py-1 text-xs font-bold text-white" :style="{ backgroundColor: cat.color }">{{ cat.label }}</NuxtLink>
                <span v-if="video.letter" class="rounded-full bg-white px-3 py-1 text-xs font-bold text-brand-sky">Letter {{ video.letter }}</span>
                <span class="text-xs font-semibold text-ink-mute">{{ published }}</span>
              </div>
              <h1 id="video-title" class="mt-3 text-balance text-3xl font-bold leading-tight text-ink md:text-4xl">{{ video.title }}</h1>
              <p class="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">{{ video.description }}</p>

              <div class="mt-6 flex flex-wrap items-center gap-3">
                <VideoLikeButton :slug="video.slug" :likes="video.likes" :liked="data!.liked" />
                <a v-if="fb" :href="fb" target="_blank" rel="noopener" class="inline-flex h-11 items-center gap-2 rounded-full bg-[#1877F2] px-5 font-display text-sm font-semibold text-white transition hover:bg-[#0f63d1]">
                  <Icon name="facebook" class="h-5 w-5" />Watch &amp; comment on Facebook
                </a>
                <a v-if="yt" :href="yt" target="_blank" rel="noopener" class="inline-flex h-11 items-center gap-2 rounded-full bg-brand-coral px-5 font-display text-sm font-semibold text-white transition hover:bg-[#c62f2b]">
                  <Icon name="youtube" class="h-5 w-5" />Watch on YouTube
                </a>
              </div>
            </div>
          </div>

          <aside class="flex flex-col gap-5" aria-label="Activities and sharing">
            <div v-if="video.tryThis" class="rounded-3xl border-2 border-brand-yellow bg-white p-6">
              <p class="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                <span class="grid h-10 w-10 place-items-center rounded-full bg-brand-yellow text-ink"><Icon name="bulb" class="h-5 w-5" /></span>
                Try this together
              </p>
              <p class="mt-3 text-base leading-relaxed text-ink">{{ video.tryThis }}</p>
            </div>

            <NuxtLink v-if="video.letter" :to="`/abc#letter-${video.letter}`" class="group flex items-center gap-4 rounded-3xl bg-brand-sky p-5 text-white transition hover:bg-brand-blue">
              <span class="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-white font-display text-3xl font-bold text-brand-sky">{{ video.letter }}</span>
              <span class="min-w-0">
                <span class="block font-display text-lg font-semibold leading-tight">ABC Adventure</span>
                <span class="mt-0.5 block text-sm text-white/90">See every letter from A to Z</span>
              </span>
              <Icon name="chevron" class="ml-auto h-5 w-5 shrink-0 transition group-hover:translate-x-1" />
            </NuxtLink>

            <div class="rounded-3xl bg-white p-6">
              <p class="flex items-center gap-2 font-display text-lg font-semibold text-ink"><Icon name="share" class="h-5 w-5 text-brand-green" />Share with a friend</p>
              <p class="mt-1 text-sm text-ink-soft">Know a little explorer who'd love this?</p>
              <div class="mt-4 grid gap-2">
                <a :href="`https://wa.me/?text=${encodeURIComponent(shareText)}`" target="_blank" rel="noopener" class="inline-flex h-11 items-center gap-3 rounded-full bg-[#25D366] px-5 text-sm font-bold text-white transition hover:bg-[#1eb957]">
                  <Icon name="whatsapp" class="h-5 w-5" />Share on WhatsApp
                </a>
                <a :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageUrl)}`" target="_blank" rel="noopener" class="inline-flex h-11 items-center gap-3 rounded-full bg-[#1877F2] px-5 text-sm font-bold text-white transition hover:bg-[#0f63d1]">
                  <Icon name="facebook" class="h-5 w-5" />Share on Facebook
                </a>
                <button type="button" class="inline-flex h-11 items-center gap-3 rounded-full border-2 border-ink/15 px-5 text-sm font-bold text-ink transition hover:border-ink/40" @click="copyLink">
                  <Icon :name="copied ? 'check' : 'link'" class="h-5 w-5" :class="copied ? 'text-brand-green' : ''" />{{ copied ? 'Link copied!' : 'Copy link' }}
                </button>
                <span class="sr-only" aria-live="polite">{{ copied ? 'Link copied to clipboard' : '' }}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>

    <section v-if="data!.related.length" class="section" aria-labelledby="related-title">
      <div class="container-wide">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="related-title" class="text-2xl font-bold text-ink md:text-3xl">Watch next</h2>
          <NuxtLink to="/videos" class="inline-flex h-10 items-center gap-1 text-sm font-bold text-brand-sky hover:underline">All videos<Icon name="chevron" class="h-4 w-4" /></NuxtLink>
        </div>
        <ul class="mt-6 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          <li v-for="v in data!.related" :key="v.id"><VideoCard :video="v" /></li>
        </ul>
      </div>
    </section>

    <JoinCta />
  </div>
</template>
