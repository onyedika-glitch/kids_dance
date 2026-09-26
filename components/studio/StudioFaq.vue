<script setup lang="ts">
// FAQ accordion (one open at a time)
const props = defineProps<{ items: { q: string, a: string }[] }>()
const open = ref<number | null>(0)
const uid = useId()
</script>

<template>
  <ul class="space-y-3">
    <li v-for="(f, i) in props.items" :key="f.q" class="bg-white shadow-[0_2px_6px_rgba(0,0,0,0.08)]">
      <h3>
        <button :id="`${uid}-q${i}`" type="button" class="flex min-h-[56px] w-full items-center gap-4 px-4 py-3 text-left sm:px-6" :aria-expanded="open === i" :aria-controls="`${uid}-a${i}`" @click="open = open === i ? null : i">
          <span class="font-display text-xl font-semibold text-brand-sky" aria-hidden="true">Q</span>
          <span class="flex-1 text-sm text-ink sm:text-[15px]">{{ f.q }}</span>
          <Icon :name="open === i ? 'minus' : 'plus'" class="h-5 w-5 shrink-0 text-brand-sky" />
        </button>
      </h3>
      <div v-show="open === i" :id="`${uid}-a${i}`" role="region" :aria-labelledby="`${uid}-q${i}`" class="flex gap-4 border-t border-paper px-4 py-4 sm:px-6">
        <span class="font-display text-xl font-semibold text-brand-coral" aria-hidden="true">A</span>
        <p class="flex-1 text-sm leading-relaxed text-ink-soft">{{ f.a }}</p>
      </div>
    </li>
  </ul>
</template>
