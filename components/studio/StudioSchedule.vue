<script setup lang="ts">
import { genres, weekdays, type GenreId, type Lesson, type Weekday } from '~/data/studios'

// Weekly timetable: 7-column grid on desktop, day tabs on mobile
const props = defineProps<{ lessons: Lesson[] }>()

const colors: Record<GenreId, string> = {
  hiphop: '#0079E4', jazz: '#E86BB0', kids: '#FF9300', theme: '#A66BF0', lock: '#13B5B1',
  contemporary: '#8DC21F', house: '#0FA8E0', cheer: '#FF5860', breakin: '#F2C230',
}
const label = (g: GenreId) => genres.find(x => x.id === g)!.label.replace('\n', ' ')
const byDay = computed(() => Object.fromEntries(weekdays.map(d => [d, props.lessons.filter(l => l.day === d)])) as Record<Weekday, Lesson[]>)
const firstDay = weekdays.find(d => props.lessons.some(l => l.day === d)) ?? 'Mon'
const day = ref<Weekday>(firstDay)
const dayColor = (d: Weekday) => d === 'Sat' ? 'bg-brand-blue' : d === 'Sun' ? 'bg-brand-coral' : 'bg-brand-sky'
</script>

<template>
  <div>
    <!-- mobile tabs -->
    <div class="grid grid-cols-7 gap-1 md:hidden" role="tablist" aria-label="Day of the week">
      <button v-for="d in weekdays" :id="`day-tab-${d}`" :key="d" type="button" role="tab" :aria-selected="day === d" aria-controls="day-panel"
        class="h-11 text-sm transition-colors" :class="day === d ? `${dayColor(d)} text-white` : 'bg-paper-light text-ink'" @click="day = d">
        {{ d }}
      </button>
    </div>
    <ul id="day-panel" role="tabpanel" :aria-labelledby="`day-tab-${day}`" class="mt-3 space-y-2 md:hidden">
      <li v-for="l in byDay[day]" :key="l.start" class="flex items-center gap-3 border-l-4 bg-white p-3 shadow-[0_2px_6px_rgba(0,0,0,0.08)]" :style="{ borderColor: colors[l.genre] }">
        <span class="font-display text-sm text-ink">{{ l.start }}<span class="text-ink-mute">–{{ l.end }}</span></span>
        <span class="text-sm font-medium" :style="{ color: colors[l.genre] }">{{ label(l.genre) }}</span>
        <span class="ml-auto text-right text-xs text-ink-soft">{{ l.level }}</span>
      </li>
      <li v-if="!byDay[day].length" class="bg-paper-light p-6 text-center text-sm text-ink-mute">No lessons on this day</li>
    </ul>

    <!-- desktop grid -->
    <div class="hidden grid-cols-7 gap-2 md:grid">
      <div v-for="d in weekdays" :key="d" class="flex flex-col">
        <p class="py-2 text-center text-sm text-white" :class="dayColor(d)">{{ d }}</p>
        <ul class="mt-2 flex flex-1 flex-col gap-2">
          <li v-for="l in byDay[d]" :key="l.start" class="border-t-4 bg-white px-2 py-2.5 text-center shadow-[0_2px_6px_rgba(0,0,0,0.08)]" :style="{ borderColor: colors[l.genre] }">
            <p class="font-display text-xs text-ink">{{ l.start }}–{{ l.end }}</p>
            <p class="mt-1 text-[13px] font-medium leading-tight" :style="{ color: colors[l.genre] }">{{ label(l.genre) }}</p>
            <p class="mt-1 text-[11px] text-ink-soft">{{ l.level }}</p>
          </li>
          <li v-if="!byDay[d].length" class="flex flex-1 items-center justify-center bg-paper-light py-6 text-xs text-ink-mute">No classes</li>
        </ul>
      </div>
    </div>
  </div>
</template>
