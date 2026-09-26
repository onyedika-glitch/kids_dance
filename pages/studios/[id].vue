<script setup lang="ts">
import { commonFaqs, voices, genreLabel, type Area, type Studio, type StudioCardData } from '~/data/studios'

const route = useRoute()
const id = computed(() => String(route.params.id))
const { data, error } = await useFetch<{ studio: Studio, prefecture: Area, city: Area, nearby: StudioCardData[] }>(() => `/api/studios/${id.value}`)
if (error.value || !data.value) throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })

const s = computed(() => data.value!.studio)
// Display title above the hero heading: "Daikanyama Studio" -> "Daikanyama", "Musashi-Kosugi Studio" -> "Musashi Kosugi"
// (space so DisplayTitle can break between the two words on mobile)
const short = computed(() => s.value.name.replace(/ Studio$/, '').replace('-', ' '))
const crumbs = computed(() => [
  { label: 'Access', to: '/access' },
  { label: data.value!.prefecture.name, to: `/access/${data.value!.prefecture.slug}` },
  { label: s.value.name },
])
// rich pages: studio-specific voice heading, Q&A intro + studio questions, recruit banner (last.png)
const voiceTitle = computed(() => `What ${s.value.rich ? s.value.name : 'EYS-Kids'} students and parents say`)
const faqs = computed(() => s.value.rich ? [...(s.value.faqs ?? []), ...commonFaqs] : commonFaqs)

const accessOpen = ref(false)
// deep link: /studios/x#access or ?access=open opens the panel
onMounted(() => {
  if (route.hash === '#access' || route.query.access === 'open') toggleAccess(true)
})
const panel = ref<HTMLElement>()
async function toggleAccess(open: boolean) {
  accessOpen.value = open
  await nextTick()
  if (open && route.hash === '#access') document.getElementById('studio-access-panel')?.scrollIntoView({ block: 'start' })
  if (!open) document.getElementById('studio-intro')?.scrollIntoView({ block: 'start', behavior: 'smooth' })
}

useSeoMeta({
  title: () => `${s.value.name} (near ${s.value.station} Station)`,
  description: () => `EYS-Kids Dance Academy ${s.value.name}: ${s.value.access}. Kids' dance lessons in ${s.value.genres.map(genreLabel).join(', ')}. Book a free trial lesson today.`,
  ogImage: () => s.value.cardImage,
})
useHead(() => ({
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'DanceSchool',
      'name': `EYS-Kids Dance Academy ${s.value.name}`,
      'telephone': s.value.phone,
      'address': { '@type': 'PostalAddress', 'postalCode': s.value.postal, 'streetAddress': `${s.value.addressNote ? s.value.addressNote + ', ' : ''}${s.value.address}`, 'addressCountry': 'JP' },
    }),
  }],
}))
</script>

