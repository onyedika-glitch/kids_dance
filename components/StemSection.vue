<template>
  <section class="py-16 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <!-- Left Illustration / Stats Cards -->
        <div class="lg:col-span-6 order-2 lg:order-1">
          <div class="grid grid-cols-2 gap-4">
            
            <div class="glass-panel p-6 rounded-2xl border border-pink-500/20 space-y-3">
              <div class="text-3xl">🧠</div>
              <h4 class="font-bold text-white text-base">空間認識・脳の発達</h4>
              <p class="text-slate-400 text-xs leading-relaxed">
                リズムに合わせて身体を動かすことで、小脳・大脳の神経回路を刺激し、知育効果が高まります。
              </p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border border-purple-500/20 space-y-3 mt-6">
              <div class="text-3xl">🎵</div>
              <h4 class="font-bold text-white text-base">絶対リズム感</h4>
              <p class="text-slate-400 text-xs leading-relaxed">
                幼少期からの音感トレーニングにより、音楽的感覚と集中力を同時に育みます。
              </p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border border-indigo-500/20 space-y-3">
              <div class="text-3xl">🤝</div>
              <h4 class="font-bold text-white text-base">協調性＆表現力</h4>
              <p class="text-slate-400 text-xs leading-relaxed">
                グループ作品づくりを通して、仲間と協力するコミュニケーション能力と自信を身につけます。
              </p>
            </div>

            <div class="glass-panel p-6 rounded-2xl border border-emerald-500/20 space-y-3 mt-6">
              <div class="text-3xl">🏃‍♂️</div>
              <h4 class="font-bold text-white text-base">体幹・柔軟性</h4>
              <p class="text-slate-400 text-xs leading-relaxed">
                正しい姿勢、バランス感覚、基礎理性を無理なく身につけるキッズ専用プログラム。
              </p>
            </div>

          </div>
        </div>

        <!-- Right Content -->
        <div class="lg:col-span-6 space-y-6 order-1 lg:order-2 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
            ダンス × 知育教育 (Rhythm & Cognition)
          </div>

          <h2 class="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
            ダンスで開花する<br />
            <span class="gradient-text">「生きる力」と「自信」</span>
          </h2>

          <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
            EYS-Kidsのダンスレッスンは、単に振り付けを覚えるだけではありません。リズム感を鍛え、自分の心と身体で感情を表現することで、子供たちの自己肯定感と感性を豊かに育みます。
          </p>

          <ul class="space-y-3 text-sm text-slate-200 text-left inline-block">
            <li class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">✓</span>
              <span>年齢別・レベル別のきめ細やかなカリキュラム</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">✓</span>
              <span>第一線で活躍するプロダンサーによる優しい指導</span>
            </li>
            <li class="flex items-center gap-2">
              <span class="w-5 h-5 rounded-full bg-pink-500/20 text-pink-400 flex items-center justify-center text-xs font-bold">✓</span>
              <span>年2回の本格ステージ発表会で達成感を体験</span>
            </li>
          </ul>

          <div class="pt-2">
            <NuxtLink to="/curriculum" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700 transition">
              <span>カリキュラムのこだわりを見る</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>

      </div>

    </div>
  </section>
</template>