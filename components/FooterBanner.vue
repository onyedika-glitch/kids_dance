<template>
  <footer class="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs sm:text-sm relative overflow-hidden">
    
    <!-- CTA Banner Container -->
    <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12 border-b border-slate-800/80">
      <div class="relative rounded-3xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 p-8 md:p-12 overflow-hidden shadow-2xl">
        <div class="relative z-10 text-center max-w-2xl mx-auto space-y-6">
          <div class="inline-block bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-white text-xs font-bold uppercase tracking-wider">
            🎉 春の特別体験キャンペーン実施中
          </div>
          <h3 class="text-2xl sm:text-4xl font-black text-white leading-tight">
            まずは完全無料の体験レッスンで<br />
            笑顔あふれるダンス体験を！
          </h3>
          <p class="text-pink-100 text-xs sm:text-sm">
            今なら体験受講後にご入会いただくと、ダンスウェア＆レッスンシューズを全員に無料プレゼント！
          </p>
          <div>
            <NuxtLink to="/freetrial" class="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-slate-900 font-extrabold text-base shadow-xl hover:bg-slate-100 hover:scale-105 transition duration-300">
              <span>🎁 無料体験レッスンを予約する (0円)</span>
              <span>→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Footer Links & Info -->
    <div class="max-w-7xl mx-auto px-4 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        <!-- Col 1: Brand Info -->
        <div class="lg:col-span-2 space-y-4">
          <NuxtLink to="/" class="flex items-center space-x-3">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-500 to-indigo-500 p-0.5">
              <div class="w-full h-full bg-slate-950 rounded-[6px] flex items-center justify-center font-black text-xs text-pink-400">
                EYS
              </div>
            </div>
            <span class="font-black text-lg text-white">EYS-Kids DANCE ACADEMY</span>
          </NuxtLink>
          <p class="text-slate-400 text-xs leading-relaxed max-w-sm">
            全国30以上の専用スタジオで展開するキッズダンススクール。ヒップホップ、ジャズ、キッズリズムダンスまでお子様の感性と成長を全力で応援します。
          </p>
          <div class="text-xs text-slate-300 space-y-1">
            <div>📞 フリーダイヤル: <strong class="text-white">0120-834-210</strong> (受付 9:00-21:00)</div>
            <div>🏢 運営: 株式会社EYS-STYLE</div>
          </div>
        </div>

        <!-- Col 2: Navigation -->
        <div class="space-y-3">
          <div class="font-bold text-white text-sm">コース・システム</div>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/courses" class="hover:text-white transition">8大ダンスコース</NuxtLink></li>
            <li><NuxtLink to="/curriculum" class="hover:text-white transition">年齢別カリキュラム</NuxtLink></li>
            <li><NuxtLink to="/pricing" class="hover:text-white transition">料金プラン・シミュレーション</NuxtLink></li>
            <li><NuxtLink to="/instructors" class="hover:text-white transition">プロ講師陣プロフィール</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 3: Studios & Events -->
        <div class="space-y-3">
          <div class="font-bold text-white text-sm">スタジオ・イベント</div>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/access" class="hover:text-white transition">全国スタジオアクセス</NuxtLink></li>
            <li><NuxtLink to="/events" class="hover:text-white transition">発表会・ダンスバトル</NuxtLink></li>
            <li><NuxtLink to="/usersvoice" class="hover:text-white transition">受講生・保護者の体験談</NuxtLink></li>
            <li><NuxtLink to="/safety" class="hover:text-white transition">安心・安全対策ガイド</NuxtLink></li>
          </ul>
        </div>

        <!-- Col 4: Support -->
        <div class="space-y-3">
          <div class="font-bold text-white text-sm">サポート・案内</div>
          <ul class="space-y-2 text-xs">
            <li><NuxtLink to="/freetrial" class="hover:text-pink-400 font-bold transition">無料体験レッスン申込</NuxtLink></li>
            <li><NuxtLink to="/news" class="hover:text-white transition">最新お知らせ・キャンペーン</NuxtLink></li>
            <li><NuxtLink to="/vision" class="hover:text-white transition">EYS-Kidsの理念</NuxtLink></li>
          </ul>
        </div>

      </div>

      <!-- Copyright -->
      <div class="pt-8 mt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
        <div>© 2026 EYS-Kids DANCE ACADEMY. All rights reserved.</div>
        <div class="flex space-x-4">
          <a href="#" class="hover:text-slate-400">プライバシーポリシー</a>
          <a href="#" class="hover:text-slate-400">利用規約</a>
          <a href="#" class="hover:text-slate-400">特定商取引法に基づく表記</a>
        </div>
      </div>
    </div>
  </footer>
</template>