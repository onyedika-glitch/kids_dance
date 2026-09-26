<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        通いやすさ抜群
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        全国スタジオ <span class="gradient-text">アクセス・施設案内</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        全スタジオ駅から徒歩5分圏内。保護者見学ラウンジ、専用更衣室、防音クッションフロア完備。
      </p>
    </div>

    <!-- Form Component with Region & Studio List -->
    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800">
      <h3 class="text-xl font-extrabold text-white mb-6">📍 エリアからスタジオを探す</h3>
      <Form />
    </div>

    <!-- Studio Features Overview -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <div class="glass-card p-6 rounded-2xl space-y-3">
        <div class="text-3xl">☕</div>
        <h4 class="font-bold text-white text-base">保護者見学ラウンジ完備</h4>
        <p class="text-slate-400 text-xs leading-relaxed">
          快適なソファとFree Wi-Fiを完備。レッスン中のお子様の様子をリラックスして見学・お待ちいただけます。
        </p>
      </div>

      <div class="glass-card p-6 rounded-2xl space-y-3">
        <div class="text-3xl">📹</div>
        <h4 class="font-bold text-white text-base">安心のライブカメラモニター</h4>
        <p class="text-slate-400 text-xs leading-relaxed">
          スタジオ内の模様をモニタリング。離れた場所からでもスマートフォンで安全を確認できます。
        </p>
      </div>

      <div class="glass-card p-6 rounded-2xl space-y-3">
        <div class="text-3xl">🩰</div>
        <h4 class="font-bold text-white text-base">衝撃吸収クッションフロア</h4>
        <p class="text-slate-400 text-xs leading-relaxed">
          お子様の膝や足首への負担を最小限に抑える、キッズ専用の衝撃吸収安全床材を採用。
        </p>
      </div>

    </div>

  </div>
</template>

<script setup>
import Form from '~/components/Form.vue'
</script>
