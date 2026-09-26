<template>
  <div class="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-pink-500/40 transition duration-300">
    <div>
      <!-- Avatar Header -->
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-14 h-14 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5">
          <div class="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center font-extrabold text-xl text-pink-400">
            {{ instructor.name.charAt(0) }}
          </div>
        </div>
        <div>
          <h4 class="font-extrabold text-white text-lg group-hover:text-pink-400 transition">
            {{ instructor.name }}
          </h4>
          <div class="text-xs text-slate-400 font-medium">
            {{ instructor.genre }} 講師
          </div>
        </div>
      </div>

      <!-- Experience & Rating -->
      <div class="flex items-center justify-between bg-slate-950/60 p-2.5 rounded-xl border border-slate-800 text-xs mb-4">
        <span class="text-slate-300">指導歴: <strong class="text-white">{{ instructor.experience }}</strong></span>
        <span class="text-amber-400 font-bold">★ {{ instructor.rating }}</span>
      </div>

      <!-- Bio / Message -->
      <p class="text-slate-300 text-xs leading-relaxed mb-4">
        "{{ instructor.message }}"
      </p>

      <!-- Specialty Tags -->
      <div class="flex flex-wrap gap-1.5 mb-4 text-[10px]">
        <span v-for="tag in instructor.tags" :key="tag" class="px-2 py-0.5 rounded bg-pink-500/10 text-pink-300 border border-pink-500/20">
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Booking CTA -->
    <NuxtLink to="/freetrial" class="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-pink-500 text-slate-200 hover:text-white font-bold text-center text-xs transition duration-300">
      {{ instructor.name }}先生の体験レッスンを予約
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  instructor: {
    type: Object,
    default: () => ({
      name: 'YUKI',
      genre: 'HIP-HOP',
      experience: '8年',
      rating: '4.9',
      message: '笑顔と元気を大切に！ダンスが初めてのお子様も安心してついてこられる楽しいレッスンを心がけています。',
      tags: ['初心者得意', 'キッズコンテスト実績', '優しく指導']
    })
  }
})
</script>
