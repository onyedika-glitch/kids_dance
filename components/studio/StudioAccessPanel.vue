<script setup lang="ts">
import { mapUrl, type Studio } from '~/data/studios'

// Expanded "Access info" panel (roll.png / explore.png): manager, info, map, route, parking,
// facilities (ved.png), interactive floor map (loge.png) and rooms (jed.png).
const props = defineProps<{ studio: Studio }>()
defineEmits<{ close: [] }>()

const s = computed(() => props.studio)
const room = ref(s.value.floorPlan?.rooms[0])
</script>

<template>
  <div class="bg-paper px-4 pb-10 pt-10 shadow-[inset_0_8px_8px_-6px_rgba(0,0,0,0.12)] sm:px-5 md:pb-12 md:pt-12">
    <h2 id="studio-access" class="text-center text-lg tracking-wide text-ink sm:text-xl">How to Get to {{ s.name }}</h2>

    <div class="mt-8 grid gap-6 md:grid-cols-2 md:gap-6">
      <!-- manager + info -->
      <div class="flex gap-3 sm:gap-4">
        <img v-if="s.manager" :src="s.manager.image" :alt="`${s.manager.name}, ${s.manager.role}`" width="131" height="400" loading="lazy" decoding="async"
          class="hidden h-auto w-[90px] shrink-0 self-end mix-blend-multiply sm:block md:w-[100px]">
        <div class="min-w-0 flex-1">
          <figure v-if="s.manager" class="relative bg-white p-4 text-xs leading-relaxed text-ink shadow-[0_3px_8px_rgba(0,0,0,0.12)] sm:p-5">
            <span class="absolute -left-2 top-6 hidden h-4 w-4 rotate-45 bg-white sm:block" aria-hidden="true" />
            <blockquote class="space-y-3">
              <p v-for="(m, i) in s.manager.message" :key="i" class="whitespace-pre-line">{{ m }}</p>
            </blockquote>
            <figcaption class="mt-3 text-right text-[10px] text-ink-soft"><span class="mr-2 text-xs text-ink">{{ s.manager.name }}</span>{{ s.manager.role }}</figcaption>
          </figure>
          <dl class="mt-5 grid grid-cols-[5em_1fr] gap-x-3 gap-y-2 text-xs leading-relaxed text-ink">
            <dt class="font-medium">Address</dt>
            <dd>{{ s.address }} <span class="whitespace-nowrap">{{ s.postal }}</span><template v-if="s.addressNote"><br>{{ s.addressNote }}</template></dd>
            <dt class="font-medium">Access</dt><dd>{{ s.access }}</dd>
            <dt class="font-medium">Contact</dt>
            <dd>Phone: <a :href="`tel:${s.phone.replace(/-/g, '')}`" class="hover:text-brand-sky">{{ s.phone }}</a></dd>
            <dt class="font-medium">Hours</dt>
            <dd>{{ s.hours.weekday }}<br>{{ s.hours.weekend }}<br>{{ s.hours.closed }}</dd>
          </dl>
        </div>
      </div>
      <!-- map -->
      <div class="flex flex-col">
        <StudioMap :points="[{ id: s.id, name: s.name, lat: s.lat, lng: s.lng, address: s.address, access: s.access }]" :label="`Map of the area around ${s.name}`" :link="false" class="aspect-[459/400] w-full flex-1" />
        <a :href="mapUrl(s)" target="_blank" rel="noopener" class="relative flex h-10 items-center justify-center bg-brand-sky text-xs text-white hover:bg-[#1c98c8]">
          View Larger Map<span class="sr-only"> (opens Google Maps in a new tab)</span>
          <svg viewBox="0 0 16 16" class="absolute right-3 h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M9 2h5v5M14 2 7 9M12 10v4H2V4h4" /></svg>
        </a>
      </div>
    </div>

    <!-- route + parking -->
    <div v-if="s.routes?.length || s.parking?.length" class="mt-6 grid gap-6 md:grid-cols-2">
      <section v-if="s.routes?.length" class="bg-paper-light p-3 sm:p-4" aria-labelledby="route-title">
        <h3 id="route-title" class="text-balance text-center text-xs text-ink">{{ s.routeTitle }}</h3>
        <ol class="mt-3 grid grid-cols-2 gap-x-2.5 gap-y-4">
          <li v-for="(r, i) in s.routes" :key="i">
            <div class="relative">
              <img :src="r.image" :alt="`Route step ${i + 1}`" width="209" height="174" loading="lazy" decoding="async" class="aspect-[209/174] w-full object-cover">
              <span class="absolute left-0 top-0 grid h-8 w-8 place-items-center bg-brand-sky font-display text-sm font-semibold italic text-white" aria-hidden="true">{{ i + 1 }}</span>
            </div>
            <p class="mt-1.5 text-[11px] leading-relaxed text-ink">{{ r.text }}</p>
          </li>
        </ol>
      </section>
      <section v-if="s.parking?.length" class="bg-paper-light p-3 sm:p-4" aria-labelledby="parking-title">
        <h3 id="parking-title" class="text-center text-xs text-ink">Coming by car? Nearby parking</h3>
        <ul class="mt-3 grid gap-2.5 sm:grid-cols-2 md:grid-cols-1">
          <li v-for="p in s.parking" :key="p.name">
            <a :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.name + ' ' + s.address)}`" target="_blank" rel="noopener" class="flex h-full items-center gap-3 bg-white px-3 py-3 text-[11px] leading-relaxed text-ink shadow-[0_2px_6px_rgba(0,0,0,0.08)] transition hover:text-brand-sky">
              <span class="grid h-9 w-9 shrink-0 place-items-center bg-brand-blue font-display text-base font-bold text-white" aria-hidden="true">P</span>
              <span class="flex-1">{{ p.name }}<br><span class="text-ink-soft">{{ p.walk }}</span></span>
              <Icon name="pin" class="h-4 w-4 shrink-0 text-brand-coral" /><span class="sr-only"> (open in Google Maps)</span>
            </a>
          </li>
        </ul>
      </section>
    </div>

    <!-- facilities -->
    <section v-if="s.facilities?.length" class="mt-14 text-center md:mt-16" aria-labelledby="fac-title">
      <h3 id="fac-title" class="text-balance text-lg leading-relaxed tracking-wide text-ink">{{ s.facilitiesTitle }}</h3>
      <p class="mx-auto mt-4 max-w-[640px] text-xs leading-loose text-ink-soft">{{ s.facilitiesLead }}</p>
      <ul class="mx-auto mt-6 grid max-w-[560px] gap-5 text-left sm:grid-cols-2 sm:gap-6">
        <li v-for="f in s.facilities" :key="f.image" class="bg-white shadow-[0_3px_8px_rgba(0,0,0,0.14)]">
          <div class="relative">
            <img :src="f.image" alt="" width="334" height="178" loading="lazy" decoding="async" class="aspect-[334/178] w-full object-cover">
            <svg class="absolute -bottom-px left-0 h-4 w-full" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true"><path d="M0 10 100 0v10Z" fill="#fff" /></svg>
          </div>
          <p class="px-4 pb-5 pt-3 text-[11px] leading-loose text-ink">{{ f.text }}</p>
        </li>
      </ul>
    </section>

    <!-- floor map -->
    <section v-if="s.floorPlan && room" class="mt-14 text-center md:mt-16" aria-labelledby="floor-title">
      <h3 id="floor-title" class="text-lg tracking-wide text-ink">Floor Map</h3>
      <p class="mt-4 text-xs leading-loose text-ink-soft">Tap any room on the floor map<br>to see what it looks like inside.</p>
      <div class="mx-auto mt-6 grid max-w-[640px] items-start gap-5 sm:grid-cols-2">
        <div class="relative mx-auto w-full max-w-[320px]">
          <img :src="s.floorPlan.image" :alt="`Floor map of ${s.name}`" width="376" height="432" loading="lazy" decoding="async" class="w-full mix-blend-multiply">
          <button v-for="r in s.floorPlan.rooms" :key="r.id" type="button" class="absolute rounded-sm transition-colors hover:bg-brand-sky/15 focus-visible:bg-brand-sky/15"
            :class="room.id === r.id ? 'bg-brand-sky/20 ring-2 ring-brand-sky' : ''"
            :style="{ left: `${r.box[0]}%`, top: `${r.box[1]}%`, width: `${r.box[2]}%`, height: `${r.box[3]}%` }"
            :aria-pressed="room.id === r.id" :aria-label="`Show ${r.label}`" @click="room = r" />
        </div>
        <figure class="bg-white shadow-[0_3px_8px_rgba(0,0,0,0.14)]" aria-live="polite">
          <img :src="room.image" :alt="`${room.label} at ${s.name}`" width="389" height="339" loading="lazy" decoding="async" class="aspect-[389/339] w-full object-cover">
          <figcaption class="px-4 py-5">
            <span class="block font-display text-[10px] tracking-widest text-ink-mute">{{ room.en }}</span>
            <span class="mx-auto my-2 block h-px w-6 bg-ink-mute" aria-hidden="true" />
            <span class="block text-sm text-ink">{{ room.label }}</span>
          </figcaption>
        </figure>
      </div>
    </section>

    <!-- rooms -->
    <section v-if="s.rooms?.length" class="mt-14 text-center md:mt-16" aria-labelledby="rooms-title">
      <h3 id="rooms-title" class="text-balance text-lg tracking-wide text-ink">{{ s.name }} is packed with the latest features!</h3>
      <p class="mt-4 text-xs text-ink-soft">There's so much more than dance rooms, too!</p>
      <ul class="mx-auto mt-6 grid max-w-[560px] grid-cols-2 gap-4 sm:grid-cols-4">
        <li v-for="r in s.rooms" :key="r.en">
          <img :src="r.image" :alt="`${r.label} at ${s.name}`" width="169" height="168" loading="lazy" decoding="async" class="aspect-square w-full object-cover">
          <p class="mt-3 font-display text-[9px] tracking-widest text-ink-mute">{{ r.en }}</p>
          <span class="mx-auto my-1.5 block h-px w-6 bg-ink-mute" aria-hidden="true" />
          <p class="text-xs text-ink">{{ r.label }}</p>
        </li>
      </ul>
    </section>

    <div class="mt-12 text-center">
      <button type="button" class="skew-box group inline-block bg-brand-sky p-px" aria-controls="studio-access-panel" aria-expanded="true" @click="$emit('close')">
        <span class="skew-box flex h-11 min-w-[220px] items-center justify-center gap-10 bg-white px-8 text-sm text-brand-sky group-hover:bg-paper-light">
          Close<Icon name="chevron-up" class="h-4 w-4" />
        </span>
      </button>
    </div>
  </div>
</template>
