<script setup lang="ts">
const route = useRoute()
const id = String(route.params.id)
const { data, error } = await useFetch(`/api/courses/${id}`)
if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })
}

const genre = computed(() => data.value!.genre)
const classes = computed(() => data.value!.classes)
const ageGroups = computed(() => data.value!.ageGroups)

useSeoMeta({
  title: () => `${genre.value.nameJa} Classes`,
  description: () => `${genre.value.catch} ${genre.value.description.slice(0, 120)}…`,
})

const heroEn = computed(() => genre.value.name.replace(' Dance', '').replace('\' / Acrobatics', '\''))
const ageLabels = computed(() => genre.value.ages.map(a => ageGroups.value.find(g => g.id === a)).filter(Boolean))
const minPrice = computed(() => Math.min(...classes.value.map(c => c.price)))
const facts = computed(() => [
  { label: 'Ages', value: ageLabels.value.map(a => `${a!.label} (${a!.note})`).join('\n') },
  { label: 'Monthly fee', value: `From ¥${minPrice.value.toLocaleString('en-US')}/month (tax incl.)` },
  { label: 'Lessons', value: '4 lessons/month, 50–75 min each (fixed weekly schedule)\nMissed a lesson? Swap it for a free make-up lesson.' },
  { label: 'Music', value: genre.value.music },
  { label: 'What to wear & bring', value: `${genre.value.wear}. Please also bring a drink and a towel.` },
])
</script>

<template>
  <div>
    <PageHero
      :en="heroEn"
      :title="`${genre.nameJa} Classes`"
      image="/images/courses/hero.webp"
      alt="Kids dancing at EYS-Kids Dance Academy"
      :crumbs="[{ label: 'Courses', to: '/courses' }, { label: genre.nameJa }]"
    />

    <section class="section" aria-labelledby="genre-intro">
      <div class="container-x grid items-center gap-10 md:grid-cols-[320px_1fr] md:gap-14">
        <div class="mx-auto w-full max-w-[300px]">
          <HexFrame :color="genre.color" :image="genre.image" :alt="`Kids in a ${genre.nameJa} class`" />
          <p class="skew-box relative -mt-6 py-2 text-center text-sm font-medium text-white" :style="{ backgroundColor: genre.color }">{{ genre.name }}</p>
        </div>
        <div>
          <p class="inline-block px-3 py-1 text-xs font-medium text-white" :style="{ backgroundColor: genre.color }">{{ genre.core ? 'Core Genre' : 'Optional Genre' }}</p>
          <h2 id="genre-intro" class="mt-4 text-xl font-medium leading-relaxed text-ink sm:text-2xl">{{ genre.catch }}</h2>
          <p class="mt-4 text-sm leading-[2] text-ink-soft sm:text-[15px]">{{ genre.description }}</p>
          <h3 class="mt-8 text-sm font-bold text-ink">What your child will learn</h3>
          <ol class="mt-3 space-y-2">
            <li v-for="(p, i) in genre.points" :key="p" class="flex items-center gap-3 text-sm text-ink">
              <span class="hex-clip flex h-7 w-8 shrink-0 items-center justify-center font-display text-xs font-bold text-white" :style="{ backgroundColor: genre.color }">{{ i + 1 }}</span>
              {{ p }}
            </li>
          </ol>
        </div>
      </div>
    </section>

    <section class="section bg-paper" aria-labelledby="genre-facts">
      <div class="container-x">
        <ChamferCard size="lg" body-class="px-5 py-10 sm:px-12">
          <h2 id="genre-facts" class="text-center text-lg font-medium text-ink sm:text-xl">Lesson overview</h2>
          <dl class="mx-auto mt-6 max-w-[720px] divide-y divide-paper border-y border-paper text-sm">
            <div v-for="f in facts" :key="f.label" class="grid gap-1 py-4 sm:grid-cols-[10em_1fr] sm:gap-4">
              <dt class="font-bold" :style="{ color: genre.color }">{{ f.label }}</dt>
              <dd class="whitespace-pre-line leading-relaxed text-ink">{{ f.value }}</dd>
            </div>
          </dl>
          <p class="mt-6 text-center text-xs text-ink-mute">For full pricing, including the enrollment fee, see <NuxtLink to="/pricing" class="text-brand-sky underline underline-offset-2">Plans &amp; Pricing</NuxtLink>.</p>
        </ChamferCard>
      </div>
    </section>

    <section class="section bg-paper-light" aria-label="Classes">
      <div class="container-x">
        <SectionHeading en="CLASS" :title="`${genre.nameJa} Classes`" lead="Classes for every age and level." />
        <ul class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li v-for="c in classes" :id="c.id" :key="c.id" class="scroll-mt-24">
            <CoursesClassCard :item="c" :genre="genre" :age-groups="ageGroups" :axes="data!.radarAxes" trial />
          </li>
        </ul>
      </div>
    </section>

    <section class="section" aria-label="Other genres">
      <div class="container-x">
        <CoursesGenreList :genres="data!.others" title="Explore Other Genres" />
        <div class="mt-10 text-center">
          <SkewButton to="/courses" color="white" class="border border-brand-sky">Back to All Courses</SkewButton>
        </div>
      </div>
    </section>

    <FreeTrialCta />
  </div>
</template>
