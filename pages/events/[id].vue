<script setup lang="ts">
import { eventDate, eventDateLong, eventStatus, eventTypeLabel, type EventItem } from '~/data/events'
import { site } from '~/data/site'

const route = useRoute()
const { data, error } = await useFetch<{ event: EventItem, related: EventItem[] }>(`/api/events/${route.params.id}`)
if (error.value || !data.value) {
  throw createError({ statusCode: 404, statusMessage: 'Not Found', fatal: true })
}

const ev = computed(() => data.value!.event)
const related = computed(() => data.value!.related)
const status = computed(() => eventStatus(ev.value))
const type = computed(() => eventTypeLabel(ev.value.type))
const d = computed(() => eventDate(ev.value))

useSeoMeta({
  title: () => `${ev.value.title} | Events`,
  description: () => ev.value.summary,
  ogImage: () => ev.value.image,
})

const rows = computed(() => [
  { label: 'Date', value: eventDateLong(ev.value) },
  { label: 'Time', value: ev.value.time },
  { label: 'Venue', value: ev.value.venue },
  { label: 'Who it\'s for', value: ev.value.target },
  { label: 'Fee', value: ev.value.price },
  { label: 'Capacity', value: `${ev.value.capacity} spots` },
  ...(ev.value.instructor ? [{ label: 'Instructor', value: ev.value.instructor.replace(/^Instructor: /, '') }] : []),
])
</script>

<template>
  <div class="bg-paper">
    <PageHero en="EVENT" :title="ev.title" image="/images/events/stage-class.webp" alt="Kids dancing in the studio" :crumbs="[{ label: 'Events', to: '/events' }, { label: ev.title }]" />

    <section class="section">
      <div class="container-x">
        <div class="grid gap-10 md:grid-cols-[1fr_300px]">
          <article>
            <div class="flex flex-wrap items-center gap-3">
              <span class="rounded-full px-4 py-1 text-xs text-white" :style="{ backgroundColor: type.color }">{{ type.label }} / {{ ev.category }}</span>
              <EventStatusPills :event="ev" class="!justify-start" />
            </div>
            <p class="mt-6 font-display text-[34px] font-bold leading-none text-ink">
              <time :datetime="ev.start">{{ d.date }}</time>
              <span class="ml-3 text-base font-normal">{{ d.week }}</span>
            </p>
            <p class="mt-6 text-base font-medium leading-relaxed text-ink">{{ ev.summary }}</p>
            <div class="mt-6 space-y-4 text-sm leading-loose text-ink-soft">
              <p v-for="(p, i) in ev.body" :key="i">{{ p }}</p>
            </div>

            <ul v-if="ev.highlights?.length" class="mt-8 grid gap-3 sm:grid-cols-2">
              <li v-for="h in ev.highlights" :key="h" class="flex items-center gap-3 bg-white px-4 py-3 text-sm text-ink [clip-path:polygon(0_0,100%_0,95%_100%,0_100%)]">
                <Icon name="check" class="h-4 w-4 shrink-0 text-brand-blue" />{{ h }}
              </li>
            </ul>

            <ChamferCard class="mt-10" body-class="p-6 sm:p-8">
              <h2 class="text-lg font-medium text-brand-blue">Event Details</h2>
              <dl class="mt-4 divide-y divide-paper text-sm">
                <div v-for="r in rows" :key="r.label" class="grid gap-1 py-3 sm:grid-cols-[120px_1fr] sm:gap-4">
                  <dt class="font-medium text-ink">{{ r.label }}</dt>
                  <dd class="text-ink-soft">{{ r.value }}</dd>
                </div>
              </dl>
            </ChamferCard>
          </article>

          <!-- Apply box -->
          <aside class="md:sticky md:top-24 md:self-start" aria-labelledby="apply-title">
            <ChamferCard body-class="p-6 text-center">
              <h2 id="apply-title" class="text-base font-medium text-ink">How to Book</h2>
              <div v-if="status.full" class="mt-5">
                <EventStamp />
                <p class="mt-4 text-sm leading-relaxed text-ink-soft">This event is fully booked. If a spot opens up, the studio will contact you.</p>
              </div>
              <template v-else>
                <p class="mt-3 text-sm text-ink-soft">
                  <span class="font-display text-2xl font-bold" :class="status.few ? 'text-brand-orange' : 'text-brand-sky'">{{ ev.remaining }}</span> {{ ev.remaining === 1 ? 'spot' : 'spots' }} left
                </p>
                <p class="mt-3 text-xs leading-relaxed text-ink-soft">Current students can book in the member app. New to EYS-Kids? Please book by phone.</p>
                <a :href="site.phoneHref" class="mt-5 flex items-center justify-center gap-2 text-brand-blue">
                  <FreeDialIcon class="h-4 w-7" /><span class="font-display text-xl font-bold">{{ site.phone }}</span>
                </a>
                <p class="text-[11px] text-ink-mute">Phone hours {{ site.hours }}</p>
              </template>
              <div class="mt-6 border-t border-paper pt-6">
                <p class="text-xs text-ink-soft">New to EYS-Kids?</p>
                <SkewButton to="/freetrial" color="coral" size="sm" class="mt-3">Free Trial Lesson</SkewButton>
              </div>
            </ChamferCard>
            <NuxtLink to="/events" class="mt-6 flex items-center justify-center gap-2 text-sm text-brand-blue hover:underline">
              <Icon name="chevron-left" class="h-3.5 w-3.5" />Back to all events
            </NuxtLink>
          </aside>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="bg-lilac pb-16 md:pb-20" aria-labelledby="related-title">
      <h2 id="related-title" class="band py-2 text-center text-lg font-medium text-white">More {{ type.label }}</h2>
      <ul class="container-x mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="e in related" :key="e.id"><EventCard :event="e" /></li>
      </ul>
    </section>

    <FreeTrialCta />
  </div>
</template>
