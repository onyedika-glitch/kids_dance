<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-wider">
        人気＆成長度
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        EYS-Kids <span class="gradient-text">人気コース＆成長ランキング</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        今月もっとも人気のあるダンスジャンルと、スキルアップした生徒たちの努力の記録！
      </p>
    </div>

    <!-- Leaderboard Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Rank 1 -->
      <div class="glass-panel p-6 rounded-3xl border border-amber-500/40 relative">
        <div class="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 font-black text-xl flex items-center justify-center mb-3">
          👑 1
        </div>
        <h3 class="text-xl font-extrabold text-white">HIP-HOP (ヒップホップ)</h3>
        <p class="text-xs text-slate-400 mt-2">受講率 No.1！ストリート系のノリと圧倒的なカッコよさで男女ともに大人気。</p>
        <div class="mt-4 pt-4 border-t border-slate-800 text-xs text-amber-400 font-bold">
          今月の体験満足度: 99.2%
        </div>
      </div>

      <!-- Rank 2 -->
      <div class="glass-panel p-6 rounded-3xl border border-slate-700 relative">
        <div class="w-10 h-10 rounded-xl bg-slate-700/40 text-slate-300 font-black text-xl flex items-center justify-center mb-3">
          🥈 2
        </div>
        <h3 class="text-xl font-extrabold text-white">キッズリズムダンス</h3>
        <p class="text-xs text-slate-400 mt-2">幼児期のお子様に絶大な人気！習い事デビューに最適な楽しく学べるコース。</p>
        <div class="mt-4 pt-4 border-t border-slate-800 text-xs text-pink-400 font-bold">
          幼児クラス通いやすさ No.1
        </div>
      </div>

      <!-- Rank 3 -->
      <div class="glass-panel p-6 rounded-3xl border border-amber-700/40 relative">
        <div class="w-10 h-10 rounded-xl bg-amber-900/40 text-amber-600 font-black text-xl flex items-center justify-center mb-3">
          🥉 3
        </div>
        <h3 class="text-xl font-extrabold text-white">JAZZ (ジャズダンス)</h3>
        <p class="text-xs text-slate-400 mt-2">姿勢改善としなやかな表現力！女の子を中心に急成長中の注目ジャンル。</p>
        <div class="mt-4 pt-4 border-t border-slate-800 text-xs text-purple-400 font-bold">
          表現力向上率 No.1
        </div>
      </div>

    </div>

  </div>
</template>
