<template>
  <div class="py-12 max-w-5xl mx-auto px-4 lg:px-8 space-y-10">
    
    <!-- Header -->
    <div class="text-center space-y-3">
      <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider">
        完全無料 ・ 特典付き
      </div>
      <h1 class="text-3xl sm:text-5xl font-black text-white">
        無料体験レッスン <span class="gradient-text">お申し込み</span>
      </h1>
      <p class="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto">
        簡単1分でWEB予約完了！お子様にぴったりのダンス体験をお楽しみいただけます。
      </p>
    </div>

    <!-- Step Progress Wizard -->
    <div class="grid grid-cols-3 gap-2 sm:gap-4 max-w-2xl mx-auto text-center text-xs font-bold">
      <div :class="['p-3 rounded-xl border transition', currentStep === 1 ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-900/60 border-slate-800 text-slate-400']">
        <span class="block text-lg mb-0.5">1</span>
        <span>基本情報入力</span>
      </div>
      <div :class="['p-3 rounded-xl border transition', currentStep === 2 ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-900/60 border-slate-800 text-slate-400']">
        <span class="block text-lg mb-0.5">2</span>
        <span>コース＆スタジオ</span>
      </div>
      <div :class="['p-3 rounded-xl border transition', currentStep === 3 ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-900/60 border-slate-800 text-slate-400']">
        <span class="block text-lg mb-0.5">3</span>
        <span>日時＆確認</span>
      </div>
    </div>

    <!-- Form Box -->
    <div class="glass-panel p-6 sm:p-10 rounded-3xl border border-slate-700/80 shadow-2xl">
      
      <!-- STEP 1: Basic Details -->
      <div v-if="currentStep === 1" class="space-y-6">
        <h3 class="text-xl font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <span>👤 お子様＆保護者様のお名前</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">お子様のお名前（漢字） *</label>
            <input type="text" v-model="form.childNameKanji" placeholder="例: 山田 太郎" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">お子様のお名前（ふりがな） *</label>
            <input type="text" v-model="form.childNameKana" placeholder="例: やまだ たろう" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none" />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">お子様の学年 / 年齢 *</label>
            <select v-model="form.grade" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none">
              <option value="">選択してください</option>
              <option value="年少未満 (2~3歳)">年少未満 (2〜3歳)</option>
              <option value="年少 (3~4歳)">年少 (3〜4歳)</option>
              <option value="年中 (4~5歳)">年中 (4〜5歳)</option>
              <option value="年長 (5~6歳)">年長 (5〜6歳)</option>
              <option value="小学1~3年生">小学1〜3年生</option>
              <option value="小学4~6年生">小学4〜6年生</option>
              <option value="中学生以上">中学生以上</option>
            </select>
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">性別</label>
            <div class="flex gap-4 pt-2">
              <label class="flex items-center gap-2 text-sm cursor-pointer text-slate-200">
                <input type="radio" v-model="form.gender" value="男の子" class="accent-pink-500" /> 男の子
              </label>
              <label class="flex items-center gap-2 text-sm cursor-pointer text-slate-200">
                <input type="radio" v-model="form.gender" value="女の子" class="accent-pink-500" /> 女の子
              </label>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">保護者様のお電話番号 *</label>
            <input type="tel" v-model="form.phone" placeholder="090-0000-0000" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none" />
          </div>
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">メールアドレス *</label>
            <input type="email" v-model="form.email" placeholder="example@email.com" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none" />
          </div>
        </div>

        <div class="pt-4 flex justify-end">
          <button @click="nextStep" :disabled="!isStep1Valid" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm hover:opacity-90 disabled:opacity-40 transition">
            次へ：コース選択 →
          </button>
        </div>
      </div>

      <!-- STEP 2: Course & Location -->
      <div v-else-if="currentStep === 2" class="space-y-6">
        <h3 class="text-xl font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <span>💃 希望コース＆希望スタジオの選択</span>
        </h3>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-3">体験したいダンスジャンル (複数選択可)</label>
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button 
              v-for="course in courseOptions" 
              :key="course"
              @click="toggleCourse(course)"
              :class="['p-3 rounded-xl border text-xs font-bold transition text-left flex items-center justify-between', form.selectedCourses.includes(course) ? 'bg-pink-500/20 border-pink-500 text-pink-300' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700']"
            >
              <span>{{ course }}</span>
              <span v-if="form.selectedCourses.includes(course)">✓</span>
            </button>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-3">希望スタジオの選択</label>
          <Form />
        </div>

        <div class="pt-4 flex justify-between">
          <button @click="currentStep = 1" class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition">
            ← 戻る
          </button>
          <button @click="nextStep" class="px-8 py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold text-sm hover:opacity-90 transition">
            次へ：希望日時 →
          </button>
        </div>
      </div>

      <!-- STEP 3: Date & Confirmation -->
      <div v-else-if="currentStep === 3" class="space-y-6">
        <h3 class="text-xl font-extrabold text-white border-b border-slate-800 pb-3 flex items-center gap-2">
          <span>📅 ご希望スケジュールの確認</span>
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">ご希望曜日</label>
            <select v-model="form.scheduleDay" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none">
              <option value="平日 (月〜金)">平日 (月〜金)</option>
              <option value="土曜日">土曜日</option>
              <option value="日曜日・祝日">日曜日・祝日</option>
              <option value="いつでも可能">いつでも可能</option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-bold text-slate-300 mb-1.5">ご希望時間帯</label>
            <select v-model="form.scheduleTime" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none">
              <option value="午前 (10:00~12:00)">午前 (10:00〜12:00)</option>
              <option value="午後 (14:00~17:00)">午後 (14:00〜17:00)</option>
              <option value="夕方 (17:00~20:00)">夕方 (17:00〜20:00)</option>
            </select>
          </div>
        </div>

        <div>
          <label class="block text-xs font-bold text-slate-300 mb-1.5">キャンペーンコード (お持ちの方)</label>
          <input type="text" v-model="form.campaignCode" placeholder="例: SPRING2026" class="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white focus:border-pink-500 focus:outline-none" />
        </div>

        <!-- Summary Preview Box -->
        <div class="bg-slate-950 p-5 rounded-2xl border border-pink-500/30 space-y-2 text-xs">
          <div class="font-bold text-pink-400 text-sm mb-2">📋 予約内容サマリー</div>
          <div class="text-slate-300">お子様: <strong class="text-white">{{ form.childNameKanji || '未入力' }}</strong> ({{ form.grade }})</div>
          <div class="text-slate-300">ジャンル: <strong class="text-white">{{ form.selectedCourses.join(', ') || '未選択' }}</strong></div>
          <div class="text-slate-300">電話番号: <strong class="text-white">{{ form.phone || '未入力' }}</strong></div>
          <div class="text-pink-300 font-bold mt-2">🎁 ウェア＆シューズプレゼント対象！</div>
        </div>

        <div class="pt-4 flex justify-between items-center">
          <button @click="currentStep = 2" class="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm transition">
            ← 戻る
          </button>
          <button @click="submitTrial" class="px-10 py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white font-black text-base shadow-xl shadow-pink-500/25 hover:scale-105 transition duration-300">
            🎉 無料体験申し込みを確定する
          </button>
        </div>
      </div>

    </div>

    <!-- Success Modal -->
    <div v-if="submitted" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
      <div class="glass-panel max-w-md w-full p-8 rounded-3xl border border-pink-500/40 text-center space-y-6">
        <div class="w-16 h-16 rounded-full bg-pink-500/20 text-pink-400 font-black text-3xl flex items-center justify-center mx-auto border border-pink-500/30 animate-bounce">
          🎉
        </div>
        <h3 class="text-2xl font-black text-white">体験予約が完了しました！</h3>
        <p class="text-slate-300 text-xs leading-relaxed">
          ご入力いただいたメールアドレス宛に予約確認メールを送信いたしました。担当スタッフより連絡申し上げます。
        </p>
        <NuxtLink to="/" @click="submitted = false" class="block w-full py-3 rounded-xl bg-pink-500 text-white font-bold text-sm hover:opacity-90 transition">
          トップページへ戻る
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import Form from '~/components/Form.vue'

const currentStep = ref(1)
const submitted = ref(false)

const form = ref({
  childNameKanji: '',
  childNameKana: '',
  grade: '',
  gender: '男の子',
  phone: '',
  email: '',
  selectedCourses: ['HIP-HOP'],
  scheduleDay: '土曜日',
  scheduleTime: '午後 (14:00~17:00)',
  campaignCode: ''
})

const courseOptions = [
  'HIP-HOP', 'JAZZ', 'キッズリズム', 'ブレイキン', 'LOCK', 'テーマパーク', 'コンテンポラリー', 'HOUSE'
]

const isStep1Valid = computed(() => {
  return form.value.childNameKanji.trim() !== '' && form.value.grade !== '' && form.value.phone.trim() !== ''
})

const toggleCourse = (course) => {
  if (form.value.selectedCourses.includes(course)) {
    form.value.selectedCourses = form.value.selectedCourses.filter(c => c !== course)
  } else {
    form.value.selectedCourses.push(course)
  }
}

const nextStep = () => {
  if (currentStep.value < 3) currentStep.value++
}

const submitTrial = () => {
  submitted.value = true
}
</script>
