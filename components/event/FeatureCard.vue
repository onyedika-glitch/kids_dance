<script setup lang="ts">
import { eventDate, eventStatus, eventTypeLabel, type EventItem } from '~/data/events'

// Large "Pick Up" event with a typographic key visual (Event-lists.png, top row)
const props = defineProps<{ event: EventItem }>()
const d = computed(() => eventDate(props.event))
const status = computed(() => eventStatus(props.event))
const type = computed(() => eventTypeLabel(props.event.type))
const subjects = [
  { label: 'English', c: '#FF8A6A' },
  { label: 'Music', c: '#5FB4C6' },
  { label: 'Art', c: '#A884EE' },
  { label: 'Coding', c: '#6F8CF2' },
  { label: 'Dance', c: '#4CC08A' },
]
</script>

<template>
  <article class="flex h-full flex-col text-center">
    <p class="font-display text-[28px] font-bold leading-none text-ink sm:text-[30px]"><time :datetime="event.start">{{ d.date }}</time></p>
    <p class="mt-1 font-display text-base text-ink">{{ d.week }}</p>
    <EventStatusPills :event="event" class="mt-3" />

    <NuxtLink :to="`/events/${event.id}`" class="relative mt-6 block" :aria-label="`${event.title}: details`">
      <!-- The Rolling King's Magic -->
      <div v-if="event.theme === 'craft'" class="relative mx-auto aspect-[36/20] max-w-[440px]">
        <svg class="absolute inset-0 h-full w-full" viewBox="0 0 360 200" fill="none" stroke="#fff" stroke-width="2" aria-hidden="true">
          <path d="M4 90c60-40 130-50 170-40M186 48c60 10 120 30 170 58M40 10c30 40 30 110 10 180M320 20c-40 50-40 120-10 170M90 200c30-40 80-60 150-50" />
        </svg>
        <span class="absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#D4C22E] px-8 py-1.5 text-xs text-white sm:text-sm">{{ event.category }}</span>
        <p class="craft-title absolute inset-x-0 top-[19%] whitespace-nowrap font-black leading-[0.95] text-[#D4C22E]" aria-hidden="true">
          <span class="block"><span class="text-[22px] sm:text-[28px]">The </span><span class="text-[36px] sm:text-[46px]">Rolling</span></span>
          <span class="block"><span class="text-[36px] sm:text-[46px]">King's Magic</span></span>
        </p>
        <p class="absolute left-1/2 top-[64%] w-[62%] -translate-x-1/2 rounded-full bg-white px-4 py-2 text-left text-[10px] leading-snug text-ink shadow-[0_1px_4px_rgba(0,0,0,.08)]">
          {{ event.instructor }}
        </p>
        <span class="absolute bottom-0 left-[38%] rounded-full bg-[#D4C22E] px-5 py-1 font-display text-xs text-white">{{ event.tag }}</span>
      </div>

      <!-- Halloween Autumn School -->
      <div v-else class="relative mx-auto aspect-[36/20] max-w-[440px] overflow-hidden rounded-[999px] bg-[#F4A23A] shadow-[0_6px_14px_rgba(0,0,0,.15)]">
        <svg class="absolute -left-2 -top-2 w-[34%]" viewBox="0 0 100 80" fill="none" stroke="#5A4A3A" stroke-width="1.4" aria-hidden="true">
          <path d="M0 0l90 70M0 0l50 78M0 0l96 30M0 0l20 80M12 9c6 4 8 8 6 14M24 18c10 3 14 10 12 20M38 29c12 3 18 14 16 26M28 5c3 8 1 12-5 16M50 12c3 10-1 16-10 21M70 20c2 12-4 18-16 22" />
        </svg>
        <svg class="absolute -bottom-2 -right-2 w-[30%] rotate-180" viewBox="0 0 100 80" fill="none" stroke="#5A4A3A" stroke-width="1.4" aria-hidden="true">
          <path d="M0 0l90 70M0 0l50 78M0 0l96 30M0 0l20 80M12 9c6 4 8 8 6 14M24 18c10 3 14 10 12 20M38 29c12 3 18 14 16 26M28 5c3 8 1 12-5 16M50 12c3 10-1 16-10 21" />
        </svg>
        <svg class="absolute right-[10%] top-[12%] w-[16%]" viewBox="0 0 60 40" fill="#4A3F55" aria-hidden="true">
          <path d="M20 14c3-4 6-4 8 0 2-4 5-4 8 0l8-6-2 10 8 2-10 4c-2 6-6 8-12 8s-10-2-12-8L6 20l8-2-2-10Z" />
          <circle cx="52" cy="30" r="1" />
        </svg>
        <span class="absolute left-1/2 top-[6%] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#D83A2B] px-6 py-1 text-xs text-white sm:text-sm">{{ event.category }}</span>
        <p class="absolute inset-x-0 top-[19%] font-display leading-none text-[#E44A3A]" aria-hidden="true">
          <span class="halloween-title block text-[40px] font-medium tracking-wide sm:text-[52px]">Halloween</span>
          <span class="mt-0.5 block text-[15px] font-medium text-white sm:text-lg">{{ event.title }}</span>
        </p>
        <div class="absolute inset-x-0 top-[57%] flex h-[27%] items-center justify-center gap-1.5 bg-[#FBE6C6] px-3 sm:gap-2">
          <template v-for="(s, i) in subjects" :key="s.label">
            <span v-if="i === 1" class="text-base font-bold text-[#D83A2B]" aria-hidden="true">×</span>
            <span class="grid aspect-square w-[14%] max-w-[50px] place-items-center rounded-full text-[8px] leading-tight text-white sm:text-[10px]" :style="{ backgroundColor: s.c }">{{ s.label }}</span>
          </template>
        </div>
        <span class="absolute bottom-[3%] left-1/2 -translate-x-1/2 rounded-full bg-[#D4C22E] px-5 py-0.5 font-display text-xs text-white">{{ event.tag }}</span>
      </div>
      <EventStamp v-if="status.full" class="absolute left-1/2 top-[40%] -translate-x-1/2" />
    </NuxtLink>

    <h3 class="mt-5 text-lg font-medium text-ink">
      <NuxtLink :to="`/events/${event.id}`" class="hover:text-brand-blue">{{ event.title }}</NuxtLink>
    </h3>
    <EventOrganizer :studio="event.studio" :color="type.color" class="mx-auto mt-3" />
    <p class="mt-4 flex-1 text-left text-[13px] leading-relaxed text-ink-soft">{{ event.summary }}</p>
    <p class="mt-2 flex items-start gap-2 text-left text-xs text-ink-soft">
      <span class="mt-0.5 grid h-4 w-4 shrink-0 place-items-center rounded-full bg-paper text-[9px] text-ink-mute" aria-hidden="true">¥</span>
      <span><span class="sr-only">Fee: </span>{{ event.price }}</span>
    </p>
    <div class="mt-5">
      <SkewButton v-if="!status.full" :to="`/events/${event.id}`" size="sm">Book This Event</SkewButton>
      <span v-else class="skew-box inline-flex h-9 items-center bg-paper px-6 text-xs text-ink-mute" aria-disabled="true">Booking closed</span>
    </div>
  </article>
</template>

<style scoped>
.craft-title { -webkit-text-stroke: 7px #fff; paint-order: stroke fill; letter-spacing: -.02em; filter: drop-shadow(0 2px 2px rgba(0,0,0,.12)); }
.halloween-title { -webkit-text-stroke: 5px #fff; paint-order: stroke fill; }
</style>
