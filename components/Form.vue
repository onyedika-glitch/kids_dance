<template>
  <div class="space-y-6">
    <!-- Region Tabs -->
    <div class="flex flex-wrap gap-2 border-b border-slate-800 pb-4">
      <button 
        v-for="region in regions" 
        :key="region.id"
        @click="activeRegion = region.id"
        :class="[
          'px-4 py-2 rounded-xl text-xs md:text-sm font-bold transition flex items-center gap-2',
          activeRegion === region.id 
            ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/20' 
            : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
        ]"
      >
        <span>{{ region.name }}</span>
        <span class="px-2 py-0.5 rounded-full text-[10px] bg-slate-950/60 font-black">
          {{ region.studios.length }}
        </span>
      </button>
    </div>

    <!-- Active Region Studio List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div 
        v-for="studio in currentRegionStudios" 
        :key="studio.id"
        @click="toggleSelectStudio(studio.id)"
        :class="[
          'p-4 rounded-2xl border transition cursor-pointer flex flex-col justify-between',
          selectedStudios.includes(studio.id)
            ? 'bg-pink-500/10 border-pink-500 shadow-md shadow-pink-500/10'
            : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
        ]"
      >
        <div>
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-pink-400 bg-pink-500/10 px-2.5 py-0.5 rounded-md border border-pink-500/20">
              {{ studio.area }}
            </span>
            <input 
              type="checkbox" 
              :checked="selectedStudios.includes(studio.id)"
              class="w-4 h-4 accent-pink-500 rounded cursor-pointer" 
            />
          </div>

          <h4 class="font-extrabold text-white text-base mb-1">
            {{ studio.name }} スタジオ
          </h4>

          <p class="text-slate-400 text-xs flex items-center gap-1 mb-3">
            <span>📍</span> {{ studio.access }}
          </p>
        </div>

        <div class="flex flex-wrap gap-1 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
          <span v-for="tag in studio.tags" :key="tag" class="px-2 py-0.5 rounded bg-slate-800">
            #{{ tag }}
          </span>
        </div>

      </div>
    </div>

    <div v-if="selectedStudios.length > 0" class="p-4 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-between">
      <div class="text-xs text-pink-300">
        選択中のスタジオ: <span class="font-bold text-white">{{ selectedStudios.length }} 件選択済み</span>
      </div>
      <button @click="selectedStudios = []" class="text-xs text-slate-400 hover:text-white underline">
        クリア
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeRegion = ref('tokyo')
const selectedStudios = ref([])

const regions = [
  {
    id: 'tokyo',
    name: '東京エリア',
    studios: [
      { id: 'akihabara', name: '秋葉原', area: '千代田区', access: '秋葉原駅 徒歩2分', tags: ['キッズ専用スタジオ', 'ライブカメラ完備'] },
      { id: 'shinjuku', name: '新宿', area: '新宿区', access: '新宿西口駅 徒歩3分', tags: ['シャワールーム完備', '保護者ラウンジ'] },
      { id: 'shibuya', name: '渋谷', area: '渋谷区', access: '渋谷駅 宮益坂口 徒歩4分', tags: ['本格スピーカー音響', 'キッズ更衣室'] },
      { id: 'ginza', name: '銀座・有楽町', area: '中央区', access: '銀座駅 徒歩1分', tags: ['駅直結', '防音マットフロア'] },
      { id: 'ikebukuro', name: '池袋', area: '豊島区', access: '池袋駅 東口 徒歩3分', tags: ['大型ミラー完備', '駐車場提携'] },
      { id: 'roppongi', name: '六本木', area: '港区', access: '六本木駅 徒歩2分', tags: ['最新空調換気', 'セキュリティロック'] }
    ]
  },
  {
    id: 'kanto',
    name: '関東 (東京以外)',
    studios: [
      { id: 'yokohama', name: '横浜', area: '神奈川県', access: '横浜駅 きた西口 徒歩5分', tags: ['広々100㎡', '保護者見学可能'] },
      { id: 'kawasaki', name: '川崎', area: '神奈川県', access: '川崎駅 徒歩4分', tags: ['キッズアメニティ', 'エレベーター有'] },
      { id: 'omiya', name: '大宮', area: '埼玉県', access: '大宮駅 西口 徒歩3分', tags: ['駅近', 'レッスン動画配信対応'] },
      { id: 'chiba', name: '千葉', area: '千葉県', access: '千葉駅 徒歩5分', tags: ['駐車場完備', 'キッズ専用ロッカー'] }
    ]
  },
  {
    id: 'kansai',
    name: '関西エリア',
    studios: [
      { id: 'umeda', name: '梅田 (大阪)', area: '大阪市', access: '梅田駅 徒歩3分', tags: ['関西フラッグシップ', '最新ミラー'] },
      { id: 'namba', name: '心斎橋・難波', area: '大阪市', access: '心斎橋駅 徒歩2分', tags: ['駅徒歩2分', '保護者休憩スペース'] },
      { id: 'kyoto', name: '京都四条', area: '京都市', access: '烏丸駅 徒歩3分', tags: ['洗練デザイン', '除菌空調完備'] },
      { id: 'kobe', name: '神戸三宮', area: '神戸市', access: '三宮駅 徒歩4分', tags: ['キッズ安全床材', '防犯カメラ'] }
    ]
  },
  {
    id: 'chubu',
    name: '東海・中部エリア',
    studios: [
      { id: 'nagoya', name: '名古屋栄', area: '名古屋市', access: '栄駅 徒歩2分', tags: ['栄駅直結', 'キッズ専用フロア'] },
      { id: 'meieki', name: '名駅 (名古屋)', area: '名古屋市', access: '名古屋駅 徒歩5分', tags: ['広い更衣室', '空気清浄システム'] }
    ]
  }
]

const currentRegionStudios = computed(() => {
  const reg = regions.find(r => r.id === activeRegion.value)
  return reg ? reg.studios : []
})

const toggleSelectStudio = (id) => {
  if (selectedStudios.value.includes(id)) {
    selectedStudios.value = selectedStudios.value.filter(item => item !== id)
  } else {
    selectedStudios.value.push(id)
  }
}
</script>
