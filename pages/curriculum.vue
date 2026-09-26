<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider">
        上達の秘密
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        EYS-Kids <span class="gradient-text">年間カリキュラム</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        基礎の身体づくりからステージ発表まで。お子様一人ひとりのペースでステップアップできる段階別カリキュラム。
      </p>
    </div>

    <!-- Timeline Steps Grid -->
    <div class="space-y-8">
      
      <!-- Step 1 -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-3 text-center lg:text-left">
          <span class="px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 text-xs font-bold border border-pink-500/30">STEP 01 (1〜3ヶ月)</span>
          <h3 class="text-2xl font-black text-white mt-2">リズム＆身体づくり</h3>
        </div>
        <div class="lg:col-span-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          音楽を身体全体で感じる「ダウン＆アップ」の基本姿勢、体幹バランス、ストレッチを体得。ダンスの楽しさを知り、レッスンが大好きになる最初のステップです。
        </div>
        <div class="lg:col-span-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <div class="text-xs text-slate-400">到達目標</div>
          <div class="text-sm font-bold text-pink-400 mt-1">オンビートで楽しくステップ！</div>
        </div>
      </div>

      <!-- Step 2 -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-3 text-center lg:text-left">
          <span class="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">STEP 02 (4〜6ヶ月)</span>
          <h3 class="text-2xl font-black text-white mt-2">コンビネーション＆アイソレーション</h3>
        </div>
        <div class="lg:col-span-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          首・胸・腰を独立して動かすアイソレーションや基本技（ランニングマン、ボックスステップ等）を習得。複数ステップを繋げて踊るコンビネーションに挑戦。
        </div>
        <div class="lg:col-span-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <div class="text-xs text-slate-400">到達目標</div>
          <div class="text-sm font-bold text-purple-400 mt-1">サビ部分の振付を完コピ！</div>
        </div>
      </div>

      <!-- Step 3 -->
      <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div class="lg:col-span-3 text-center lg:text-left">
          <span class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold border border-indigo-500/30">STEP 03 (7〜12ヶ月)</span>
          <h3 class="text-2xl font-black text-white mt-2">表現力＆ステージパフォーマンス</h3>
        </div>
        <div class="lg:col-span-6 text-slate-300 text-xs sm:text-sm leading-relaxed">
          表情の作り方、アピール力、チームでのフォーメーションダンスの完成度を高めます。年2回の本格ステージ「EYSダンスフェスティバル」で堂々パフォーマンス！
        </div>
        <div class="lg:col-span-3 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-center">
          <div class="text-xs text-slate-400">到達目標</div>
          <div class="text-sm font-bold text-indigo-400 mt-1">本格ステージで発表会出演！</div>
        </div>
      </div>

    </div>

    <!-- CTA -->
    <div class="text-center pt-6">
      <NuxtLink to="/freetrial" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-base shadow-lg shadow-pink-500/20 hover:scale-105 transition">
        <span>無料体験レッスンで体験してみる</span>
        <span>→</span>
      </NuxtLink>
    </div>

  </div>
</template>