<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <HeroSection />

    <!-- 4 Karte System Feature -->
    <KarteSection />

    <!-- STEM & Rhythm Dance Education -->
    <StemSection />

    <!-- Course Lineup Grid -->
    <FeaturesGrid />

    <!-- Interactive Studio Locator Preview -->
    <section class="py-16 bg-slate-900/40">
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        <div class="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
            全国30+スタジオ案内
          </div>
          <h2 class="text-3xl sm:text-4xl font-black text-white">
            お近くの <span class="gradient-text">EYS-Kids スタジオ</span> を探す
          </h2>
          <p class="text-slate-400 text-sm">
            駅チカ・保護者見学ラウンジ・最新アメニティ完備。ご都合の良いスタジオをお選びいただけます。
          </p>
        </div>

        <Form />
      </div>
    </section>

    <!-- Parent Voice Preview Section -->
    <section class="py-16">
      <div class="max-w-7xl mx-auto px-4 lg:px-8">
        <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-2">
              受講者の声
            </div>
            <h2 class="text-3xl font-black text-white">保護者様からの喜びの声</h2>
          </div>
          <NuxtLink to="/usersvoice" class="text-pink-400 hover:text-pink-300 text-sm font-bold flex items-center gap-1">
            <span>もっと見る</span>
            <span>→</span>
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="glass-card p-6 rounded-2xl space-y-3">
            <div class="flex items-center space-x-1 text-amber-400">
              ★★★★★
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              「人見知りだった娘が、カルテで毎回の成長を褒められることで自信がつき、発表会で堂々とソロパートを踊れました！」
            </p>
            <div class="text-xs text-slate-400 font-bold border-t border-slate-800 pt-3">
              小2女子の保護者様 (ヒップホップコース)
            </div>
          </div>

          <div class="glass-card p-6 rounded-2xl space-y-3">
            <div class="flex items-center space-x-1 text-amber-400">
              ★★★★★
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              「ウェアとシューズが無料でついてくるキャンペーンで気軽に始められました。振替レッスンが無期限なのも助かります。」
            </p>
            <div class="text-xs text-slate-400 font-bold border-t border-slate-800 pt-3">
              年長男子の保護者様 (キッズリズムコース)
            </div>
          </div>

          <div class="glass-card p-6 rounded-2xl space-y-3">
            <div class="flex items-center space-x-1 text-amber-400">
              ★★★★★
            </div>
            <p class="text-slate-300 text-xs sm:text-sm leading-relaxed">
              「防音フロアと見学スペースがあり安心。先生が一人ひとりの性格に寄り添ってレッスンしてくれるのが素晴らしいです。」
            </p>
            <div class="text-xs text-slate-400 font-bold border-t border-slate-800 pt-3">
              小4女子の保護者様 (ジャズダンスコース)
            </div>
          </div>
        </div>

      </div>
    </section>

  </div>
</template>

<script setup>
import HeroSection from '~/components/HeroSection.vue'
import KarteSection from '~/components/KarteSection.vue'
import StemSection from '~/components/StemSection.vue'
import FeaturesGrid from '~/components/FeaturesGrid.vue'
import Form from '~/components/Form.vue'
</script>
