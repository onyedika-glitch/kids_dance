<template>
<div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/course.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/Cont.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/jah.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/sted.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="hex-box">
    科学・技術・ものづくり・語学・芸術・数学6つの領域の中から子供の個性に合わせて個別にカリキュラムを構築。  
    子供は好きなものに没頭する中で才能を開花させていきます。
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/info.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="filter-container">
    <!-- Left Section -->
    <div class="filter-section">
      <label>コンテンツを絞る</label>
      <select class="dropdown">
        <option>選択</option>
      </select>

      <label>カテゴリー</label>
      <button class="chip">全て選択</button>
      <span class="more">... +3</span>

      <label>コース</label>
      <div class="icon-group">
        <img v-for="n in 3" :key="n" src="/violin.png" alt="Course" class="icon" />
        <span class="more">... +3</span>
      </div>

      <label>講師のランキング</label>
      <div class="ranking">
        <button class="rank active">S</button>
        <button class="rank">A</button>
        <button class="rank">B</button>
        <button class="rank">C</button>
        <button class="rank">D</button>
      </div>

      <div class="tags">
        <button class="tag">GL for EYS-STYLE</button>
        <button class="tag">GL for EYS-KIDS</button>
        <button class="tag">個別指導型</button>
        <button class="add-tag">＋タグを追加</button>
      </div>
    </div>

    <!-- Right Section -->
    <div class="filter-section">
      <label>スペースを絞る</label>
      <select class="dropdown">
        <option>選択</option>
      </select>

      <label>エリア</label>
      <button class="chip">関東/関西</button>
      <span class="more">... +3</span>

      <label>スペース</label>
      <button class="chip">新宿/銀座</button>
      <span class="more">... +3</span>

      <label>ルーム</label>
      <button class="chip">Room1/Room2/Room3</button>
      <span class="more">... +3</span>

      <label>曜日</label>
      <div class="days">
        <button class="day active">月</button>
        <button class="day">火</button>
        <button class="day">水</button>
        <button class="day active">木</button>
        <button class="day active">金</button>
        <button class="day">土</button>
        <button class="day">日</button>
      </div>
      <button class="search-button">
    <span class="icon">🔍</span>
    <span class="text">この条件でグループレッスンを検索</span>
  </button>
    </div>
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/choice.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/slide.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/choice.png" alt="EYS-Kids" class="h-66 rounded-lg" />
  </div>
  <button class="search-button">
      <span class="text">コースをもっと見る</span>
      <span class="icon">▼</span>
    </button>
  </div>
  <FooterBanner />
  <Freetrial />
  <News />
  </template>

  <style scoped>
.hex-box {
  display: inline-block;
  padding: 20px;
  font-size: 16px;
  color: #1f4ea0; /* Blue text color */
  text-align: center;
  border: 2px solid #1f4ea0; /* Blue border */
  width: fit-content;
  max-width: 80%;
  line-height: 1.6;
  background: white;
  position: relative;
}

/* Hexagon shape */
.hex-box::before,
.hex-box::after {
  content: "";
  position: absolute;
  width: 20px;
  height: 20px;
  background: white;
  border: 2px solid #1f4ea0;
}

.hex-box::before {
  top: -10px;
  left: -10px;
  clip-path: polygon(0% 0%, 100% 0%, 0% 100%);
}

.hex-box::after {
  bottom: -10px;
  right: -10px;
  clip-path: polygon(100% 0%, 100% 100%, 0% 100%);
}
/* Layout */
.filter-container {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.filter-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 50%;
}

/* Dropdown */
.dropdown {
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Chips */
.chip {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  background: #f0f0f0;
  cursor: pointer;
}

/* More Text */
.more {
  color: gray;
  font-size: 14px;
}

/* Icons */
.icon-group {
  display: flex;
  align-items: center;
  gap: 5px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Ranking */
.ranking {
  display: flex;
  gap: 5px;
}

.rank {
  padding: 5px 10px;
  border-radius: 50%;
  background: #f0f0f0;
  cursor: pointer;
}

.rank.active {
  background: #00aaff;
  color: white;
}

/* Tags */
.tags {
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
}

.tag {
  padding: 5px 10px;
  border-radius: 20px;
  background: #f0f0f0;
  cursor: pointer;
}

.add-tag {
  padding: 5px 10px;
  border: 1px dashed gray;
  border-radius: 20px;
  cursor: pointer;
}

/* Days */
.days {
  display: flex;
  gap: 5px;
}

.day {
  padding: 5px 10px;
  border-radius: 20px;
  background: #f0f0f0;
  cursor: pointer;
}

.day.active {
  background: #00aaff;
  color: white;
}
.search-button {
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: #23a8e0;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 50px; /* Rounded pill shape */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.search-button:hover {
  background-color: #1a90c4;
}

.icon {
  font-size: 18px;
}
.search-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Space between text and icon */
  background-color: #23a8e0; /* Blue color */
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 50px; /* Rounded shape */
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2); /* Soft shadow */
  transition: all 0.3s ease-in-out;
}

.search-button:hover {
  background-color: #1a90c4; /* Darker blue on hover */
}

.search-button:active {
  transform: scale(0.95); /* Button shrink effect on click */
}

.icon {
  font-size: 18px;
}
</style>
