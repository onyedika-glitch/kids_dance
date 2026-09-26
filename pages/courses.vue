<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        全8大コース詳細
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        EYS-Kids <span class="gradient-text">ダンスコース一覧</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        幼児向けのリズムダンスから本格的なストリート、ジャズ、テーマパークダンスまで。お子様の好みや成長段階に合わせて自由に選べます。
      </p>
    </div>

    <!-- Features Grid -->
    <FeaturesGrid />

    <!-- Detailed Breakdown Table/Cards -->
    <div class="space-y-8">
      <h3 class="text-2xl font-black text-white border-b border-slate-800 pb-3">
        年齢・目的別のコース選び
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="glass-panel p-6 rounded-3xl border border-pink-500/30 space-y-4">
          <div class="w-10 h-10 rounded-xl bg-pink-500/20 text-pink-400 font-bold flex items-center justify-center text-lg">
            3〜6歳
          </div>
          <h4 class="text-xl font-extrabold text-white">幼児・未就学児クラス</h4>
          <p class="text-slate-400 text-xs leading-relaxed">
            音楽にあわせて身体を動かす楽しさを知り、音感とリズム感を自然に体得。お友達と一緒に楽しく踊るプレレッスン。
          </p>
          <div class="text-xs text-pink-400 font-bold">
            推奨: キッズリズムダンス / HIP-HOP基礎
          </div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-purple-500/30 space-y-4">
          <div class="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center text-lg">
            小1〜小3
          </div>
          <h4 class="text-xl font-extrabold text-white">低学年ステップクラス</h4>
          <p class="text-slate-400 text-xs leading-relaxed">
            基礎ステップや決めポーズをしっかりマスター。アイソレーション（身体の部位を独立して動かす訓練）を開始。
          </p>
          <div class="text-xs text-purple-400 font-bold">
            推奨: HIP-HOP / JAZZ / テーマパーク
          </div>
        </div>

        <div class="glass-panel p-6 rounded-3xl border border-indigo-500/30 space-y-4">
          <div class="w-10 h-10 rounded-xl bg-indigo-500/20 text-indigo-400 font-bold flex items-center justify-center text-lg">
            小4〜中生
          </div>
          <h4 class="text-xl font-extrabold text-white">高学年・表現力クラス</h4>
          <p class="text-slate-400 text-xs leading-relaxed">
            表現力・見せ方・フォーメーションダンスまで追求。コンテスト挑戦やステージ発表会でのソロ・メインパートを目指します。
          </p>
          <div class="text-xs text-indigo-400 font-bold">
            推奨: ブレイキン / LOCK / コンテンポラリー
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import FeaturesGrid from '~/components/FeaturesGrid.vue'
</script>