<template>
  <div>
    <!-- Hero (areir.png) -->
    <PageHero :en="short" :title="s.catch" :image="s.heroImage" :alt="`Entrance of ${s.name}`" :crumbs="crumbs">
      <p class="mx-auto mt-4 hidden max-w-[520px] text-xs leading-relaxed text-ink-soft sm:block">{{ s.lead }}</p>
    </PageHero>

    <!-- Gallery + catch copy (down.png) -->
    <section id="studio-intro" class="scroll-mt-20 pt-12 md:pt-16" aria-labelledby="studio-name">
      <div class="container-x">
        <div class="mx-auto max-w-[750px]">
          <h2 id="studio-name" class="skew-box bg-brand-coral py-2.5 text-center text-lg tracking-wider text-white sm:text-xl" style="clip-path: polygon(10px 0, 100% 0, calc(100% - 10px) 100%, 0 100%)">{{ s.name }}</h2>

          <div class="relative mt-8 md:mt-10">
            <ChamferCard size="lg">
              <StudioGallery :photos="s.gallery" :label="s.name" />
              <div class="relative px-5 pb-10 pt-5 text-center md:px-[210px] md:pb-12">
                <p class="text-[15px] tracking-wider text-ink">{{ s.name }}</p>
                <span class="mx-auto mt-3 block h-px w-6 bg-ink-mute" aria-hidden="true" />
                <p class="mt-3 text-xs leading-loose text-ink-soft"><template v-for="(l, i) in s.intro" :key="i">{{ l }}<br></template></p>
              </div>
            </ChamferCard>
            <!-- kids + speech bubbles -->
            <div class="pointer-events-none absolute inset-x-0 bottom-0 hidden md:block" aria-hidden="true">
              <img src="/images/studios/kid-left.webp" alt="" width="128" height="304" loading="lazy" decoding="async" class="absolute -bottom-12 left-[42px] w-[80px] mix-blend-multiply">
              <img src="/images/studios/kid-right.webp" alt="" width="128" height="311" loading="lazy" decoding="async" class="absolute -bottom-12 right-[22px] w-[80px] mix-blend-multiply">
              <div class="absolute bottom-[80px] left-[98px] w-[150px]">
                <svg viewBox="0 0 130 100" class="w-full"><path d="M8 14 96 2l32 38-28 32-50 4-20 20 4-20-20 2Z" fill="#FF9300" /></svg>
                <p class="absolute inset-x-2 top-[18%] -rotate-[8deg] whitespace-pre-line text-center text-[11px] font-medium leading-snug text-white">{{ s.bubbles[0] }}</p>
              </div>
              <div class="absolute bottom-[70px] right-[80px] w-[150px]">
                <svg viewBox="0 0 130 100" class="w-full"><path d="M122 14 34 2 2 40l28 32 50 4 20 20-4-20 20 2Z" fill="#A66BF0" /></svg>
                <p class="absolute inset-x-2 top-[18%] -rotate-[12deg] whitespace-pre-line text-center text-[11px] font-medium leading-snug text-white">{{ s.bubbles[1] }}</p>
              </div>
            </div>
            <div class="relative z-10 -mt-5 text-center">
              <button v-show="!accessOpen" type="button" class="skew-box inline-flex h-11 min-w-[220px] items-center justify-center gap-6 bg-brand-sky px-8 text-sm text-white hover:bg-[#1c98c8] sm:h-12"
                aria-controls="studio-access-panel" :aria-expanded="accessOpen" @click="toggleAccess(true)">
                See Access Info<Icon name="chevron-down" class="h-5 w-5" />
              </button>
            </div>
          </div>

          <div v-show="accessOpen" id="studio-access-panel" ref="panel" class="mt-10">
            <StudioAccessPanel :studio="s" @close="toggleAccess(false)" />
          </div>
        </div>
      </div>
    </section>

    <!-- Location + interior (explore.png, interior.png) -->
    <section class="section" aria-labelledby="location-title">
      <div class="container-x">
        <h2 id="location-title" class="text-center mx-auto max-w-[640px] text-balance text-xl leading-snug tracking-wide text-ink sm:text-2xl">{{ s.locationTitle }}</h2>
        <p class="mx-auto mt-5 max-w-[640px] text-pretty text-center text-xs leading-loose text-ink-soft sm:text-[13px]">{{ s.locationLead }}</p>

        <div v-if="s.interior" class="mx-auto mt-10 grid max-w-[750px] grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:grid-rows-2">
          <figure class="relative row-span-2 shadow-[0_2px_6px_rgba(0,0,0,0.14)]">
            <img :src="s.interior.photos[0].src" :alt="s.interior.photos[0].alt" width="226" height="395" loading="lazy" decoding="async" class="h-full w-full border-4 border-white object-cover">
            <figcaption class="absolute -left-1 bottom-3 space-y-1.5 text-[11px] text-white md:-left-2">
              <span v-for="(c, i) in s.interior.captions[0].split('\n')" :key="i" class="block w-fit whitespace-nowrap bg-brand-orange py-1 pl-3 pr-6 text-[10px] sm:text-[11px]" style="clip-path: polygon(0 0, 100% 0, calc(100% - 12px) 100%, 0 100%)">{{ c }}</span>
            </figcaption>
          </figure>
          <img v-for="p in s.interior.photos.slice(1, 5)" :key="p.src" :src="p.src" :alt="p.alt" width="229" height="229" loading="lazy" decoding="async"
            class="aspect-square w-full border-4 border-white object-cover shadow-[0_2px_6px_rgba(0,0,0,0.14)] md:order-none">
          <figure class="relative row-span-2 shadow-[0_2px_6px_rgba(0,0,0,0.14)] md:col-start-4 md:row-start-1">
            <img :src="s.interior.photos[5].src" :alt="s.interior.photos[5].alt" width="225" height="395" loading="lazy" decoding="async" class="h-full w-full border-4 border-white object-cover">
            <figcaption class="absolute -right-1 bottom-3 flex flex-col items-end space-y-1.5 text-[11px] text-white md:-right-2">
              <span v-for="(c, i) in s.interior.captions[1].split('\n')" :key="i" class="block w-fit whitespace-nowrap bg-brand-sky py-1 pl-6 pr-3 text-[10px] sm:text-[11px]" style="clip-path: polygon(12px 0, 100% 0, 100% 100%, 0 100%)">{{ c }}</span>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <StudioReasons :studio-name="s.name" />

    <!-- Schedule -->
    <section class="section" aria-labelledby="schedule-title">
      <div class="container-x">
        <DisplayTitle text="SCHEDULE" tag="p" class="text-center" />
        <h2 id="schedule-title" class="mt-5 text-balance text-center text-xl text-ink sm:text-2xl">{{ s.name }} lesson schedule</h2>
        <div class="mx-auto mt-10 max-w-[1000px]">
          <StudioSchedule :lessons="s.schedule" />
          <p class="mt-4 text-xs text-ink-mute">*Schedules are subject to change. Please contact the studio for the latest availability.</p>
        </div>
        <div class="mt-8 text-center">
          <SkewButton to="/freetrial" color="coral" size="lg">Free Trial at {{ s.name }}</SkewButton>
        </div>
      </div>
    </section>

    <!-- User's voice -->
    <section class="section bg-paper" aria-labelledby="voice-title">
      <div class="container-x">
        <DisplayTitle text="USER'S VOICE" tag="p" class="text-center" />
        <h2 id="voice-title" class="mt-5 text-balance text-center text-xl text-ink sm:text-2xl">{{ voiceTitle }}</h2>
        <ul class="mt-10 grid gap-6 md:grid-cols-3">
          <li v-for="v in voices" :key="v.name">
            <ChamferCard tag="figure" body-class="flex h-full flex-col p-6">
              <div class="flex items-center gap-3">
                <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lilac text-brand-purple"><Icon name="user" class="h-6 w-6" /></span>
                <figcaption>
                  <p class="text-sm text-ink">{{ v.name }}</p>
                  <p class="mt-0.5 text-[11px] text-ink-mute">{{ v.meta }} / {{ genreLabel(v.genre) }}</p>
                </figcaption>
              </div>
              <blockquote class="mt-4 text-[13px] leading-relaxed text-ink-soft">{{ v.text }}</blockquote>
            </ChamferCard>
          </li>
        </ul>
        <div class="mt-10 text-center"><SkewButton to="/usersvoice">VIEW MORE</SkewButton></div>
      </div>
    </section>

    <!-- Q&A -->
    <section class="section" aria-labelledby="faq-title">
      <div class="container-x">
        <DisplayTitle text="Q&A" tag="p" class="text-center" />
        <h2 id="faq-title" class="mt-5 text-balance text-center text-xl text-ink sm:text-2xl">Frequently asked questions</h2>
        <p v-if="s.rich" class="mx-auto mt-4 max-w-[560px] text-balance text-center text-sm text-ink-soft">Questions about {{ s.name }} or how classes work? Feel free to ask us anytime.</p>
        <div class="mx-auto mt-10 max-w-[800px]"><StudioFaq :items="faqs" /></div>
      </div>
    </section>

    <!-- Recruit (rich only) -->
    <section v-if="s.rich" class="band py-12" aria-labelledby="recruit-title">
      <div class="container-x">
        <ChamferCard size="lg" class="mx-auto max-w-[800px]" body-class="flex flex-col items-center gap-6 px-6 py-8 text-center md:flex-row md:px-12 md:text-left">
          <div class="flex-1">
            <DisplayTitle text="RECRUIT" tag="p" class="!text-[28px] sm:!text-[34px]" />
            <h2 id="recruit-title" class="mt-3 text-balance text-lg text-ink">{{ s.name }} is hiring instructors!</h2>
            <p class="mt-2 text-[13px] leading-relaxed text-ink-soft">Join our team of educators<br class="hidden md:inline"> who help kids grow through dance.</p>
          </div>
          <SkewButton to="/instructors" color="coral">View Job Details</SkewButton>
        </ChamferCard>
      </div>
    </section>

    <!-- Nearby -->
    <section v-if="data!.nearby.length" class="section bg-paper-light" aria-labelledby="nearby-title">
      <div class="container-x">
        <h2 id="nearby-title" class="text-balance text-center text-xl tracking-wide text-ink">Other studios in {{ data!.prefecture.name }}</h2>
        <ul class="mx-auto mt-8 grid max-w-[900px] gap-5 md:grid-cols-2">
          <li v-for="n in data!.nearby" :key="n.id"><StudioCard :studio="n" /></li>
        </ul>
        <div class="mt-8 text-center"><SkewButton :to="`/access/${data!.prefecture.slug}`" color="white" class="border border-brand-sky">All Studios in {{ data!.prefecture.name }}</SkewButton></div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
