<template>
  <section class="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
    <!-- Background Glow Blobs -->
    <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-pink-600/20 rounded-full blur-[120px] pointer-events-none"></div>
    <div class="absolute top-10 right-10 w-[400px] h-[300px] bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Hero Copy -->
        <div class="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs md:text-sm font-semibold">
            <span class="w-2 h-2 rounded-full bg-pink-400 animate-ping"></span>
            <span>2026年春季受講生募集中！初心者大歓迎</span>
          </div>

          <h1 class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-tight">
            音にあわせて<br class="hidden sm:block" />
            <span class="gradient-text">心が躍り出す！</span><br />
            EYS-Kids ダンスアカデミー
          </h1>

          <p class="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
            ヒップホップ、ジャズ、キッズリズムダンスからアクロバットまで。<br class="hidden md:block" />
            一人ひとりの「好き」と「個性」を引き出す、進化系キッズダンススクール。
          </p>

          <!-- Key Highlights Pills -->
          <div class="flex flex-wrap justify-center lg:justify-start gap-3 text-xs md:text-sm font-medium">
            <div class="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 flex items-center gap-1.5">
              <span class="text-pink-400">✨</span> 毎回の成長が伝わる「4 KARTE」
            </div>
            <div class="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 flex items-center gap-1.5">
              <span class="text-purple-400">👟</span> 入会特典！ウェア＆シューズ進呈
            </div>
            <div class="px-3.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 text-slate-200 flex items-center gap-1.5">
              <span class="text-indigo-400">🏢</span> 全国30+スタジオ完備
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <NuxtLink to="/freetrial" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-bold text-base shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-[1.02] transition duration-300 text-center flex items-center justify-center gap-2">
              <span>🎉 無料体験レッスンに応募する</span>
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </NuxtLink>
            <NuxtLink to="/courses" class="w-full sm:w-auto px-7 py-4 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-200 hover:text-white hover:bg-slate-700/80 font-semibold text-base transition text-center">
              コース一覧を見る
            </NuxtLink>
          </div>

        </div>

        <!-- Right Hero Visual Card & Live Interactive Widget -->
        <div class="lg:col-span-5 relative">
          <div class="relative rounded-3xl p-6 glass-panel border border-slate-700/60 shadow-2xl space-y-6">
            
            <!-- Badge Header -->
            <div class="flex items-center justify-between border-b border-slate-800 pb-4">
              <div class="flex items-center space-x-3">
                <div class="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
                <span class="text-xs font-bold text-slate-300 tracking-wider">LIVE 教室ステータス</span>
              </div>
              <span class="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold">受付中</span>
            </div>

            <!-- Dynamic Interactive Preview Card -->
            <div class="space-y-4">
              <div class="bg-gradient-to-r from-pink-900/30 to-purple-900/30 p-4 rounded-2xl border border-pink-500/20">
                <div class="text-xs text-pink-300 font-bold mb-1">【注目レッスン】キッズヒップホップ</div>
                <div class="text-lg font-extrabold text-white">リズム感 ＆ 表現力アップ！</div>
                <div class="text-xs text-slate-400 mt-2 flex items-center justify-between">
                  <span>対象: 年少〜小学生</span>
                  <span class="text-pink-400 font-bold">満足度 98.6%</span>
                </div>
              </div>

              <!-- 4 KARTE Progress Preview Mini Box -->
              <div class="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div class="text-xs font-bold text-slate-300 flex justify-between items-center">
                  <span>📊 成長指導「4 KARTE」評価例</span>
                  <span class="text-[10px] text-purple-400">リアルタイム連動</span>
                </div>
                
                <!-- Skill Bars -->
                <div class="space-y-2 text-xs">
                  <div>
                    <div class="flex justify-between text-slate-300 mb-1">
                      <span>リズムキープ力 (Rhythm)</span>
                      <span class="text-pink-400 font-bold">92%</span>
                    </div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-r from-pink-500 to-purple-500 h-full rounded-full" style="width: 92%"></div>
                    </div>
                  </div>
                  <div>
                    <div class="flex justify-between text-slate-300 mb-1">
                      <span>表現力・アピール (Expression)</span>
                      <span class="text-indigo-400 font-bold">88%</span>
                    </div>
                    <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div class="bg-gradient-to-r from-purple-500 to-indigo-500 h-full rounded-full" style="width: 88%"></div>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <!-- Stats Bar -->
            <div class="grid grid-cols-3 gap-2 pt-2 text-center border-t border-slate-800">
              <div>
                <div class="text-xl md:text-2xl font-black text-pink-400">15,000+</div>
                <div class="text-[11px] text-slate-400">通い中の生徒数</div>
              </div>
              <div>
                <div class="text-xl md:text-2xl font-black text-purple-400">30+</div>
                <div class="text-[11px] text-slate-400">全国家族スタジオ</div>
              </div>
              <div>
                <div class="text-xl md:text-2xl font-black text-indigo-400">80+</div>
                <div class="text-[11px] text-slate-400">プロダンサー講師</div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </section>
</template>
