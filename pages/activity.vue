<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        疑問・お悩みを解決
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        よくある <span class="gradient-text">ご質問・FAQ</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        キッズダンスレッスン、服装、振替、入会手続きに関するよくある質問にお答えします。
      </p>
    </div>

    <!-- FAQ Accordion -->
    <div class="max-w-4xl mx-auto space-y-4">
      <div 
        v-for="(item, index) in qaList" 
        :key="index"
        class="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3"
      >
        <div class="flex items-start space-x-3">
          <span class="w-7 h-7 rounded-xl bg-pink-500/20 text-pink-400 font-extrabold text-sm flex items-center justify-center shrink-0">
            Q
          </span>
          <h3 class="font-bold text-white text-base pt-0.5">
            {{ item.question }}
          </h3>
        </div>
        <div class="pl-10 text-slate-300 text-xs sm:text-sm leading-relaxed border-t border-slate-800/60 pt-3 flex items-start space-x-2">
          <span class="text-purple-400 font-bold shrink-0">A.</span>
          <span>{{ item.answer }}</span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface QAItem {
  question: string;
  answer: string;
}

const qaList = ref<QAItem[]>([
  {
    question: "ダンス経験がまったくありませんが、レッスンについていけますか？",
    answer: "もちろん大丈夫です！EYS-Kidsの受講生様の約8割が完全未経験からスタートされています。ステップ一つひとつを楽しく丁寧にお教えします。"
  },
  {
    question: "年度の途中からでも入会できますか？",
    answer: "はい、年度途中や月の途中からでもいつからでもご入会いただけます。初回月は受講回数に応じた日割計算となります。"
  },
  {
    question: "レッスン当日の服装や持ち物は何が必要ですか？",
    answer: "動きやすい服装（Tシャツ、ジャージなど）と水分補給用の飲み物、汗拭きタオルをお持ちください。プレゼントのダンスシューズをお持ちの方はシューズもご持参ください。"
  },
  {
    question: "急なお休みの場合、振替レッスンはできますか？",
    answer: "はい！EYS-Kidsでは有効期限のない無期限の振替レッスンシステムを採用しています。スマホから簡単に振替予約が可能です。"
  },
  {
    question: "保護者のレッスン見学は可能ですか？",
    answer: "全スタジオに見学用ラウンジやモニターを完備しております。お子様の成長をいつでも温かく見守っていただけます。"
  }
]);
</script>
