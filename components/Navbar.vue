<template>
  <header class="sticky top-0 z-50 transition-all duration-300">
    <!-- Top Announcement Bar -->
    <div class="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white text-xs md:text-sm py-2 px-4 font-medium text-center flex items-center justify-between">
      <div class="hidden sm:block text-slate-200 text-xs">✨ 日本最大級のキッズダンススクール</div>
      <div class="flex-1 text-center font-bold tracking-wide">
        🎁 <span class="underline decoration-pink-300 decoration-2">春の入会特別キャンペーン</span>！ダンスウェア＆レッスンシューズ全員プレゼント！
      </div>
      <div class="hidden md:flex items-center space-x-3 text-xs">
        <a href="tel:0120-834-210" class="hover:text-pink-200 transition">📞 0120-834-210 (9:00-21:00)</a>
      </div>
    </div>

    <!-- Main Navigation Bar -->
    <nav class="bg-slate-900/95 backdrop-blur-md border-b border-slate-800/80 px-4 lg:px-8 py-3.5">
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        
        <!-- Logo -->
        <NuxtLink to="/" class="flex items-center space-x-3 group">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 p-0.5 shadow-lg shadow-pink-500/20 group-hover:scale-105 transition-transform duration-300">
            <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-tr from-pink-400 to-indigo-400 text-xl">
              EYS
            </div>
          </div>
          <div>
            <div class="font-extrabold text-lg md:text-xl tracking-tight text-white flex items-center gap-1.5">
              EYS-Kids <span class="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400 border border-pink-500/30 font-semibold">DANCE</span>
            </div>
            <div class="text-[10px] text-slate-400 tracking-wider">KIDS DANCE ACADEMY</div>
          </div>
        </NuxtLink>

        <!-- Desktop Links -->
        <div class="hidden xl:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-slate-300">
          <NuxtLink to="/" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">ホーム</NuxtLink>
          <NuxtLink to="/courses" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">コース一覧</NuxtLink>
          <NuxtLink to="/curriculum" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">カリキュラム</NuxtLink>
          <NuxtLink to="/pricing" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">料金プラン</NuxtLink>
          <NuxtLink to="/instructors" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">講師紹介</NuxtLink>
          <NuxtLink to="/access" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">スタジオ案内</NuxtLink>
          <NuxtLink to="/events" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">イベント</NuxtLink>
          <NuxtLink to="/usersvoice" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">保護者の声</NuxtLink>
          <NuxtLink to="/safety" active-class="text-pink-400 font-bold bg-pink-500/10" class="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition">安心対策</NuxtLink>
        </div>

        <!-- CTA Buttons -->
        <div class="hidden sm:flex items-center space-x-3">
          <NuxtLink to="/freetrial" class="relative group overflow-hidden rounded-xl p-[2px] font-bold text-sm">
            <span class="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-xl group-hover:opacity-90 transition"></span>
            <span class="relative block px-5 py-2.5 rounded-[10px] bg-slate-950 text-white group-hover:bg-transparent transition duration-300 flex items-center gap-2">
              <span>無料体験レッスン</span>
              <span class="text-xs bg-pink-500 text-white px-1.5 py-0.5 rounded font-black animate-pulse">0円</span>
            </span>
          </NuxtLink>
        </div>

        <!-- Mobile Menu Toggle Button -->
        <button @click="mobileMenuOpen = !mobileMenuOpen" class="xl:hidden p-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 focus:outline-none">
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Navigation Drawer -->
      <transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-4" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in" leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-4">
        <div v-if="mobileMenuOpen" class="xl:hidden mt-4 pt-4 border-t border-slate-800 space-y-2 pb-4">
          <div class="grid grid-cols-2 gap-2 text-sm font-medium">
            <NuxtLink @click="mobileMenuOpen = false" to="/" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>🏠 ホーム</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/courses" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>💃 コース一覧</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/curriculum" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>📚 カリキュラム</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/pricing" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>💰 料金プラン</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/instructors" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>👨‍🏫 講師紹介</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/access" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>📍 スタジオ案内</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/events" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>🎪 イベント</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/usersvoice" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>💬 保護者の声</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/safety" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>🛡️ 安心対策</span>
            </NuxtLink>
            <NuxtLink @click="mobileMenuOpen = false" to="/news" class="p-3 rounded-xl bg-slate-800/60 hover:bg-slate-800 text-slate-200 flex items-center space-x-2">
              <span>📰 ニュース</span>
            </NuxtLink>
          </div>
          <div class="pt-3">
            <NuxtLink @click="mobileMenuOpen = false" to="/freetrial" class="block w-full py-3.5 text-center font-bold text-white rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 shadow-lg shadow-pink-500/25">
              🎉 無料体験レッスンに申し込む (完全無料)
            </NuxtLink>
          </div>
        </div>
      </transition>
    </nav>
  </header>
</template>

<script setup>
import { ref } from 'vue'

const mobileMenuOpen = ref(false)
</script>
