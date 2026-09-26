<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-12">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        明朗会計・追加料金なし
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        料金プラン <span class="gradient-text">＆ 特典キャンペーン</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        わかりやすい月額料金システム。入会特典としてダンスウェア・シューズを全員にプレゼント中！
      </p>
    </div>

    <!-- Pricing Interactive Component -->
    <PricingComponent />

    <!-- FAQ Section -->
    <div class="glass-panel p-8 rounded-3xl border border-slate-800 space-y-6">
      <h3 class="text-xl font-extrabold text-white mb-4">💡 料金に関するよくある質問</h3>
      
      <div class="space-y-4 text-xs sm:text-sm">
        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div class="font-bold text-pink-400">Q. 休んだ場合の補講・振替レッスンはありますか？</div>
          <div class="text-slate-300">A. はい！有効期限が無期限の振替システムをご用意しています。体調不良やご都合が悪くなった場合も無駄になりません。</div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div class="font-bold text-pink-400">Q. プレゼントのウェアやシューズのサイズ交換はできますか？</div>
          <div class="text-slate-300">A. もちろんです！お子様の成長に合わせていつでもサイズ交換を承っております。</div>
        </div>

        <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
          <div class="font-bold text-pink-400">Q. 月の途中からの入会はできますか？</div>
          <div class="text-slate-300">A. はい。月の途中入会の場合は、初回月謝を回数割（日割）で計算いたしますのでご安心ください。</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import PricingComponent from '~/components/PricingComponent.vue'
</script>
