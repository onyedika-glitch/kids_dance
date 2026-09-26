<template>
  <div class="space-y-8">
    
    <!-- Dynamic Calculator Controls -->
    <div class="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-700/80 space-y-6">
      
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h3 class="text-xl font-extrabold text-white">料金シミュレーター</h3>
          <p class="text-xs text-slate-400">通い方やお子様の人数に合わせて月額受講料を計算できます</p>
        </div>
        
        <div class="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
          <button 
            @click="selectedPlan = 'standard'"
            :class="['px-4 py-2 rounded-lg transition', selectedPlan === 'standard' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white']"
          >
            月4回コース
          </button>
          <button 
            @click="selectedPlan = 'light'"
            :class="['px-4 py-2 rounded-lg transition', selectedPlan === 'light' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white']"
          >
            月2回コース
          </button>
          <button 
            @click="selectedPlan = 'unlimited'"
            :class="['px-4 py-2 rounded-lg transition', selectedPlan === 'unlimited' ? 'bg-pink-500 text-white shadow' : 'text-slate-400 hover:text-white']"
          >
            受け放題
          </button>
        </div>
      </div>

      <!-- Options -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Option 1: Sibling Discount Toggle -->
        <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div class="font-bold text-white text-sm">兄弟・姉妹割引 (10% OFF)</div>
            <div class="text-xs text-slate-400">2人目以降のお子様の月謝割引</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="hasSiblingDiscount" class="sr-only peer">
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
          </label>
        </div>

        <!-- Option 2: Studio Pass -->
        <div class="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex items-center justify-between">
          <div>
            <div class="font-bold text-white text-sm">全スタジオフリーパス</div>
            <div class="text-xs text-slate-400">全国30+スタジオどこでも受講可能</div>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" v-model="hasFreePass" class="sr-only peer">
            <div class="w-11 h-6 bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
          </label>
        </div>
      </div>

      <!-- Result Banner -->
      <div class="bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-indigo-900/40 p-6 rounded-2xl border border-pink-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div class="text-xs text-pink-300 font-bold mb-1">推定月額受講料 (税込)</div>
          <div class="text-3xl sm:text-4xl font-black text-white flex items-baseline gap-1">
            <span>¥{{ calculatedMonthlyPrice.toLocaleString() }}</span>
            <span class="text-xs text-slate-400 font-normal">/ 月</span>
          </div>
        </div>

        <div class="space-y-1 text-xs text-slate-300">
          <div class="flex items-center gap-2">
            <span class="text-pink-400">🎁 入会金半額キャンペーン適用中！</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-emerald-400">👟 シューズ＆ウェアプレゼント付き</span>
          </div>
        </div>
      </div>

    </div>

    <!-- Pricing Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      
      <!-- Plan 1 -->
      <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-slate-800">
        <div>
          <span class="text-xs px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-bold">ライトプラン</span>
          <h4 class="text-2xl font-black text-white mt-3 mb-1">月2回 コース</h4>
          <p class="text-xs text-slate-400 mb-6">無理なくマイペースに通いたいお子様へ</p>
          <div class="text-3xl font-extrabold text-white mb-6">
            ¥7,800 <span class="text-xs text-slate-400 font-normal">/ 月 (税込)</span>
          </div>
          <ul class="space-y-3 text-xs text-slate-300 mb-8">
            <li class="flex items-center gap-2">✓ 月2回のレッスン受講</li>
            <li class="flex items-center gap-2">✓ 振替レッスン期限なし</li>
            <li class="flex items-center gap-2">✓ 4 KARTE配信サービス</li>
          </ul>
        </div>
        <NuxtLink to="/freetrial" class="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-sm transition">
          ライトプランで無料体験
        </NuxtLink>
      </div>

      <!-- Plan 2 (Popular) -->
      <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-pink-500/50 bg-pink-500/5 relative overflow-hidden shadow-xl shadow-pink-500/10">
        <div class="absolute top-0 right-0 bg-pink-500 text-white text-[10px] font-black px-4 py-1 rounded-bl-xl uppercase tracking-wider">
          人気 No.1
        </div>
        <div>
          <span class="text-xs px-3 py-1 rounded-full bg-pink-500/20 text-pink-300 font-bold border border-pink-500/30">スタンダード</span>
          <h4 class="text-2xl font-black text-white mt-3 mb-1">月4回 コース</h4>
          <p class="text-xs text-slate-400 mb-6">週1回しっかり上達したい定番コース</p>
          <div class="text-3xl font-extrabold text-pink-400 mb-6">
            ¥12,800 <span class="text-xs text-slate-400 font-normal">/ 月 (税込)</span>
          </div>
          <ul class="space-y-3 text-xs text-slate-300 mb-8">
            <li class="flex items-center gap-2">✓ 月4回のレッスン受講</li>
            <li class="flex items-center gap-2">✓ ダンスウェア＆シューズ全プレ</li>
            <li class="flex items-center gap-2">✓ 発表会優先エントリー権利</li>
            <li class="flex items-center gap-2">✓ 4 KARTE動画配信＋分析</li>
          </ul>
        </div>
        <NuxtLink to="/freetrial" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-95 text-white font-bold text-center text-sm shadow-lg shadow-pink-500/25 transition">
          人気No.1プランで無料体験
        </NuxtLink>
      </div>

      <!-- Plan 3 -->
      <div class="glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between border-slate-800">
        <div>
          <span class="text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">プレミアム</span>
          <h4 class="text-2xl font-black text-white mt-3 mb-1">受け放題 コース</h4>
          <p class="text-xs text-slate-400 mb-6">複数ジャンルを自由にレッスン受講</p>
          <div class="text-3xl font-extrabold text-white mb-6">
            ¥19,800 <span class="text-xs text-slate-400 font-normal">/ 月 (税込)</span>
          </div>
          <ul class="space-y-3 text-xs text-slate-300 mb-8">
            <li class="flex items-center gap-2">✓ 全ジャンルレッスン無制限</li>
            <li class="flex items-center gap-2">✓ 全国全スタジオフリーパス</li>
            <li class="flex items-center gap-2">✓ マンツーマン個別レッスン優待</li>
          </ul>
        </div>
        <NuxtLink to="/freetrial" class="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-center text-sm transition">
          受け放題プランで無料体験
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const selectedPlan = ref('standard')
const hasSiblingDiscount = ref(false)
const hasFreePass = ref(false)

const basePrices = {
  light: 7800,
  standard: 12800,
  unlimited: 19800
}

const calculatedMonthlyPrice = computed(() => {
  let price = basePrices[selectedPlan.value]
  if (hasFreePass.value) price += 1500
  if (hasSiblingDiscount.value) price = Math.round(price * 0.9)
  return price
})
</script>