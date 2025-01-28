<template>
<div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/explo.png"class="h-66 rounded-lg" />
  </div>
  <div class="dance-section">
    <h2 class="dance-title">東京都渋谷区でダンスを習おう！</h2>
    <p class="dance-description">
      東京の中でも屈指の繁華街、渋谷。<br>
      ファッション、アート、サブカルチャーが詰まったこのエリアは<br>
      想像力が無限に膨らむ最高の場所でもあります。各地からのアクセスも抜群です。
    </p>
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/explo.png"class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/roll.png"class="h-66 rounded-lg" />
  </div>
  <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/down.png"class="h-66 rounded-lg" />
  </div>
  <router-link to="/pricing" class="view-more-btn">VIEW MORE →</router-link>
    <FooterBanner />
    <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/last.png"class="h-66 rounded-lg" />
  </div>
  </template>
  <style scoped>
.dance-section {
  text-align: center;
  padding: 40px 20px;
}

.dance-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
}

.dance-description {
  font-size: 16px;
  color: #666;
  line-height: 1.8;
}
.view-more {
  margin-top: 20px;
  text-align: center;
}

.view-more button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.view-more button:hover {
  background-color: #0056b3;
}
</style>
