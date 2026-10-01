<script setup lang="ts">
import { earnCards } from '~/data/home'
</script>

<template>
  <section class="section bg-paper" aria-labelledby="earn-title">
    <div class="container-wide">
      <h2 id="earn-title" class="text-center text-2xl font-semibold text-ink sm:text-3xl">Help more little explorers learn</h2>
      <p class="mx-auto mt-3 max-w-[560px] text-center text-base leading-relaxed text-ink-soft">Our videos are free to watch. Sponsors and supporters keep them coming.</p>
      <ul class="mx-auto mt-10 grid max-w-[1000px] gap-6 md:grid-cols-2">
        <li v-for="c in earnCards" :key="c.to">
          <ChamferCard size="lg" class="h-full" body-class="flex h-full flex-col p-6 sm:p-8">
            <span class="grid h-14 w-14 place-items-center rounded-2xl text-white" :style="{ backgroundColor: c.color }" aria-hidden="true"><Icon :name="c.icon" class="h-7 w-7" /></span>
            <h3 class="mt-5 text-xl font-bold text-ink sm:text-2xl">{{ c.title }}</h3>
            <p class="mt-3 flex-1 text-base leading-relaxed text-ink-soft">{{ c.text }}</p>
            <div class="mt-6">
              <SkewButton :to="c.to" :color="c.to === '/support' ? 'coral' : 'sky'" class="w-full sm:w-auto">{{ c.cta }}</SkewButton>
            </div>
          </ChamferCard>
        </li>
      </ul>
    </div>
  </section>
</template>
