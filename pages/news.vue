<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        最新情報
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        ニュース ＆ <span class="gradient-text">お知らせ</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        キャンペ－ン情報、新スタジオオープン、発表会やワークショップのお知らせ。
      </p>
    </div>

    <!-- News List -->
    <div class="space-y-4 max-w-4xl mx-auto">
      <div v-for="item in newsList" :key="item.id" class="glass-card p-6 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 group cursor-pointer hover:border-pink-500/40 transition">
        <div class="space-y-2">
          <div class="flex items-center space-x-3 text-xs">
            <span class="text-slate-400 font-medium">{{ item.date }}</span>
            <span :class="['px-2.5 py-0.5 rounded-full font-bold', item.categoryBadge]">
              {{ item.category }}
            </span>
          </div>
          <h3 class="text-base sm:text-lg font-bold text-white group-hover:text-pink-400 transition">
            {{ item.title }}
          </h3>
        </div>
        <div class="text-xs font-bold text-pink-400 flex items-center gap-1 shrink-0">
          <span>詳細を見る</span>
          <span>→</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
const newsList = [
  {
    id: 1,
    date: '2026.03.15',
    category: 'キャンペーン',
    categoryBadge: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
    title: '【春の特別企画】入会金半額＆レッスンウェア・ダンスシューズ全プレキャンペーン開催！'
  },
  {
    id: 2,
    date: '2026.03.01',
    category: 'スタジオオープン',
    categoryBadge: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    title: '【新店舗】EYS-Kids 秋葉原第2フラッグシップスタジオが4月にグランドオープン！'
  },
  {
    id: 3,
    date: '2026.02.20',
    category: 'イベント',
    categoryBadge: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    title: '【発表会】EYS KIDS DANCE FESTIVAL 2026 SUMMER 舞浜アンフィシアター開催決定！'
  },
  {
    id: 4,
    date: '2026.02.05',
    category: 'システム案内',
    categoryBadge: 'bg-slate-800 text-slate-300',
    title: '保護者マイページの成長分析機能「4 KARTE」にレッスン動画ダウンロード機能を追加しました。'
  }
]
</script>
