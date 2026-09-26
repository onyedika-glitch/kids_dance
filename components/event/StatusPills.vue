<script setup lang="ts">
import { eventStatus, type EventItem } from '~/data/events'

const props = defineProps<{ event: Pick<EventItem, 'remaining'> }>()
const status = computed(() => eventStatus(props.event))
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-2 text-[11px] leading-none">
    <span v-if="status.full" class="rounded-full bg-white px-3 py-1.5 text-ink-mute shadow-[0_1px_3px_rgba(0,0,0,.08)]">Booking closed</span>
    <template v-else>
      <span class="rounded-full bg-white px-3 py-1.5 text-brand-sky shadow-[0_1px_3px_rgba(0,0,0,.08)]">Open for booking</span>
      <span v-if="status.few" class="rounded-full bg-white px-3 py-1.5 text-brand-orange shadow-[0_1px_3px_rgba(0,0,0,.08)]">Few spots left: {{ event.remaining }}</span>
    </template>
  </div>
</template>
