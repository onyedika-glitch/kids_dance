<template>
  <section class="py-16 bg-slate-900/40">
    <div class="max-w-7xl mx-auto px-4 lg:px-8">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-3">
            多彩なダンスジャンル
          </div>
          <h2 class="text-3xl sm:text-4xl font-black tracking-tight text-white">
            充実の <span class="gradient-text">8大コース</span> ラインナップ
          </h2>
        </div>
        <NuxtLink to="/courses" class="text-pink-400 hover:text-pink-300 font-bold text-sm flex items-center gap-1.5 transition">
          <span>すべてのコース詳細を見る</span>
          <span>→</span>
        </NuxtLink>
      </div>

      <!-- Course Cards Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="course in courses" :key="course.id" class="glass-card rounded-2xl p-6 flex flex-col justify-between group">
          
          <div>
            <!-- Badge & Icon -->
            <div class="flex items-center justify-between mb-4">
              <span class="text-xs px-2.5 py-1 rounded-full font-bold" :class="course.badgeColor">
                {{ course.age }}
              </span>
              <span class="text-2xl">{{ course.icon }}</span>
            </div>

            <!-- Course Title -->
            <h3 class="text-xl font-extrabold text-white mb-2 group-hover:text-pink-400 transition">
              {{ course.name }}
            </h3>

            <!-- Description -->
            <p class="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
              {{ course.description }}
            </p>
          </div>

          <!-- Footer Actions -->
          <div class="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span class="text-xs font-semibold text-slate-300">難易度: {{ course.level }}</span>
            <NuxtLink to="/freetrial" class="text-xs font-bold text-pink-400 hover:text-pink-300 flex items-center gap-1">
              <span>体験予約</span>
              <span>→</span>
            </NuxtLink>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const courses = [
  {
    id: 'hiphop',
    name: 'HIP-HOP (ヒップホップ)',
    icon: '🧢',
    age: '全年齢対象',
    badgeColor: 'bg-pink-500/20 text-pink-300 border border-pink-500/30',
    description: 'ストリートダンスの定番！ステップやアップダウンのリズムに乗ってカッコよく踊る大人気コース。',
    level: '★☆☆〜★★★'
  },
  {
    id: 'jazz',
    name: 'JAZZ (ジャズダンス)',
    icon: '✨',
    age: '5歳〜小学生',
    badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
    description: 'しなやかな身体づくりと表現力を磨く。テーマパークダンスの基礎にもなる華やかなスタイル。',
    level: '★☆☆〜★★★'
  },
  {
    id: 'rhythm',
    name: 'キッズリズムダンス',
    icon: '🥁',
    age: '年少〜年長 (3〜6歳)',
    badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30',
    description: 'ダンス初心者の幼児向け！手遊びや楽しく音楽に合わせて動くリズムトレーニング。',
    level: '★☆☆'
  },
  {
    id: 'acrobat',
    name: 'ブレイキン / アクロバット',
    icon: '🤸‍♂️',
    age: '小学生〜',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30',
    description: '倒立や回転技に挑戦！安全なマットで体幹とチャレンジ精神を大きく鍛えます。',
    level: '★★☆〜★★★'
  },
  {
    id: 'lock',
    name: 'LOCK (ロックダンス)',
    icon: '🔒',
    age: '小学生〜',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30',
    description: 'ポーズを「ロック（鍵をかける）」するコミカルでキレのあるダンステクニック。',
    level: '★★☆'
  },
  {
    id: 'themepark',
    name: 'テーマパークダンス',
    icon: '🏰',
    age: '全年齢対象',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30',
    description: 'テーマパークのショーのように笑顔と表現力いっぱいにパフォーマンスする夢のコース！',
    level: '★☆☆〜★★☆'
  },
  {
    id: 'contemporary',
    name: 'コンテンポラリー',
    icon: '🎭',
    age: '小学生〜',
    badgeColor: 'bg-rose-500/20 text-rose-300 border border-rose-500/30',
    description: '型にとらわれず自分の感情やストーリーを身体全体で自由に表現するアートダンス。',
    level: '★★☆'
  },
  {
    id: 'house',
    name: 'HOUSE (ハウス)',
    icon: '👟',
    age: '小学生〜',
    badgeColor: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
    description: 'アップテンポなハウスミュージックに合わせて速い足さばきを楽しむステップ系ダンス。',
    level: '★★☆'
  }
]
</script>
