<template>
    <section class="reasons">
      <h2>7つの理由</h2>
      <img src="/static/Lesson.png" alt="Free Lesson" class="lesson-img" />
      <ul>
        <li v-for="(reason, index) in reasons" :key="index">{{ reason }}</li>
      </ul>
    </section>
  </template>
  
  <script>
  export default {
    data() {
      return {
        reasons: [
          "VISION - バランスよく育つ",
          "CURRICULUM - 子供の成長に合わせたカリキュラム",
          "自由性 - 自由に選べる",
          "PRICE/SYSTEM - 安心の料金体系",
          "INSTRUCTORS - プロ講師が指導",
          "ACCESS - 通いやすい",
          "EVENT - 発表会やイベント多数"
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .reasons {
    text-align: center;
    padding: 50px;
  }
  ul {
    list-style: none;
    padding: 0;
  }
  li {
    font-size: 18px;
    margin: 10px 0;
  }
  </style>
  