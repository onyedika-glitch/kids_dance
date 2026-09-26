<script setup lang="ts">
import { eventDate, eventStatus, eventTypeLabel, type EventItem } from '~/data/events'

// Date-headed event card from Event-lists.png / Plans.png
const props = defineProps<{ event: EventItem, headingTag?: string }>()
const d = computed(() => eventDate(props.event))
const status = computed(() => eventStatus(props.event))
const type = computed(() => eventTypeLabel(props.event.type))
</script>

<template>
  <article class="flex h-full flex-col text-center">
    <p class="font-display text-[26px] font-bold leading-none text-ink">
      <time :datetime="event.start">{{ d.date }}</time>
    </p>
    <p class="mt-1 font-display text-base text-ink">{{ d.week }}</p>
    <EventStatusPills :event="event" class="mt-3" />

    <NuxtLink :to="`/events/${event.id}`" class="group relative mx-auto mt-5 block w-[78%] max-w-[210px] focus-visible:rounded-[26px]" :aria-label="`${event.title}: details`">
      <div class="aspect-[4/5] overflow-hidden rounded-[26px] border-4 border-white bg-white shadow-[0_4px_10px_rgba(0,0,0,.12)]">
        <img v-if="event.image" :src="event.image" :alt="event.title" width="210" height="262" loading="lazy" decoding="async" class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105">
      </div>
      <span class="absolute -left-4 bottom-3 rounded-full bg-[#D4C22E] px-5 py-1 font-display text-xs text-white">{{ event.tag }}</span>
      <EventStamp v-if="status.full" class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
    </NuxtLink>

    <span class="mx-auto mt-4 max-w-full truncate rounded-full px-4 py-1 text-[11px] text-white" :style="{ backgroundColor: type.color }" :title="`${type.label} / ${event.category}`">{{ event.category }}</span>
    <component :is="headingTag || 'h3'" class="mt-3 text-left text-base font-medium leading-snug text-ink">
      <NuxtLink :to="`/events/${event.id}`" class="hover:text-brand-blue">{{ event.title }}</NuxtLink>
    </component>
    <EventOrganizer :studio="event.studio" :color="type.color" class="mt-3 pl-3" />
    <p class="mt-3 flex-1 text-left text-[13px] leading-relaxed text-ink-soft">{{ event.summary }}</p>
    <p class="mt-2 flex items-start gap-2 text-left text-xs text-ink-soft">
      <span class="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-paper text-[9px] text-ink-mute" aria-hidden="true">¥</span>
      <span><span class="sr-only">Fee: </span>{{ event.price }}</span>
    </p>
    <div class="mt-5">
      <SkewButton v-if="!status.full" :to="`/events/${event.id}`" size="sm" color="sky">Book This Event</SkewButton>
      <span v-else class="skew-box inline-flex h-9 items-center gap-3 bg-paper px-6 text-xs text-ink-mute" aria-disabled="true">
        Booking closed
      </span>
    </div>
  </article>
</template>
