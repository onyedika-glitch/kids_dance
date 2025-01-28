<template>
    <section class="curriculum-container">
      <h1 class="title">2 CURRICULUM</h1>
      <p class="subtitle">新しいプログラムは、オプションプログラムと、発展のためのプログラム。
        最初のステップを踏み出すために、あなたをサポートします。</p>
      <img src="/static/haxagon.png" alt="Hexagon Image" />
    <p>丁寧な学習対象・レベル別のクラス分けでお子様の様々な成長をお手伝いします。</p>
    <img src="/static/hexa.png" alt="Hexagon Image" />
   <div class="bg-gradient-to-r from-blue-400 to-blue-500 p-10 flex justify-center items-center">
    <img src="/static/vid.png"class="h-66 rounded-lg" />
  </div>
    <p></p>
       <!-- "View More" Navigation Button -->
        <!-- Manually Add the "VIEW MORE" Button -->
        <router-link to="/pricing" class="view-more-btn">VIEW MORE →</router-link>
       <img src="/static/foot3.png" alt="EYS-Kids Growth" class="reason-img" />
       
    </section>

<FootBanner />

  </template>
  
  <style scoped>
  .curriculum-container {
    text-align: center;
    padding: 40px;
    color: white;
    background: black;
  }
  
  .title {
    font-size: 3rem;
    color: #ff6347;
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
  </style>
  