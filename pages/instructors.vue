<template>
  <div class="py-12 max-w-7xl mx-auto px-4 lg:px-8 space-y-10">
    
    <!-- Header -->
    <div class="text-center max-w-3xl mx-auto space-y-4">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        第一線で活躍するプロダンサー
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        EYS-Kids <span class="gradient-text">講師陣プロフィール</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base">
        有名アーティストのバックダンサーやコンテスト優勝経験者が、お子様の個性を大切に優しく丁寧に応援・指導します。
      </p>
    </div>

    <!-- Genre Filter Tabs -->
    <div class="flex flex-wrap justify-center gap-2">
      <button 
        v-for="genre in genres" 
        :key="genre"
        @click="selectedGenre = genre"
        :class="['px-4 py-2 rounded-xl text-xs font-bold transition', selectedGenre === genre ? 'bg-pink-500 text-white shadow-lg shadow-pink-500/20' : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800']"
      >
        {{ genre }}
      </button>
    </div>

    <!-- Instructor Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <InstructorCard 
        v-for="inst in filteredInstructors" 
        :key="inst.name" 
        :instructor="inst" 
      />
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import InstructorCard from '~/components/InstructorCard.vue'

const selectedGenre = ref('すべて')
const genres = ['すべて', 'HIP-HOP', 'JAZZ', 'キッズリズム', 'ブレイキン', 'LOCK', 'テーマパーク']

const instructorsList = [
  {
    name: 'RINA',
    genre: 'HIP-HOP',
    experience: '7年',
    rating: '4.9',
    message: 'ダンスは「できた！」の感動の連続！基本のグルーヴからカッコいいステップまで笑顔で楽しく教えます！',
    tags: ['バックダンサー実績', 'キッズ初心者に大人気', '秋葉原・新宿担当']
  },
  {
    name: 'KEN',
    genre: 'ブレイキン',
    experience: '10年',
    rating: '5.0',
    message: '倒立やチェアーなどのアクロバット技も、安全なマットでイチから段階的にしっかりサポートします！',
    tags: ['バトル大会優勝者', '体幹トレーニング強化', '池袋・渋谷担当']
  },
  {
    name: 'MIKU',
    genre: 'JAZZ',
    experience: '8年',
    rating: '4.8',
    message: 'しなやかな身体表現と音楽の一体感を大切にしています。テーマパークダンスを目指すお子様にもおすすめ！',
    tags: ['舞台出演多数', '柔軟性アップが得意', '銀座・横浜担当']
  },
  {
    name: 'DAIKI',
    genre: 'LOCK',
    experience: '6年',
    rating: '4.9',
    message: 'リズムにのってポーズを決める爽快感がロックダンスの魅力！男の子も女の子も夢中になれるレッスンです。',
    tags: ['ロックダンス専門', 'リズム感強化', '梅田・名古屋担当']
  },
  {
    name: 'SORA',
    genre: 'キッズリズム',
    experience: '5年',
    rating: '4.9',
    message: '幼児期の大切な感性と音感を育てます。人見知りのお子様もすぐ打ち解けられる楽しい雰囲気でお迎えします。',
    tags: ['保育士資格保有', '3〜6歳に特化', '大宮・千葉担当']
  },
  {
    name: 'HARUKA',
    genre: 'テーマパーク',
    experience: '9年',
    rating: '5.0',
    message: 'テーマパークのショーのように、見る人を笑顔にするキラキラのパフォーマンスを一緒に作りましょう！',
    tags: ['元テーマパークダンサー', '表現力最高評価', '六本木・川崎担当']
  }
]

const filteredInstructors = computed(() => {
  if (selectedGenre.value === 'すべて') return instructorsList
  return instructorsList.filter(i => i.genre === selectedGenre.value)
})
</script>
